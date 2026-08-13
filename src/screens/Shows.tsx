import { Link } from 'react-router-dom';
import { ArrowLeft, Sun, Home } from 'lucide-react';
import { SHOWS } from '../data/trip';
import { PARK_LABELS, PARK_COLORS } from '../types';
import CommentThread from '../components/CommentThread';

export default function Shows() {
  const byPark = SHOWS.reduce<Record<string, typeof SHOWS>>((acc, s) => {
    (acc[s.park] ||= []).push(s);
    return acc;
  }, {});

  return (
    <div className="p-4 pb-24 max-w-lg mx-auto space-y-4">
      <Link to="/mas" className="inline-flex items-center gap-1 text-sm text-sky-600"><ArrowLeft size={14} /> Más</Link>
      <header>
        <h1 className="text-xl font-extrabold text-slate-800">Shows por Parque</h1>
        <p className="text-sm text-slate-500">Horarios, duración y dónde verlos</p>
      </header>

      {Object.entries(byPark).map(([park, shows]) => (
        <section key={park}>
          <h2 className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: PARK_COLORS[park as keyof typeof PARK_COLORS] }}>{PARK_LABELS[park as keyof typeof PARK_LABELS]}</h2>
          <div className="space-y-2">
            {shows.map(s => (
              <div key={s.id} className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-sm">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-slate-800">{s.name}</h3>
                  {s.mustSee && <span className="text-[10px] font-bold bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full shrink-0">IMPERDIBLE</span>}
                </div>
                <p className="text-xs text-slate-500 mt-1">{s.times.join(' · ')} · {s.durationMin} min</p>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  {s.indoor ? <Home size={11} /> : <Sun size={11} />} {s.location} · {s.indoor ? 'Bajo techo' : 'Al aire libre'}
                </p>
                <CommentThread threadId={s.id} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
