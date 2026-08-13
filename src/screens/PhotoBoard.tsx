import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2 } from 'lucide-react';
import PhotoUploader from '../components/PhotoUploader';
import { db } from '../lib/db';
import type { PhotoBoardItem } from '../types';

export default function PhotoBoard() {
  const [items, setItems] = useState<PhotoBoardItem[]>(() => db.getPhotoBoard());
  const [refUrl, setRefUrl] = useState('');
  const [refNote, setRefNote] = useState('');

  const addReference = () => {
    if (!refUrl.trim()) return;
    const item: PhotoBoardItem = { id: crypto.randomUUID(), park: 'any', refUrl: refUrl.trim(), refNote: refNote.trim(), createdAt: new Date().toISOString() };
    const updated = [item, ...items];
    setItems(updated);
    db.savePhotoBoard(updated);
    setRefUrl(''); setRefNote('');
  };

  const uploadFamilyPhoto = (dataUrl: string, filename: string) => {
    const item: PhotoBoardItem = { id: crypto.randomUUID(), park: 'any', refUrl: '', refNote: '', dataUrl, filename, createdAt: new Date().toISOString() };
    const updated = [item, ...items];
    setItems(updated);
    db.savePhotoBoard(updated);
  };

  const remove = (id: string) => {
    const updated = items.filter(i => i.id !== id);
    setItems(updated);
    db.savePhotoBoard(updated);
  };

  const recreated = items.filter(i => i.dataUrl).length;

  return (
    <div className="p-4 pb-24 max-w-lg mx-auto space-y-4">
      <Link to="/mas" className="inline-flex items-center gap-1 text-sm text-brand-600"><ArrowLeft size={14} /> Más</Link>
      <header>
        <h1 className="text-xl font-extrabold text-slate-800">Tablero de Inspiración</h1>
        <p className="text-sm text-slate-500">Referencias de Pinterest + fotos de la familia — {recreated} recreadas</p>
      </header>

      <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-sm space-y-2">
        <p className="text-xs font-semibold text-slate-600">Agregar referencia (link de Pinterest, etc.)</p>
        <input value={refUrl} onChange={e => setRefUrl(e.target.value)} placeholder="https://pinterest.com/..." className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs bg-slate-50 focus:outline-none" />
        <input value={refNote} onChange={e => setRefNote(e.target.value)} placeholder="Nota (ej: castillo de noche, ángulo bajo)" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs bg-slate-50 focus:outline-none" />
        <div className="flex items-center justify-between">
          <button onClick={addReference} className="bg-brand-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium">Guardar referencia</button>
          <PhotoUploader onUpload={uploadFamilyPhoto} label="Subir nuestra foto" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {items.map(item => (
          <div key={item.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm relative group">
            {item.dataUrl ? (
              <img src={item.dataUrl} alt={item.filename} className="w-full aspect-square object-cover" />
            ) : (
              <a href={item.refUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center aspect-square bg-slate-50 text-xs text-brand-600 p-3 text-center underline">
                Ver referencia
              </a>
            )}
            <div className="p-2">
              {item.refNote && <p className="text-[10px] text-slate-500 line-clamp-2">{item.refNote}</p>}
              {item.filename && <p className="text-[10px] text-emerald-600 font-medium">✓ Nuestra versión</p>}
            </div>
            <button onClick={() => remove(item.id)} className="absolute top-1.5 right-1.5 bg-white/90 rounded-full p-1 opacity-0 group-hover:opacity-100 transition text-rose-500">
              <Trash2 size={12} />
            </button>
          </div>
        ))}
        {items.length === 0 && <p className="col-span-2 text-center text-sm text-slate-400 py-10">Agrega la primera referencia arriba</p>}
      </div>
    </div>
  );
}
