import { Link } from 'react-router-dom';
import { CalendarDays, MapPin, Music2, Utensils, Drama, Bell, CheckCircle2 } from 'lucide-react';
import { useCountdown, useNow, todayKey } from '../hooks/useCountdown';
import { getTripDay, getNextParkDay, isBeforeTrip, isAfterTrip } from '../lib/tripDay';
import { BIRTHDAYS, TRIP_DAYS, ATTRACTIONS, MEALS } from '../data/trip';
import { PARK_LABELS } from '../types';
import BirthdayBanner from '../components/BirthdayBanner';
import { db } from '../lib/db';
import { useMemo } from 'react';

const QUICK_NAV = [
  { to: '/itinerario', icon: CalendarDays, label: 'Itinerario' },
  { to: '/mapa', icon: MapPin, label: 'Mapa' },
  { to: '/tiktok', icon: Music2, label: 'TikTok' },
  { to: '/epcot', icon: Utensils, label: 'Comida' },
  { to: '/shows', icon: Drama, label: 'Shows' },
  { to: '/alertas', icon: Bell, label: 'Alertas' },
];

export default function Dashboard() {
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
    </div>
  );
}
