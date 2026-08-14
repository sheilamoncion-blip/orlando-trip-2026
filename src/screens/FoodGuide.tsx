import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Utensils, Search, X } from 'lucide-react';
import BackButton from '../components/BackButton';
import { MEALS, VISITED_PARKS } from '../data/trip';
import { PARK_LABELS, PARK_COLORS, type ParkId } from '../types';
import { groupByVenue, VenueCard } from '../components/VenueMeals';
import { db } from '../lib/db';

function groupByArea(meals: typeof MEALS): [string, typeof MEALS][] {
  const map = new Map<string, typeof MEALS>();
  meals.forEach(m => {
    const key = m.area || 'General';
    (map.get(key) || map.set(key, []).get(key)!).push(m);
  });
  return Array.from(map.entries());
}

export default function FoodGuide() {
  const parks = useMemo(() => Array.from(new Set(VISITED_PARKS.map(p => p.parkId))), []);
  const [searchParams, setSearchParams] = useSearchParams();
  const parkParam = searchParams.get('park') as ParkId | null;
  const park: ParkId = parkParam && parks.includes(parkParam) ? parkParam : parks[0];
  const setPark = (p: ParkId) => setSearchParams(prev => { const next = new URLSearchParams(prev); next.set('park', p); return next; }, { replace: true });
  const [query, setQuery] = useState('');
  const [, forceRerender] = useState(0);

  const toggleDone = (id: string) => {
    db.setDone(id, !db.isDone(id));
    forceRerender(n => n + 1);
  };

  const mealsForPark = MEALS.filter(m => m.park === park);
  const filtered = mealsForPark.filter(m => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return m.name.toLowerCase().includes(q) || (m.venue || '').toLowerCase().includes(q) || (m.area || '').toLowerCase().includes(q);
  });
  const byArea = groupByArea(filtered);

  return (
    <div className="p-4 pb-24 max-w-lg mx-auto space-y-3">
      <BackButton fallback="/" label="Inicio" />
      <header>
        <h1 className="text-xl font-extrabold text-slate-800 flex items-center gap-2"><Utensils size={20} /> Comida</h1>
        <p className="text-sm text-slate-500">Restaurantes y platos por parque</p>
      </header>

      <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-4 px-4">
        {parks.map(p => (
          <button
            key={p}
            onClick={() => setPark(p)}
            className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition ${park === p ? 'text-white border-transparent' : 'bg-white border-slate-200 text-slate-600'}`}
            style={park === p ? { backgroundColor: PARK_COLORS[p] } : undefined}
          >
            {PARK_LABELS[p]}
          </button>
        ))}
      </div>

      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Buscar restaurante o plato..."
          className="w-full border border-slate-200 rounded-xl pl-9 pr-8 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-300"
        />
        {query && (
          <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
            <X size={14} />
          </button>
        )}
      </div>

      {byArea.length === 0 && (
        <p className="text-center text-sm text-slate-400 py-10">
          {query ? `Nada coincide con "${query}"` : 'Todavía no hay restaurantes cargados para este parque'}
        </p>
      )}

      {byArea.map(([area, items]) => (
        <section key={area}>
          <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-2">{area}</h2>
          <div className="space-y-2.5">
            {groupByVenue(items).map(([venue, venueItems]) => (
              <VenueCard key={venue} venue={venue} items={venueItems} onToggle={toggleDone} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
