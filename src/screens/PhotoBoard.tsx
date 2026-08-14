import { useEffect, useMemo, useState } from 'react';
import BackButton from '../components/BackButton';
import { Trash2, Search, X } from 'lucide-react';
import PhotoUploader from '../components/PhotoUploader';
import { db } from '../lib/db';
import { resizeImage } from '../lib/imageUtils';
import type { PhotoBoardItem, ParkId } from '../types';
import { PARK_LABELS } from '../types';

const PARK_OPTIONS: (ParkId | 'any')[] = ['any', 'universal', 'islands', 'epic', 'magic-kingdom', 'epcot'];

export default function PhotoBoard() {
  const [items, setItems] = useState<PhotoBoardItem[]>([]);
  useEffect(() => { db.getPhotoBoard().then(setItems); }, []);
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'reference' | 'ours'>('all');
  const [parkFilter, setParkFilter] = useState<ParkId | 'any' | 'all'>('all');
  const [uploaderFilter, setUploaderFilter] = useState('all');

  const uploaders = useMemo(() => Array.from(new Set(items.map(i => i.uploadedBy).filter(Boolean))) as string[], [items]);

  const currentUploader = () => {
    const saved = localStorage.getItem('otp_me');
    if (saved) return saved;
    const name = window.prompt('¿Cuál es tu nombre? (para que la familia sepa quién subió esta foto)') || 'Alguien';
    localStorage.setItem('otp_me', name);
    return name;
  };

  const upload = (type: 'reference' | 'ours') => async (dataUrl: string, filename: string) => {
    try {
      const resized = await resizeImage(dataUrl);
      const item: PhotoBoardItem = { id: crypto.randomUUID(), type, park: 'any', dataUrl: resized, filename, uploadedBy: currentUploader(), createdAt: new Date().toISOString() };
      const updated = [item, ...items];
      await db.savePhotoBoard(updated);
      setItems(updated);
    } catch {
      alert('No se pudo guardar la foto. Intenta de nuevo — si sigue fallando, avísale a Sheila.');
    }
  };

  const updateItem = async (id: string, patch: Partial<PhotoBoardItem>) => {
    const updated = items.map(i => i.id === id ? { ...i, ...patch } : i);
    setItems(updated);
    await db.savePhotoBoard(updated);
  };

  const remove = async (id: string) => {
    const updated = items.filter(i => i.id !== id);
    setItems(updated);
    await db.savePhotoBoard(updated);
  };

  const filtered = items.filter(i => {
    if (typeFilter !== 'all' && i.type !== typeFilter) return false;
    if (parkFilter !== 'all' && i.park !== parkFilter) return false;
    if (uploaderFilter !== 'all' && i.uploadedBy !== uploaderFilter) return false;
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return [i.note, i.whereToStand, i.bestTime, i.filename, i.uploadedBy].some(f => f?.toLowerCase().includes(q));
  });

  const recreated = items.filter(i => i.type === 'ours').length;

  return (
    <div className="p-4 pb-24 max-w-lg mx-auto space-y-4">
      <BackButton fallback="/mas" label="Más" />
      <header>
        <h1 className="text-xl font-extrabold text-slate-800">Tablero de Inspiración</h1>
        <p className="text-sm text-slate-500">Fotos de Pinterest + nuestras fotos — {recreated} recreadas</p>
      </header>

      <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-sm flex flex-wrap gap-2">
        <PhotoUploader onUpload={upload('reference')} label="Subir foto de Pinterest" />
        <PhotoUploader onUpload={upload('ours')} label="Subir nuestra foto" />
      </div>

      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Buscar por nota, dónde pararse, mejor hora, quién subió..."
          className="w-full border border-slate-200 rounded-xl pl-9 pr-8 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-300"
        />
        {query && <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"><X size={14} /></button>}
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-4 px-4">
        {(['all', 'reference', 'ours'] as const).map(t => (
          <button key={t} onClick={() => setTypeFilter(t)} className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition ${typeFilter === t ? 'bg-brand-600 text-white border-brand-600' : 'bg-white border-slate-200 text-slate-600'}`}>
            {t === 'all' ? 'Todas' : t === 'reference' ? 'Pinterest' : 'Nuestras'}
          </button>
        ))}
        <select value={parkFilter} onChange={e => setParkFilter(e.target.value as any)} className="shrink-0 border border-slate-200 rounded-full px-3 py-1.5 text-xs bg-white">
          <option value="all">Todos los parques</option>
          {PARK_OPTIONS.filter(p => p !== 'any').map(p => <option key={p} value={p}>{PARK_LABELS[p as ParkId]}</option>)}
        </select>
        {uploaders.length > 0 && (
          <select value={uploaderFilter} onChange={e => setUploaderFilter(e.target.value)} className="shrink-0 border border-slate-200 rounded-full px-3 py-1.5 text-xs bg-white">
            <option value="all">Quien sea</option>
            {uploaders.map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {filtered.map(item => (
          <PhotoCard key={item.id} item={item} onUpdate={patch => updateItem(item.id, patch)} onRemove={() => remove(item.id)} />
        ))}
        {filtered.length === 0 && <p className="col-span-2 text-center text-sm text-slate-400 py-10">{items.length === 0 ? 'Sube la primera foto arriba' : 'Nada coincide con tu búsqueda'}</p>}
      </div>
    </div>
  );
}

function PhotoCard({ item, onUpdate, onRemove }: { item: PhotoBoardItem; onUpdate: (patch: Partial<PhotoBoardItem>) => void; onRemove: () => void }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="relative group">
        <img src={item.dataUrl} alt={item.filename} className="w-full aspect-square object-cover" />
        <span className={`absolute top-1.5 left-1.5 text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${item.type === 'reference' ? 'bg-rose-500 text-white' : 'bg-emerald-500 text-white'}`}>
          {item.type === 'reference' ? 'Pinterest' : 'Nuestra'}
        </span>
        <button onClick={onRemove} className="absolute top-1.5 right-1.5 bg-white/90 rounded-full p-1 opacity-0 group-hover:opacity-100 transition text-rose-500">
          <Trash2 size={12} />
        </button>
      </div>
      <div className="p-2 space-y-1.5">
        <select value={item.park} onChange={e => onUpdate({ park: e.target.value as any })} className="w-full border border-slate-200 rounded-lg px-1.5 py-1 text-[10px] bg-slate-50">
          {PARK_OPTIONS.map(p => <option key={p} value={p}>{p === 'any' ? 'Cualquier parque' : PARK_LABELS[p as ParkId]}</option>)}
        </select>
        <input value={item.whereToStand || ''} onChange={e => onUpdate({ whereToStand: e.target.value })} placeholder="Dónde pararse" className="w-full border border-slate-200 rounded-lg px-1.5 py-1 text-[10px] bg-slate-50" />
        <input value={item.bestTime || ''} onChange={e => onUpdate({ bestTime: e.target.value })} placeholder="Mejor hora" className="w-full border border-slate-200 rounded-lg px-1.5 py-1 text-[10px] bg-slate-50" />
        <textarea value={item.note || ''} onChange={e => onUpdate({ note: e.target.value })} placeholder="Nota..." rows={2} className="w-full border border-slate-200 rounded-lg px-1.5 py-1 text-[10px] bg-slate-50 resize-none" />
        {item.uploadedBy && <p className="text-[9px] text-slate-400">Subido por {item.uploadedBy}</p>}
      </div>
    </div>
  );
}
