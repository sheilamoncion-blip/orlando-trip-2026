import { useState } from 'react';
import { COUNTRIES } from '../data/trip';
import type { CountryItem, Country } from '../types';
import { TasteStars, PhotogenicRating } from '../components/RatingStars';
import { db } from '../lib/db';
import { Check, Clock, Users, Camera, Music, ChevronDown } from 'lucide-react';

export default function EpcotChallenge() {
  const [activeCountry, setActiveCountry] = useState(COUNTRIES[0].id);
  const [, forceRerender] = useState(0);
  const family = db.getFamily();

  const allItems = COUNTRIES.flatMap(c => [...c.foods, ...c.drinks]);
  const doneItems = allItems.filter(i => db.isDone(i.id));
  const countriesCompleted = COUNTRIES.filter(c => [...c.foods, ...c.drinks].every(i => db.isDone(i.id))).length;
  const totalSpent = doneItems.reduce((sum, i) => sum + i.price, 0);

  const country = COUNTRIES.find(c => c.id === activeCountry)!;

  const toggle = (id: string) => {
    db.setDone(id, !db.isDone(id));
    forceRerender(n => n + 1);
  };

  return (
    <div className="p-4 pb-24 max-w-lg mx-auto">
      <header className="pt-2 pb-3">
        <h1 className="text-xl font-extrabold text-slate-800">🌍 Eat & Drink Around the World</h1>
        <p className="text-sm text-slate-500">Epcot — 29 de agosto</p>
      </header>

      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm mb-4 grid grid-cols-3 gap-2 text-center">
        <div>
          <p className="text-lg font-extrabold text-sky-600">{countriesCompleted}/11</p>
          <p className="text-[10px] text-slate-500 uppercase tracking-wide">Países</p>
        </div>
        <div>
          <p className="text-lg font-extrabold text-sky-600">{doneItems.length}/{allItems.length}</p>
          <p className="text-[10px] text-slate-500 uppercase tracking-wide">Ítems probados</p>
        </div>
        <div>
          <p className="text-lg font-extrabold text-sky-600">${totalSpent}</p>
          <p className="text-[10px] text-slate-500 uppercase tracking-wide">Gastado</p>
        </div>
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-2 mb-3 -mx-4 px-4">
        {COUNTRIES.map(c => {
          const items = [...c.foods, ...c.drinks];
          const done = items.filter(i => db.isDone(i.id)).length;
          const complete = done === items.length;
          return (
            <button
              key={c.id}
              onClick={() => setActiveCountry(c.id)}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition ${
                activeCountry === c.id ? 'bg-sky-600 text-white border-sky-600' : complete ? 'bg-emerald-50 border-emerald-300 text-emerald-700' : 'bg-white border-slate-200 text-slate-600'
              }`}
            >
              <span className="text-base">{c.flag}</span> {c.name} {complete && <Check size={12} />}
            </button>
          );
        })}
      </div>

      <CountryInfoBox country={country} />

      <section className="mb-4">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Comidas</h2>
        <div className="space-y-2">
          {country.foods.map(item => (
            <CountryItemCard key={item.id} item={item} family={family} onToggle={() => toggle(item.id)} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Bebidas</h2>
        <div className="space-y-2">
          {country.drinks.map(item => (
            <CountryItemCard key={item.id} item={item} family={family} onToggle={() => toggle(item.id)} />
          ))}
        </div>
      </section>
    </div>
  );
}

function CountryInfoBox({ country }: { country: Country }) {
  const [showGuide, setShowGuide] = useState(false);
  const hasInfo = country.bestTime || country.crowdLevel || country.photoTip || country.entertainment || country.guide;
  if (!hasInfo) return null;

  return (
    <div className="bg-sky-50/60 border border-sky-100 rounded-xl p-3 mb-4 space-y-1.5">
      {country.bestTime && (
        <p className="text-xs text-slate-700 flex items-start gap-1.5"><Clock size={13} className="text-sky-600 shrink-0 mt-0.5" /> <span><span className="font-semibold">Mejor hora:</span> {country.bestTime}</span></p>
      )}
      {country.crowdLevel && (
        <p className="text-xs text-slate-700 flex items-start gap-1.5"><Users size={13} className="text-sky-600 shrink-0 mt-0.5" /> <span><span className="font-semibold">Nivel de gente:</span> {country.crowdLevel}</span></p>
      )}
      {country.photoTip && (
        <p className="text-xs text-slate-700 flex items-start gap-1.5"><Camera size={13} className="text-sky-600 shrink-0 mt-0.5" /> <span>{country.photoTip}</span></p>
      )}
      {country.entertainment && (
        <p className="text-xs text-slate-700 flex items-start gap-1.5"><Music size={13} className="text-sky-600 shrink-0 mt-0.5" /> <span>{country.entertainment}</span></p>
      )}
      {country.guide && (
        <>
          <button onClick={() => setShowGuide(!showGuide)} className="flex items-center gap-1 text-[11px] text-sky-700 font-medium mt-1">
            <ChevronDown size={12} className={`transition-transform ${showGuide ? 'rotate-180' : ''}`} /> {showGuide ? 'Ocultar' : 'Ver'} estrategia completa
          </button>
          {showGuide && <p className="text-xs text-slate-600 bg-white rounded-lg p-2 mt-1">{country.guide}</p>}
        </>
      )}
    </div>
  );
}

function CountryItemCard({ item, family, onToggle }: { item: CountryItem; family: string[]; onToggle: () => void }) {
  const [assignee, setAssignee] = useState(() => db.getAssignee(item.id));
  const done = db.isDone(item.id);

  return (
    <div className={`bg-white rounded-xl border p-3 shadow-sm transition ${done ? 'border-emerald-300 bg-emerald-50/40' : 'border-slate-200'}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-slate-800">{item.name}</h3>
            <span className="text-xs font-medium text-slate-500">${item.price}</span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
          <div className="flex items-center gap-3 mt-1.5">
            <TasteStars value={item.taste} />
            <PhotogenicRating value={item.photogenic} />
          </div>
        </div>
        <button onClick={onToggle} className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center border-2 transition ${done ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300'}`}>
          {done && <Check size={14} className="text-white" />}
        </button>
      </div>
      <select
        value={assignee}
        onChange={e => { setAssignee(e.target.value); db.setAssignee(item.id, e.target.value); }}
        className="w-full mt-2 border border-slate-200 rounded-lg px-2 py-1.5 text-xs bg-slate-50 focus:outline-none"
      >
        <option value="">¿Quién lo prueba?</option>
        {family.map(f => <option key={f} value={f}>{f}</option>)}
      </select>
    </div>
  );
}
