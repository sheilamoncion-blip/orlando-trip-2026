import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Cake } from 'lucide-react';
import { PERSONALIZATION } from '../data/trip';
import { PARK_LABELS } from '../types';
import { db } from '../lib/db';

export default function PersonalizationShop() {
  const [, forceRerender] = useState(0);
  const byPark = PERSONALIZATION.reduce<Record<string, typeof PERSONALIZATION>>((acc, p) => {
    (acc[p.park] ||= []).push(p);
    return acc;
  }, {});

  const toggle = (id: string) => {
    db.setOrdered(id, !db.isOrdered(id));
    forceRerender(n => n + 1);
  };

  return (
    <div className="p-4 pb-24 max-w-lg mx-auto space-y-4">
      <Link to="/mas" className="inline-flex items-center gap-1 text-sm text-brand-600"><ArrowLeft size={14} /> Más</Link>
      <header>
        <h1 className="text-xl font-extrabold text-slate-800">Tienda de Personalización Disney</h1>
        <p className="text-sm text-slate-500">Grabados, bordados y recuerdos únicos</p>
      </header>

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
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
