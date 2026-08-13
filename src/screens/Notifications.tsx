import { useEffect, useMemo, useState } from 'react';
import { CloudRain, Thermometer, Clock, Bell, Plus, Trash2, Waves, Volume2 } from 'lucide-react';
import { fetchOrlandoWeather, isWeatherConfigured, heatAdvisory, rainAdvisory, type WeatherNow } from '../lib/weather';
import { fetchLiveWaitTimes, matchLiveWait } from '../lib/waitTimes';
import { ATTRACTIONS, SHOWS } from '../data/trip';
import { getTripDay } from '../lib/tripDay';
import { todayKey, useNow } from '../hooks/useCountdown';
import { useAlarms } from '../hooks/useAlarms';
import { db } from '../lib/db';

export default function Notifications() {
  useAlarms();
  const now = useNow(60_000);
  const key = todayKey(now);
  const today = getTripDay(key);
  const [weather, setWeather] = useState<WeatherNow | null>(null);
  const [dropped, setDropped] = useState<{ name: string; live: number; typical: number }[]>([]);
  const [reservations, setReservations] = useState(() => db.getReservations());
  const [showForm, setShowForm] = useState(false);
  const [resName, setResName] = useState('');
  const [resDesc, setResDesc] = useState('');
  const [resWho, setResWho] = useState<string[]>([]);
  const [resTime, setResTime] = useState('');
  const family = db.getFamily();

  useEffect(() => {
    fetchOrlandoWeather().then(setWeather);
  }, []);

  useEffect(() => {
    if (!today?.park) return;
    const parkAttractions = ATTRACTIONS.filter(a => a.day === today.date);
    fetchLiveWaitTimes(today.park).then(rides => {
      if (!rides) return;
      const drops = parkAttractions
        .map(a => {
          const live = matchLiveWait(rides, a.name);
          return live?.waitMinutes != null && live.waitMinutes < a.typicalWaitMin - 15
            ? { name: a.name, live: live.waitMinutes, typical: a.typicalWaitMin }
            : null;
        })
        .filter(Boolean) as { name: string; live: number; typical: number }[];
      setDropped(drops);
    });
  }, [today]);

  const upcomingShows = useMemo(() => {
    if (!today) return [];
    return SHOWS.filter(s => s.day === today.date);
  }, [today]);

  const toggleWho = (name: string) => {
    setResWho(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);
  };

  const addReservation = () => {
    if (!resName.trim() || !resTime) return;
    const list = [...reservations, { id: crypto.randomUUID(), name: resName.trim(), description: resDesc.trim(), who: resWho, dateTime: resTime }];
    setReservations(list);
    db.saveReservations(list);
    setResName(''); setResDesc(''); setResWho([]); setResTime(''); setShowForm(false);
  };

  const removeReservation = (id: string) => {
    const list = reservations.filter(r => r.id !== id);
    setReservations(list);
    db.saveReservations(list);
  };

  const minutesUntil = (dateTime: string) => Math.round((new Date(dateTime).getTime() - now.getTime()) / 60000);

  return (
    <div className="p-4 pb-24 max-w-lg mx-auto space-y-4">
      <header className="pt-2">
        <h1 className="text-xl font-extrabold text-slate-800 flex items-center gap-2"><Bell size={20} /> Alertas</h1>
      </header>

      <section>
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1.5"><CloudRain size={13} /> Clima</h2>
        {weather ? (
          <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-sm space-y-1.5">
            <p className="text-sm font-semibold text-slate-800 flex items-center gap-1.5"><Thermometer size={14} /> {weather.tempC}°C — {weather.description}</p>
            {heatAdvisory(weather.tempC) && <p className="text-xs text-amber-600">🥵 {heatAdvisory(weather.tempC)}</p>}
            {rainAdvisory(weather.condition) && <p className="text-xs text-brand-600 flex items-center gap-1"><Waves size={12} /> {rainAdvisory(weather.condition)}</p>}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-sm text-xs text-slate-500">
            {isWeatherConfigured()
              ? 'No se pudo cargar el clima ahora mismo.'
              : 'Clima en vivo no configurado — agrega VITE_OPENWEATHERMAP_KEY en .env (ver README). Mientras tanto, revisa el clima manualmente antes de salir.'}
          </div>
        )}
      </section>

      {dropped.length > 0 && (
        <section>
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Filas bajaron</h2>
          <div className="space-y-1.5">
            {dropped.map(d => (
              <div key={d.name} className="bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 text-xs text-emerald-700 font-medium">
                🎉 ¡{d.name} bajó a {d.live} min (normalmente {d.typical})! Ve ahora.
              </div>
            ))}
          </div>
        </section>
      )}

      {upcomingShows.length > 0 && (
        <section>
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1.5"><Clock size={13} /> Shows de hoy</h2>
          <div className="space-y-1.5">
            {upcomingShows.map(s => (
              <div key={s.id} className="bg-white rounded-lg border border-slate-200 px-3 py-2 text-xs">
                <span className="font-medium text-slate-700">{s.name}</span> <span className="text-slate-500">— {s.times.join(' · ')} en {s.location}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1.5"><Volume2 size={13} /> Recordatorios con alarma</h2>
          <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-1 bg-brand-600 text-white text-xs font-medium px-2.5 py-1.5 rounded-lg">
            <Plus size={13} /> Nuevo
          </button>
        </div>
        <p className="text-[11px] text-slate-400 mb-2">Suena y manda notificación mientras la app esté abierta en tu teléfono, a la hora exacta.</p>

        {showForm && (
          <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-sm space-y-2 mb-3">
            <input value={resName} onChange={e => setResName(e.target.value)} placeholder="Nombre (ej: Mythos, foto en el castillo)" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-300" />
            <textarea value={resDesc} onChange={e => setResDesc(e.target.value)} placeholder="Descripción (opcional)" rows={2} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-300 resize-none" />
            <div>
              <p className="text-[11px] text-slate-500 mb-1">¿Quiénes?</p>
              <div className="flex flex-wrap gap-1.5">
                {family.map(f => (
                  <button key={f} onClick={() => toggleWho(f)} className={`text-xs px-2.5 py-1 rounded-full border transition ${resWho.includes(f) ? 'bg-brand-600 text-white border-brand-600' : 'border-slate-200 text-slate-600'}`}>{f}</button>
                ))}
              </div>
            </div>
            <input type="datetime-local" value={resTime} onChange={e => setResTime(e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-300" />
            <div className="flex gap-2">
              <button onClick={addReservation} className="flex-1 bg-brand-600 text-white py-2 rounded-lg text-sm font-medium">Guardar alarma</button>
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-slate-500">Cancelar</button>
            </div>
          </div>
        )}

        <div className="space-y-2">
          {reservations.length === 0 && !showForm && <p className="text-xs text-slate-400 text-center py-4">Sin recordatorios todavía</p>}
          {reservations.map(r => {
            const mins = minutesUntil(r.dateTime);
            const urgent = mins <= 15 && mins >= 0;
            const soon = mins <= 120 && mins > 15;
            return (
              <div key={r.id} className={`rounded-lg px-3 py-2.5 text-xs group ${urgent ? 'bg-rose-50 border border-rose-200' : soon ? 'bg-amber-50 border border-amber-200' : 'bg-white border border-slate-200'}`}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-slate-700">{r.name}</p>
                    {r.description && <p className="text-slate-500 mt-0.5">{r.description}</p>}
                    {r.who.length > 0 && <p className="text-slate-500 mt-0.5">Con: {r.who.join(', ')}</p>}
                    <p className="text-slate-500 mt-0.5">
                      {mins < 0 ? 'ya pasó' : mins < 60 ? `en ${mins} min` : `en ${Math.round(mins / 60)}h`}
                      {urgent && <span className="ml-1 text-rose-600 font-semibold">¡Es ahora!</span>}
                    </p>
                  </div>
                  <button onClick={() => removeReservation(r.id)} className="text-slate-400 hover:text-rose-500 shrink-0"><Trash2 size={13} /></button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
