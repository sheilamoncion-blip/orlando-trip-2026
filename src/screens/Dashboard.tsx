import { Link } from 'react-router-dom';
import { CalendarDays, MapPin, Music2, Utensils, Drama, Bell, CheckCircle2, Star, Clock3 } from 'lucide-react';
import { useCountdown, useNow, todayKey } from '../hooks/useCountdown';
import { getTripDay, getNextParkDay, isBeforeTrip, isAfterTrip } from '../lib/tripDay';
import { BIRTHDAYS, TRIP_DAYS, ATTRACTIONS, MEALS } from '../data/trip';
import { PARK_LABELS } from '../types';
import BirthdayBanner from '../components/BirthdayBanner';
import { db } from '../lib/db';
import { useMemo, useState } from 'react';

const QUICK_NAV = [
  { to: '/itinerario', icon: CalendarDays, label: 'Itinerario' },
  { to: '/mapa', icon: MapPin, label: 'Mapa' },
  { to: '/tiktok', icon: Music2, label: 'TikTok' },
  { to: '/comida', icon: Utensils, label: 'Comida' },
  { to: '/shows', icon: Drama, label: 'Shows' },
  { to: '/alertas', icon: Bell, label: 'Alertas' },
];

export default function Dashboard() {
  const [stickerOk, setStickerOk] = useState(true);
  const now = useNow();
  const key = todayKey(now);
  const countdown = useCountdown(TRIP_DAYS[0].date);
  const todayPlan = getTripDay(key);
  const nextPark = getNextParkDay(key);
  const birthdayToday = BIRTHDAYS.find(b => b.date === key);

  const todayItems = useMemo(() => {
    if (!todayPlan?.park) return [];
    return [
      ...ATTRACTIONS.filter(a => a.day === key),
      ...MEALS.filter(m => m.day === key),
    ];
  }, [key, todayPlan]);

  const doneCount = todayItems.filter(i => db.isDone(i.id)).length;

  return (
    <div className="p-4 pb-24 space-y-4 max-w-lg mx-auto">
      <header className="pt-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">Orlando Trip 2026</p>
        <h1 className="text-2xl font-extrabold text-slate-800">¡Hola, familia! 👋</h1>
      </header>

      {birthdayToday && <BirthdayBanner person={birthdayToday} />}

      {isBeforeTrip(key) && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 text-center shadow-sm">
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Faltan</p>
          <p className="text-4xl font-extrabold text-brand-600 mt-1">{countdown.days} días</p>
          <p className="text-sm text-slate-500 mt-1">para el viaje ({TRIP_DAYS[0].date} – {TRIP_DAYS[TRIP_DAYS.length - 1].date})</p>
        </div>
      )}

      {!isBeforeTrip(key) && !isAfterTrip(key) && todayPlan && (
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Hoy</p>
          <h2 className="text-lg font-bold text-slate-800 mt-0.5">{todayPlan.label}</h2>
          {todayPlan.park ? (
            <>
              <p className="text-sm text-slate-500 mt-1">{PARK_LABELS[todayPlan.park]} · ~{todayPlan.estimatedHours}h estimadas</p>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-500 rounded-full transition-all" style={{ width: `${todayItems.length ? (doneCount / todayItems.length) * 100 : 0}%` }} />
                </div>
                <span className="text-xs text-slate-500 shrink-0">{doneCount}/{todayItems.length} hecho</span>
              </div>
              <Link to={`/itinerario/${todayPlan.date}`} className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:underline">
                <CheckCircle2 size={15} /> Ver el día completo
              </Link>
            </>
          ) : (
            <p className="text-sm text-slate-500 mt-1">{todayPlan.freeDayPlan}</p>
          )}
        </div>
      )}

      {isAfterTrip(key) && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 text-center shadow-sm">
          <p className="text-lg font-bold text-slate-800">¡El viaje ya pasó! 🎉</p>
          <p className="text-sm text-slate-500 mt-1">Revisa el itinerario para recordar cada día.</p>
        </div>
      )}

      {nextPark && nextPark.date !== todayPlan?.date && (
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Próximo parque</p>
          <p className="text-sm font-semibold text-slate-800 mt-1">{PARK_LABELS[nextPark.park!]} — {nextPark.date}</p>
        </div>
      )}

      <div>
        <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2 px-1">Acceso rápido</p>
        <div className="grid grid-cols-3 gap-2">
          {QUICK_NAV.map(n => (
            <Link key={n.label} to={n.to} className="tap-scale bg-white rounded-xl border border-slate-200 p-3 flex flex-col items-center gap-1.5 shadow-sm hover:border-brand-300 transition">
              <n.icon size={20} className="text-brand-600" />
              <span className="text-[11px] font-medium text-slate-600">{n.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <UpdatesFeed />

      {stickerOk && (
        <div className="flex justify-center pt-2">
          <img
            src="/stickers/home.png"
            alt=""
            className="w-28 h-28 object-contain"
            style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }}
            onError={() => setStickerOk(false)}
          />
        </div>
      )}
    </div>
  );
}

function timeAgo(iso: string): string {
  const diffMin = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (diffMin < 1) return 'ahora';
  if (diffMin < 60) return `hace ${diffMin} min`;
  const diffH = Math.round(diffMin / 60);
  if (diffH < 24) return `hace ${diffH}h`;
  return `hace ${Math.round(diffH / 24)}d`;
}

function UpdatesFeed() {
  const updates = db.getUpdates().slice(0, 8);
  if (updates.length === 0) return null;
  return (
    <div>
      <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2 px-1">Actividad reciente</p>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100">
        {updates.map(u => (
          <div key={u.id} className="p-3 flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-full bg-brand-100 text-brand-700 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
              {u.who.slice(0, 1).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-700"><span className="font-semibold">{u.who}</span> {u.text}</p>
              <div className="flex items-center gap-2 mt-0.5">
                {!!u.rating && (
                  <span className="inline-flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={10} className={i < u.rating! ? 'fill-amber-400 text-amber-400' : 'text-gray-300'} />
                    ))}
                  </span>
                )}
                <span className="text-[10px] text-slate-400 flex items-center gap-0.5"><Clock3 size={9} /> {timeAgo(u.createdAt)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
