import { useState } from 'react';
import BackButton from '../components/BackButton';
import { Cake, Search, X } from 'lucide-react';
import { PERSONALIZATION } from '../data/trip';
import { PARK_LABELS } from '../types';
import { db } from '../lib/db';
import ItemPhotos from '../components/ItemPhotos';

export default function PersonalizationShop() {
  const [, forceRerender] = useState(0);
  const [query, setQuery] = useState('');

  const toggle = (id: string) => {
    db.setOrdered(id, !db.isOrdered(id));
    forceRerender(n => n + 1);
  };

  const filtered = PERSONALIZATION.filter(item => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return item.name.toLowerCase().includes(q) || item.location.toLowerCase().includes(q);
  });

  const byPark = filtered.reduce<Record<string, typeof PERSONALIZATION>>((acc, p) => {
    (acc[p.park] ||= []).push(p);
    return acc;
  }, {});

  return (
    <div className="p-4 pb-24 max-w-lg mx-auto space-y-4">
      <BackButton fallback="/mas" label="Más" />
      <header>
        <h1 className="text-xl font-extrabold text-slate-800">Tienda de Personalización Disney</h1>
        <p className="text-sm text-slate-500">Grabados, bordados y recuerdos únicos</p>
      </header>

      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar producto o lugar..." className="w-full border border-slate-200 rounded-xl pl-9 pr-8 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-300" />
        {query && <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"><X size={14} /></button>}
      </div>

      {Object.keys(byPark).length === 0 && <p className="text-center text-sm text-slate-400 py-10">Nada coincide con tu búsqueda</p>}

      {Object.entries(byPark).map(([park, items]) => (
        <section key={park}>
          <h2 className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">{PARK_LABELS[park as keyof typeof PARK_LABELS]}</h2>
          <div className="space-y-2">
            {items.map(item => (
              <div key={item.id} className={`bg-white rounded-xl border p-3.5 shadow-sm ${item.birthdayPick ? 'border-amber-300 bg-amber-50/30' : 'border-slate-200'}`}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                      {item.name}
                      {item.birthdayPick && <Cake size={13} className="text-amber-500" />}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">{item.priceRange} · {item.customizable}</p>
                    <p className="text-xs text-slate-500">⏱ {item.orderTime} · 📍 {item.location}</p>
                  </div>
                  <button onClick={() => toggle(item.id)} className={`shrink-0 text-[11px] font-medium px-2.5 py-1.5 rounded-lg border ${db.isOrdered(item.id) ? 'bg-emerald-500 text-white border-emerald-500' : 'border-slate-200 text-slate-500'}`}>
                    {db.isOrdered(item.id) ? 'Ordenado ✓' : 'Marcar'}
                  </button>
                </div>
                <ItemPhotos itemId={item.id} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
