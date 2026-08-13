import { Link } from 'react-router-dom';
import { PARK_LABELS } from '../types';
import { TRIP_DAYS, ATTRACTIONS, MEALS, SHOWS, BIRTHDAYS } from '../data/trip';
import { ChevronRight, Cake } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

export default function ItineraryList() {
  return (
    <div className="p-4 pb-24 space-y-3 max-w-lg mx-auto">
      <header className="pt-2 pb-1">
        <h1 className="text-xl font-extrabold text-slate-800">Itinerario Completo</h1>
        <p className="text-sm text-slate-500">22 – 30 de agosto, 2026</p>
      </header>

      {TRIP_DAYS.map(day => {
        const birthday = BIRTHDAYS.find(b => b.date === day.date);
        const attractions = ATTRACTIONS.filter(a => a.day === day.date);
        const meals = MEALS.filter(m => m.day === day.date);
        const shows = SHOWS.filter(s => s.day === day.date);

        return (
          <Link
            key={day.date}
            to={day.park ? `/itinerario/${day.date}` : '#'}
            className={`block bg-white rounded-2xl border p-4 shadow-sm transition ${day.park ? 'hover:border-brand-300 cursor-pointer' : 'opacity-80 cursor-default'} ${birthday ? 'border-amber-300 ring-1 ring-amber-200' : 'border-slate-200'}`}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{format(parseISO(day.date), "EEEE d 'de' MMMM", { locale: es })}</p>
                <h3 className="text-base font-bold text-slate-800 mt-0.5 flex items-center gap-1.5">
                  {day.label}
                  {birthday && (
                    <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-400 to-pink-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      <Cake size={11} /> {birthday.name.split(' ')[0]} {birthday.age}
                    </span>
                  )}
                </h3>
              </div>
              {day.park && <ChevronRight size={18} className="text-slate-300 shrink-0 mt-1" />}
            </div>

            {day.park ? (
              <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
                <span>{PARK_LABELS[day.park]}</span>
                <span>· {attractions.length} atracciones</span>
                <span>· {meals.length} comidas</span>
                {shows.length > 0 && <span>· {shows.length} shows</span>}
                <span>· ~{day.estimatedHours}h</span>
              </div>
            ) : (
              <p className="mt-2 text-xs text-slate-500">{day.freeDayPlan}</p>
            )}
          </Link>
        );
      })}
    </div>
  );
}
