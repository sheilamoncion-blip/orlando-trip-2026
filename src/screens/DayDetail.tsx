import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import ItemPhotos from '../components/ItemPhotos';
import { Clock, Ruler, ExternalLink, Users2, Check, ChevronDown, Shirt, Search, X } from 'lucide-react';
import { ATTRACTIONS, MEALS, SHOWS, CHARACTERS, BIRTHDAYS, AREA_GUIDES } from '../data/trip';
import { PARK_LABELS } from '../types';
import type { Attraction, CharacterMeet, ShowItem } from '../types';
import { IntensityDots } from '../components/RatingStars';
import CommentThread from '../components/CommentThread';
import { db } from '../lib/db';
import { groupByVenue, VenueCard } from '../components/VenueMeals';
import { fetchLiveWaitTimes, matchLiveWait, type LiveRideStatus } from '../lib/waitTimes';
import BirthdayBanner from '../components/BirthdayBanner';

function groupByArea<T extends { area?: string }>(items: T[], areaOrder?: string[]): [string, T[]][] {
  const map = new Map<string, T[]>();
  items.forEach(i => {
    const key = i.area || 'General';
    (map.get(key) || map.set(key, []).get(key)!).push(i);
  });
  if (!areaOrder) return Array.from(map.entries());
  const ordered: [string, T[]][] = [];
  areaOrder.forEach(area => { if (map.has(area)) { ordered.push([area, map.get(area)!]); map.delete(area); } });
  map.forEach((v, k) => ordered.push([k, v]));
  return ordered;
}

function matchesQuery(query: string, ...fields: (string | undefined)[]): boolean {
  if (!query.trim()) return true;
  const q = query.toLowerCase();
  return fields.some(f => f?.toLowerCase().includes(q));
}

type Tab = 'atracciones' | 'comidas' | 'shows' | 'personajes';

export default function DayDetail() {
  const { date } = useParams<{ date: string }>();
  const [liveRides, setLiveRides] = useState<LiveRideStatus[] | null>(null);
  const [, forceRerender] = useState(0);
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState<Tab>('atracciones');

  const attractions = useMemo(() => ATTRACTIONS.filter(a => a.day === date), [date]);
  const meals = useMemo(() => MEALS.filter(m => m.day === date), [date]);
  const shows = useMemo(() => SHOWS.filter(s => s.day === date), [date]);
  const birthday = BIRTHDAYS.find(b => b.date === date);
  const parksToday = Array.from(new Set(attractions.map(a => a.park)));
  const primaryPark = attractions[0]?.park || meals[0]?.park;
  const areasToday = Array.from(new Set(attractions.map(a => a.area).filter(Boolean))) as string[];
  const guidesToday = AREA_GUIDES.filter(g => areasToday.includes(g.name));
  const characters = useMemo(() => CHARACTERS.filter(c => parksToday.includes(c.park)), [parksToday]);

  useEffect(() => {
    if (!primaryPark) return;
    fetchLiveWaitTimes(primaryPark).then(setLiveRides);
  }, [primaryPark]);

  useEffect(() => { setQuery(''); }, [tab]);

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

  const filteredAttractions = attractions.filter(a => matchesQuery(query, a.name, a.area, a.photoTip));
  const filteredMeals = meals.filter(m => matchesQuery(query, m.name, m.area, m.venue, m.recommended.join(' ')));
  const filteredShows = shows.filter(s => matchesQuery(query, s.name, s.location));
  const filteredCharacters = characters.filter(c => matchesQuery(query, c.name, c.area, c.freebies.join(' ')));

  const attractionsByArea = groupByArea(filteredAttractions);
  const areaOrder = attractionsByArea.map(([area]) => area);
  const mealsByArea = groupByArea(filteredMeals, areaOrder);
  const charactersByArea = groupByArea(filteredCharacters, areaOrder);

  const ALL_TABS: { key: Tab; label: string; count: number }[] = [
    { key: 'atracciones' as Tab, label: 'Áreas', count: attractions.length },
    { key: 'comidas' as Tab, label: 'Comidas', count: meals.length },
    { key: 'shows' as Tab, label: 'Shows', count: shows.length },
    { key: 'personajes' as Tab, label: 'Personajes', count: characters.length },
  ];
  const TABS = ALL_TABS.filter(t => t.count > 0);

  return (
    <div className="p-4 pb-24 space-y-4 max-w-lg mx-auto">
      <BackButton fallback="/itinerario" label="Itinerario" />

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

      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 overflow-x-auto">
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 min-w-0 py-2 px-2 rounded-lg text-xs font-medium whitespace-nowrap transition ${tab === t.key ? 'bg-white text-brand-700 shadow-sm' : 'text-slate-500'}`}
          >
            {t.label} <span className="text-[10px] text-slate-400">({t.count})</span>
          </button>
        ))}
      </div>

      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={`Buscar en ${TABS.find(t => t.key === tab)?.label.toLowerCase() || ''}...`}
          className="w-full border border-slate-200 rounded-xl pl-9 pr-8 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-300"
        />
        {query && (
          <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
            <X size={14} />
          </button>
        )}
      </div>

      {tab === 'atracciones' && (
        attractionsByArea.length === 0 ? <EmptyState query={query} /> :
        attractionsByArea.map(([area, items]) => {
          const guide = guidesToday.find(g => g.name === area);
          return (
            <AreaSection key={area} area={area} emoji={guide?.emoji} defaultOpen={!!query}>
              {guide && <AreaGuideBox guide={guide.guide} bestFor={guide.bestFor} walkFrom={guide.walkFrom} />}
              <div className="space-y-3 mt-2">
                {items.map(a => (
                  <AttractionCard key={a.id} attraction={a} live={liveRides ? matchLiveWait(liveRides, a.name) : null} done={db.isDone(a.id)} onToggle={() => toggleDone(a.id)} />
                ))}
              </div>
            </AreaSection>
          );
        })
      )}

      {tab === 'comidas' && (
        mealsByArea.length === 0 ? <EmptyState query={query} /> :
        mealsByArea.map(([area, items]) => (
          <AreaSection key={`meals-${area}`} area={area} defaultOpen={!!query}>
            <div className="space-y-2.5">
              {groupByVenue(items).map(([venue, venueItems]) => (
                <VenueCard key={venue} venue={venue} items={venueItems} onToggle={toggleDone} />
              ))}
            </div>
          </AreaSection>
        ))
      )}

      {tab === 'shows' && (
        filteredShows.length === 0 ? <EmptyState query={query} /> : (
          <section>
            <div className="space-y-3">
              {filteredShows.map((s: ShowItem) => (
                <div key={s.id} className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-slate-800">{s.name}</h3>
                    {s.mustSee && <span className="text-[10px] font-bold bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full">IMPERDIBLE</span>}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{s.times.join(' · ')} · {s.durationMin} min · {s.location}</p>
                  <ItemPhotos itemId={s.id} />
                  <CommentThread threadId={s.id} />
                </div>
              ))}
            </div>
          </section>
        )
      )}

      {tab === 'personajes' && (
        charactersByArea.length === 0 ? <EmptyState query={query} /> :
        charactersByArea.map(([area, items]) => (
          <AreaSection key={`chars-${area}`} area={area} defaultOpen={!!query}>
            <div className="space-y-2">
              {items.map(c => <CharacterCard key={c.id} character={c} />)}
            </div>
          </AreaSection>
        ))
      )}
    </div>
  );
}

function EmptyState({ query }: { query: string }) {
  return (
    <p className="text-center text-sm text-slate-400 py-10">
      {query ? `Nada coincide con "${query}"` : 'Nada por aquí todavía'}
    </p>
  );
}

function AreaSection({ area, emoji, defaultOpen, children }: { area: string; emoji?: string; defaultOpen?: boolean; children: ReactNode }) {
  const [open, setOpen] = useState(true);
  useEffect(() => { if (defaultOpen) setOpen(true); }, [defaultOpen]);

  return (
    <section>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-2 mb-2 text-left">
        {emoji && <span className="text-lg">{emoji}</span>}
        <h2 className="flex-1 text-sm font-bold text-slate-700 uppercase tracking-wide">{area}</h2>
        <ChevronDown size={16} className={`text-slate-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && children}
    </section>
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
      <ItemPhotos itemId={attraction.id} />
      <CommentThread threadId={attraction.id} />
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
      <ItemPhotos itemId={character.id} />
      <CommentThread threadId={character.id} />
    </div>
  );
}
