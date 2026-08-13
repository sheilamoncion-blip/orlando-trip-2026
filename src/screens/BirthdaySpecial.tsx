import { useState } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { Check, Gift, Sparkles } from 'lucide-react';
import { BIRTHDAYS, PERSONALIZATION } from '../data/trip';
import { PARK_LABELS } from '../types';
import { db } from '../lib/db';
import CommentThread from '../components/CommentThread';

export default function BirthdaySpecial() {
  const { id } = useParams<{ id: 'carlos' | 'sheila' }>();
  const [, forceRerender] = useState(0);
  const person = BIRTHDAYS.find(b => b.id === id);
  if (!person) return null;

  const shopItems = PERSONALIZATION.filter(p => p.birthdayPick === person.id);

  const toggleOrdered = (itemId: string) => {
    db.setOrdered(itemId, !db.isOrdered(itemId));
    forceRerender(n => n + 1);
  };

  const celebrated = db.isDone(`birthday-${person.id}`);

  return (
    <div className="p-4 pb-24 max-w-lg mx-auto space-y-4">
      <BackButton fallback="/" label="Inicio" />

      <div className="birthday-confetti-bg rounded-2xl p-5 text-white text-center shadow-lg">
        <p className="text-4xl">🎂</p>
        <h1 className="text-2xl font-extrabold mt-1">{person.name}</h1>
        <p className="text-sm opacity-90 mt-0.5">Cumple {person.age} años — {person.date}</p>
        <p className="text-xs opacity-80 mt-1">{PARK_LABELS[person.park]}</p>
      </div>

      <button
        onClick={() => { db.setDone(`birthday-${person.id}`, !celebrated); forceRerender(n => n + 1); }}
        className={`w-full rounded-xl p-3 text-sm font-semibold flex items-center justify-center gap-2 transition ${
          celebrated ? 'bg-emerald-100 text-emerald-700 border border-emerald-300' : 'bg-amber-400 text-white'
        }`}
      >
        <Check size={16} /> {celebrated ? '¡Cumpleaños Celebrado! 🎂' : 'Marcar como celebrado'}
      </button>

      <section>
        <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-2 flex items-center gap-1.5"><Sparkles size={14} /> Perks de hoy</h2>
        <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-sm space-y-2">
          {person.perks.map((perk, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-slate-700">
              <span className="text-amber-500 mt-0.5">•</span> {perk}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-2 flex items-center gap-1.5"><Gift size={14} /> Regalo sugerido</h2>
        <div className="bg-white rounded-xl border border-amber-200 bg-amber-50/40 p-3.5 shadow-sm">
          <p className="text-sm font-semibold text-slate-800">{person.mainGift}</p>
          <p className="text-xs text-slate-500 mt-2">Alternativas:</p>
          <ul className="text-xs text-slate-600 mt-1 space-y-0.5">
            {person.altGifts.map((g, i) => <li key={i}>• {g}</li>)}
          </ul>
        </div>
      </section>

      {shopItems.length > 0 && (
        <section>
          <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-2">Personalización sugerida</h2>
          <div className="space-y-2">
            {shopItems.map(item => (
              <div key={item.id} className="bg-white rounded-xl border border-slate-200 p-3 shadow-sm flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.priceRange} · {item.orderTime}</p>
                  <p className="text-xs text-slate-500">{item.location}</p>
                </div>
                <button onClick={() => toggleOrdered(item.id)} className={`shrink-0 text-[11px] font-medium px-2.5 py-1.5 rounded-lg border ${db.isOrdered(item.id) ? 'bg-emerald-500 text-white border-emerald-500' : 'border-slate-200 text-slate-500'}`}>
                  {db.isOrdered(item.id) ? 'Ordenado ✓' : 'Marcar ordenado'}
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      <CommentThread threadId={`birthday-${person.id}`} />
    </div>
  );
}
