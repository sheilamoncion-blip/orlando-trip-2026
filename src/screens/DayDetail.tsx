import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, Ruler, ExternalLink, Users2, Check, ChevronDown, Shirt } from 'lucide-react';
import { ATTRACTIONS, MEALS, SHOWS, CHARACTERS, BIRTHDAYS, AREA_GUIDES } from '../data/trip';
import { PARK_LABELS } from '../types';
import type { Attraction, Meal, CharacterMeet } from '../types';
import { TasteStars, PhotogenicRating, IntensityDots } from '../components/RatingStars';
import CommentThread from '../components/CommentThread';
import { db } from '../lib/db';
import { fetchLiveWaitTimes, matchLiveWait, type LiveRideStatus } from '../lib/waitTimes';
import BirthdayBanner from '../components/BirthdayBanner';

function groupByArea<T extends { area?: string }>(items: T[]): [string, T[]][] {
  const map = new Map<string, T[]>();
  items.forEach(i => {
    const key = i.area || 'General';
    (map.get(key) || map.set(key, []).get(key)!).push(i);
  });
  return Array.from(map.entries());
}

export default function DayDetail() {
  const { date } = useParams<{ date: string }>();
  const [liveRides, setLiveRides] = useState<LiveRideStatus[] | null>(null);
  const [, forceRerender] = useState(0);

  const attractions = useMemo(() => ATTRACTIONS.filter(a => a.day === date), [date]);
  const meals = useMemo(() => MEALS.filter(m => m.day === date), [date]);
  const shows = useMemo(() => SHOWS.filter(s => s.day === date), [date]);
  const birthday = BIRTHDAYS.find(b => b.date === date);
  const parksToday = Array.from(new Set(attractions.map(a => a.park)));
  const primaryPark = attractions[0]?.park || meals[0]?.park;
  const areasToday = Array.from(new Set(attractions.map(a => a.area).filter(Boolean))) as string[];
  const guidesToday = AREA_GUIDES.filter(g => areasToday.includes(g.name));

  useEffect(() => {
    if (!primaryPark) return;
    fetchLiveWaitTimes(primaryPark).then(setLiveRides);
  }, [primaryPark]);

  const toggleDone = (id: string) => {
    db.setDone(id, !db.isDone(id));
    forceRerender(n => n + 1);
  };

  if (!date || !primaryPark) {
    return (
      <div className="p-4 max-w-lg mx-auto">
        <Link to="/itinerario" className="text-brand-600 text-sm">← Volver al itinerario</Link>
        <p className="mt-4 text-slate-500">Día libre — no hay actividades programadas.</p>
      </div>
    );
  }

  const attractionsByArea = groupByArea(attractions);
  const mealsByArea = groupByArea(meals);
  const charactersByArea = groupByArea(CHARACTERS.filter(c => parksToday.includes(c.park)));

  return (
    <div className="p-4 pb-24 space-y-4 max-w-lg mx-auto">
      <Link to="/itinerario" className="inline-flex items-center gap-1 text-sm text-brand-600"><ArrowLeft size={14} /> Itinerario</Link>

      <header>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{date}</p>
        <h1 className="text-xl font-extrabold text-slate-800">{parksToday.map(p => PARK_LABELS[p]).join(' + ')}</h1>
      </header>

      {birthday && <BirthdayBanner person={birthday} />}
      {birthday && (
        <Link to={`/cumpleanos/${birthday.id}`} className="block bg-gradient-to-r from-amber-50 to-pink-50 border border-amber-200 rounded-xl p-3 text-sm font-medium text-amber-700 text-center">
          🎂 Ver perks especiales de cumpleaños de hoy →
        </Link>
      )}

      {attractionsByArea.map(([area, items]) => {
        const guide = guidesToday.find(g => g.name === area);
        return (
          <section key={area}>
            <div className="flex items-center gap-2 mb-2">
              {guide && <span className="text-lg">{guide.emoji}</span>}
              <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide">{area}</h2>
            </div>
            {guide && <AreaGuideBox guide={guide.guide} bestFor={guide.bestFor} walkFrom={guide.walkFrom} />}
            <div className="space-y-3 mt-2">
              {items.map(a => (
                <AttractionCard key={a.id} attraction={a} live={liveRides ? matchLiveWait(liveRides, a.name) : null} done={db.isDone(a.id)} onToggle={() => toggleDone(a.id)} />
              ))}
            </div>
          </section>
        );
      })}

      {mealsByArea.map(([area, items]) => (
        <section key={`meals-${area}`}>
          <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-2">Comidas — {area}</h2>
          <div className="space-y-3">
            {items.map(m => (
              <MealCard key={m.id} meal={m} done={db.isDone(m.id)} onToggle={() => toggleDone(m.id)} />
            ))}
          </div>
        </section>
      ))}

      {shows.length > 0 && (
        <section>
          <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-2">Shows</h2>
          <div className="space-y-3">
            {shows.map(s => (
              <div key={s.id} className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-800">{s.name}</h3>
                  {s.mustSee && <span className="text-[10px] font-bold bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full">IMPERDIBLE</span>}
                </div>
                <p className="text-xs text-slate-500 mt-1">{s.times.join(' · ')} · {s.durationMin} min · {s.location}</p>
                <CommentThread threadId={s.id} />
              </div>
            ))}
          </div>
        </section>
      )}

      {charactersByArea.map(([area, items]) => (
        <section key={`chars-${area}`}>
          <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-2">Personajes — {area}</h2>
          <div className="space-y-2">
            {items.map(c => <CharacterCard key={c.id} character={c} />)}
          </div>
        </section>
      ))}
    </div>
  );
}

function AreaGuideBox({ guide, bestFor, walkFrom }: { guide: string; bestFor: string; walkFrom?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-brand-50/60 border border-brand-100 rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-3 py-2 text-left">
        <span className="text-xs text-brand-700"><span className="font-semibold">Mejor para:</span> {bestFor}{walkFrom && ` · ${walkFrom}`}</span>
        <ChevronDown size={14} className={`text-brand-500 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <pre className="whitespace-pre-wrap font-sans text-xs text-slate-600 px-3 pb-3 leading-relaxed">{guide}</pre>}
    </div>
  );
}

function AttractionCard({ attraction, live, done, onToggle }: { attraction: Attraction; live: LiveRideStatus | null; done: boolean; onToggle: () => void }) {
  const [note, setNote] = useState(() => db.getNote(attraction.id));
  const [showGuide, setShowGuide] = useState(false);
  const waitToShow = live?.waitMinutes ?? db.getManualWait(attraction.id) ?? attraction.typicalWaitMin;
  const isLive = live?.waitMinutes != null;

  return (
    <div className={`bg-white rounded-xl border p-3.5 shadow-sm transition ${done ? 'border-emerald-300 bg-emerald-50/40' : 'border-slate-200'}`}>
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-slate-800">{attraction.name}</h3>
        <button onClick={onToggle} className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center border-2 transition ${done ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300'}`}>
          {done && <Check size={14} className="text-white" />}
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-xs text-slate-500">
        <span className="flex items-center gap-1"><Clock size={11} /> {attraction.durationMin} min</span>
        <span className={isLive ? 'text-emerald-600 font-semibold' : ''}>
          {isLive ? `⏱ ${waitToShow} min (en vivo)` : `~${waitToShow} min de espera`}
        </span>
        {attraction.heightMinIn && <span className="flex items-center gap-1"><Ruler size={11} /> {attraction.heightMinIn}"</span>}
        <IntensityDots value={attraction.intensity} />
      </div>
      {attraction.bestTime && <p className="text-xs text-emerald-700 mt-1.5">🕐 Mejor hora: {attraction.bestTime}</p>}
      {attraction.hourlyWait && attraction.hourlyWait.length > 0 && (
        <div className="flex gap-1.5 overflow-x-auto mt-2 pb-1">
          {attraction.hourlyWait.map(h => (
            <div key={h.time} className="shrink-0 bg-slate-50 border border-slate-100 rounded-lg px-2 py-1 text-center">
              <p className="text-[9px] text-slate-400">{h.time}</p>
              <p className="text-[11px] font-semibold text-slate-700">{h.minMin}-{h.maxMin}m</p>
            </div>
          ))}
        </div>
      )}
      <p className="text-xs text-slate-500 mt-2 italic">📸 {attraction.photoTip}</p>
      {attraction.referenceLinks.length > 0 && (
        <a href={attraction.referenceLinks[0]} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[11px] text-brand-600 mt-1.5 hover:underline">
          <ExternalLink size={11} /> Fotos de referencia (Pinterest)
        </a>
      )}
      {attraction.guide && (
        <>
          <button onClick={() => setShowGuide(!showGuide)} className="text-[11px] text-slate-400 hover:text-slate-600 mt-1.5 flex items-center gap-1">
            <ChevronDown size={11} className={`transition-transform ${showGuide ? 'rotate-180' : ''}`} /> {showGuide ? 'Ocultar' : 'Ver'} más detalles
          </button>
          {showGuide && <p className="text-xs text-slate-500 mt-1 bg-slate-50 rounded-lg p-2 whitespace-pre-wrap">{attraction.guide}</p>}
        </>
      )}
      <input
        value={note}
        onChange={e => { setNote(e.target.value); db.setNote(attraction.id, e.target.value); }}
        placeholder="Agregar nota personal..."
        className="w-full mt-2 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-brand-400"
      />
      <CommentThread threadId={attraction.id} />
    </div>
  );
}

function MealCard({ meal, done, onToggle }: { meal: Meal; done: boolean; onToggle: () => void }) {
  return (
    <div className={`bg-white rounded-xl border p-3.5 shadow-sm transition ${done ? 'border-emerald-300 bg-emerald-50/40' : 'border-slate-200'}`}>
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-slate-800">{meal.name}</h3>
        <button onClick={onToggle} className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center border-2 transition ${done ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300'}`}>
          {done && <Check size={14} className="text-white" />}
        </button>
      </div>
      <div className="flex items-center gap-3 mt-1">
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
      <CommentThread threadId={meal.id} />
    </div>
  );
}

function CharacterCard({ character }: { character: CharacterMeet }) {
  const [showOutfits, setShowOutfits] = useState(false);
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-sm">
      <div className="flex items-center gap-2">
        <Users2 size={14} className="text-brand-500 shrink-0" />
        <span className="font-medium text-slate-700 text-sm">{character.name}</span>
      </div>
      <p className="text-xs text-slate-500 mt-1">Apariciones: {character.appearanceTimes.join(' · ')}</p>
      <p className="text-xs text-emerald-700">🕐 Mejor hora: {character.bestTime}</p>
      <p className="text-xs text-slate-600 mt-1"><span className="font-medium">Freebies:</span> {character.freebies.join(', ')}</p>
      {character.outfitOptions && character.outfitOptions.length > 0 && (
        <>
          <button onClick={() => setShowOutfits(!showOutfits)} className="flex items-center gap-1 text-[11px] text-brand-600 mt-1.5">
            <Shirt size={12} /> {showOutfits ? 'Ocultar' : 'Ver'} opciones de outfit
          </button>
          {showOutfits && (
            <div className="space-y-1.5 mt-1.5">
              {character.outfitOptions.map(o => (
                <div key={o.label} className="bg-slate-50 rounded-lg px-2.5 py-1.5 text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-700">{o.label}</span>
                    <span className="text-amber-600 font-semibold">{o.impact}/10</span>
                  </div>
                  <p className="text-slate-500 mt-0.5">{o.description} · {o.cost}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      <CommentThread threadId={character.id} />
    </div>
  );
}
