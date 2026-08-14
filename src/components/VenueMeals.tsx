import { useState } from 'react';
import { ChevronDown, Check, Heart } from 'lucide-react';
import type { Meal } from '../types';
import { TasteStars, PhotogenicRating, OurStars } from './RatingStars';
import ItemPhotos from './ItemPhotos';
import CommentThread from './CommentThread';
import { db, type MyMealStatus } from '../lib/db';
import { ensureMe } from '../lib/useMe';

/** Quita sufijos como "(Postres)" / "(Acompañantes)" del nombre del venue para
 * agrupar todo bajo el mismo restaurante — el sufijo solo se usaba para inferir
 * la categoría del plato (ver categorizeMeal), no es un lugar distinto. */
function baseVenueName(venue: string): string {
  return venue.replace(/\s*\((Acompañantes?|Postres?|Menú Niños|Bebidas?|Dockside Dining|snacks?)\)\s*$/i, '').trim();
}

export function groupByVenue(meals: Meal[]): [string, Meal[]][] {
  const map = new Map<string, Meal[]>();
  meals.forEach(m => {
    const key = baseVenueName(m.venue || m.name);
    (map.get(key) || map.set(key, []).get(key)!).push(m);
  });
  return Array.from(map.entries());
}

type Category = 'Entrada' | 'Plato fuerte' | 'Acompañante' | 'Postre' | 'Bebida' | 'Niños';

const CATEGORY_COLORS: Record<Category, string> = {
  Entrada: 'bg-amber-50 text-amber-700 border-amber-200',
  'Plato fuerte': 'bg-brand-50 text-brand-700 border-brand-200',
  Acompañante: 'bg-slate-100 text-slate-600 border-slate-200',
  Postre: 'bg-pink-50 text-pink-700 border-pink-200',
  Bebida: 'bg-sky-50 text-sky-700 border-sky-200',
  Niños: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

export function categorizeMeal(meal: Meal): Category {
  const venue = meal.venue || '';
  const text = meal.name.toLowerCase();

  if (/menú niños/i.test(venue) || /\bniños\b/i.test(text)) return 'Niños';

  if (/cerveza|vino|cóctel|cocktail|bebida|milkshake|shake|malteada|soda|jugo|agua|café|espresso|cappuccino|hot cocoa|té helado|refresco|vaso souvenir|freestyle|slush|squishy|lemonade|limonada|smoothie|mocktail|seltzer|punch|antidote/i.test(text))
    return 'Bebida';

  if (/postres/i.test(venue) || /postre|cupcake|pastel|cake|helado|ice cream|sorbete|dona|donut|churro|pudding|pudín|panna cotta|pie|galleta|cookie|swiss roll|pet rock/i.test(text))
    return 'Postre';

  if (/acompañantes/i.test(venue) || /\b(papas|fries|aros de cebolla|tots|arroz|puré|side)\b/i.test(text))
    return 'Acompañante';

  if (/nachos|ensalada|sopa|bisque|entrada|crudo|calamari|mussels|bruschetta|empanada|elote|corn on the cob/i.test(text))
    return 'Entrada';

  return 'Plato fuerte';
}

export function CategoryTag({ meal }: { meal: Meal }) {
  const cat = categorizeMeal(meal);
  return <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${CATEGORY_COLORS[cat]}`}>{cat}</span>;
}

export function VenueCard({ venue, items, onToggle, defaultOpen, isOpen, onToggleOpen }: {
  venue: string; items: Meal[]; onToggle: (id: string) => void; defaultOpen?: boolean;
  isOpen?: boolean; onToggleOpen?: () => void;
}) {
  const [localOpen, setLocalOpen] = useState(!!defaultOpen);
  const open = isOpen ?? localOpen;
  const setOpen = onToggleOpen ?? (() => setLocalOpen(o => !o));
  const [, forceRerender] = useState(0);
  const doneCount = items.filter(m => db.isDone(m.id)).length;
  const avgTaste = items.reduce((s, m) => s + m.tasteRating, 0) / items.length;
  const familyTotal = db.getFamily().length;
  const interested = db.getVisitInterest(venue);
  const me = db.getMe();
  const iWantToVisit = !!me && interested.includes(me);

  const toggleVisit = async () => {
    const name = await ensureMe();
    if (!name) return;
    db.toggleVisitInterest(venue, name);
    forceRerender(n => n + 1);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <button onClick={() => setOpen()} className="w-full flex items-center gap-3 p-3.5 text-left">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-slate-800 truncate">{venue}</h3>
          <div className="flex items-center gap-2 mt-0.5">
            <TasteStars value={Math.round(avgTaste)} />
            <span className="text-xs text-slate-400">{items.length} {items.length === 1 ? 'ítem' : 'ítems'}{doneCount > 0 && ` · ${doneCount} probado${doneCount !== 1 ? 's' : ''}`}</span>
          </div>
        </div>
        <span className="shrink-0 text-xs text-brand-600 font-medium flex items-center gap-0.5">
          Ampliar menú <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
        </span>
      </button>
      <div className="px-3.5 pb-3 -mt-1 flex items-center justify-between">
        <button
          onClick={toggleVisit}
          className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg border transition ${iWantToVisit ? 'bg-rose-500 text-white border-rose-500' : 'bg-white border-slate-200 text-slate-500'}`}
        >
          <Heart size={13} className={iWantToVisit ? 'fill-white' : ''} /> Quiero visitar
        </button>
        {interested.length > 0 && (
          <span className="text-[11px] text-slate-400">{interested.length}/{familyTotal} Lorenzos quiere{interested.length !== 1 ? 'n' : ''}{interested.length > 0 && ` (${interested.join(', ')})`}</span>
        )}
      </div>
      {open && (
        <div className="px-3.5 pb-3.5 space-y-3 border-t border-slate-100 pt-3">
          {items.map(m => (
            <MealCard key={m.id} meal={m} venue={venue} done={db.isDone(m.id)} onToggle={() => onToggle(m.id)} />
          ))}
        </div>
      )}
    </div>
  );
}

export function MealCard({ meal, venue, done, onToggle }: { meal: Meal; venue: string; done: boolean; onToggle: () => void }) {
  const [myStatus, setMyStatus] = useState(() => db.getMyMealStatus(meal.id));

  const toggleTried = async () => {
    const name = await ensureMe();
    if (!name) return;
    const next: MyMealStatus = { ...myStatus, tried: !myStatus.tried };
    setMyStatus(next);
    db.setMyMealStatus(meal.id, next);
    if (next.tried) {
      db.addUpdate(name, `probó ${meal.name} en ${venue}`, next.rating);
    }
  };

  const setMyRating = async (rating: number) => {
    const name = await ensureMe();
    if (!name) return;
    const next: MyMealStatus = { tried: true, rating };
    setMyStatus(next);
    db.setMyMealStatus(meal.id, next);
    if (rating > 0) {
      db.addUpdate(name, `comió ${meal.name} en ${venue} y le dio ${rating}/5 estrellas`, rating);
    }
  };

  return (
    <div className={`bg-white rounded-xl border p-3.5 shadow-sm transition ${done ? 'border-emerald-300 bg-emerald-50/40' : 'border-slate-200'}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-slate-800">{meal.name}</h3>
          <div className="mt-1"><CategoryTag meal={meal} /></div>
        </div>
        <button onClick={onToggle} className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center border-2 transition ${done ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300'}`}>
          {done && <Check size={14} className="text-white" />}
        </button>
      </div>
      <div className="flex items-center gap-3 mt-1.5">
        <span className="text-[10px] text-slate-400">Redes:</span>
        <TasteStars value={meal.tasteRating} />
        <PhotogenicRating value={meal.photogenicRating} />
      </div>
      <p className="text-xs text-slate-500 mt-1.5">{meal.priceRange} · ~{meal.typicalWaitMin} min de espera</p>
      <p className="text-xs text-slate-600 mt-1"><span className="font-medium">Recomendado:</span> {meal.recommended.join(', ')}</p>
      {meal.photoTip && <p className="text-xs text-slate-500 mt-1 italic">📸 {meal.photoTip}</p>}
      {meal.dietary && <p className="text-[11px] text-slate-400 mt-1">🍽️ {meal.dietary}</p>}
      {meal.addOns.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {meal.addOns.map(a => (
            <span key={a.label} className="text-[10px] bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full">
              + {a.label} (+${a.price})
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center justify-between mt-2.5 bg-brand-50/50 border border-brand-100 rounded-lg px-2.5 py-2">
        <button
          onClick={toggleTried}
          className={`flex items-center gap-1.5 text-[11px] font-medium ${myStatus.tried ? 'text-emerald-600' : 'text-slate-500'}`}
        >
          <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${myStatus.tried ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300'}`}>
            {myStatus.tried && <Check size={10} className="text-white" />}
          </span>
          Lo probé
        </button>
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-slate-400 mr-0.5">Nosotros:</span>
          <OurStars value={myStatus.rating || 0} onChange={setMyRating} size={14} />
        </div>
      </div>
      <ItemPhotos itemId={meal.id} />
      <CommentThread threadId={meal.id} />
    </div>
  );
}
