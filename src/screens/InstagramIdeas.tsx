import { useEffect, useMemo, useState } from 'react';
import BackButton from '../components/BackButton';
import PhotoUploader from '../components/PhotoUploader';
import { Camera, Search, X, ExternalLink, Trash2, Plus } from 'lucide-react';
import { PARK_LABELS, type ParkId } from '../types';
import type { InstagramPost } from '../types';
import { db } from '../lib/db';
import { resizeImage } from '../lib/imageUtils';
import { ensureMe } from '../lib/useMe';

const PARK_OPTIONS: (ParkId | 'any')[] = ['any', 'universal', 'islands', 'epic', 'magic-kingdom', 'epcot'];

interface FormState { link: string; photo: string; who: string[]; location: string; park: ParkId | 'any' }
const emptyForm: FormState = { link: '', photo: '', who: [], location: '', park: 'any' };

export default function InstagramIdeas() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  useEffect(() => { db.getInstagramPosts().then(setPosts); }, []);
  const [query, setQuery] = useState('');
  const [whoFilter, setWhoFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const family = db.getFamily();

  const allWho = useMemo(() => Array.from(new Set(posts.flatMap(p => p.who))), [posts]);

  const toggleWho = (name: string) => {
    setForm(f => ({ ...f, who: f.who.includes(name) ? f.who.filter(w => w !== name) : [...f.who, name] }));
  };

  const addPost = async () => {
    if (!form.link.trim()) return;
    const me = await ensureMe();
    const post: InstagramPost = {
      id: crypto.randomUUID(), link: form.link.trim(), photo: form.photo || undefined,
      who: form.who, location: form.location.trim() || undefined, park: form.park,
      uploadedBy: me || undefined, createdAt: new Date().toISOString(),
    };
    const updated = [post, ...posts];
    try {
      await db.saveInstagramPosts(updated);
      setPosts(updated);
      setForm(emptyForm);
      setShowForm(false);
    } catch {
      alert('No se pudo guardar — el navegador se quedó sin espacio. Intenta con una foto más liviana.');
    }
  };

  const remove = async (id: string) => {
    const updated = posts.filter(p => p.id !== id);
    setPosts(updated);
    await db.saveInstagramPosts(updated);
  };

  const filtered = posts.filter(p => {
    if (whoFilter !== 'all' && !p.who.includes(whoFilter)) return false;
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return [p.location, p.uploadedBy, ...p.who].some(f => f?.toLowerCase().includes(q));
  });

  return (
    <div className="p-4 pb-24 max-w-lg mx-auto space-y-3">
      <BackButton fallback="/mas" label="Más" />
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-800 flex items-center gap-2"><Camera size={20} /> Instagram</h1>
          <p className="text-sm text-slate-500">Fichas con los posts que subimos</p>
        </div>
        <button onClick={() => { setForm(emptyForm); setShowForm(!showForm); }} className="flex items-center gap-1 bg-brand-600 text-white text-xs font-medium px-3 py-2 rounded-lg shrink-0">
          <Plus size={14} /> Agregar
        </button>
      </header>

      {showForm && (
        <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-sm space-y-2">
          <input
            value={form.link}
            onChange={e => setForm(f => ({ ...f, link: e.target.value }))}
            placeholder="Link del post/reel de Instagram"
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-300"
          />

          <div className="flex items-center gap-3">
            {form.photo ? (
              <img src={form.photo} className="w-16 h-16 object-cover rounded-lg border border-slate-200" />
            ) : (
              <div className="w-16 h-16 rounded-lg bg-slate-50 border border-dashed border-slate-200 flex items-center justify-center text-slate-300"><Camera size={20} /></div>
            )}
            <PhotoUploader onUpload={async a => { const small = await resizeImage(a); setForm(f => ({ ...f, photo: small })); }} label="Foto de referencia" />
          </div>

          <input
            value={form.location}
            onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
            placeholder="Dónde (ej: Frente al castillo)"
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-300"
          />

          <select value={form.park} onChange={e => setForm(f => ({ ...f, park: e.target.value as ParkId | 'any' }))} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none">
            {PARK_OPTIONS.map(p => <option key={p} value={p}>{p === 'any' ? 'Cualquier parque' : PARK_LABELS[p as ParkId]}</option>)}
          </select>

          <div>
            <p className="text-xs text-slate-500 mb-1.5">¿Quiénes salen?</p>
            <div className="flex flex-wrap gap-1.5">
              {family.map(name => (
                <button
                  key={name}
                  onClick={() => toggleWho(name)}
                  className={`text-xs font-medium px-2.5 py-1.5 rounded-full border transition ${form.who.includes(name) ? 'bg-brand-600 text-white border-brand-600' : 'bg-white border-slate-200 text-slate-600'}`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            <button onClick={addPost} className="flex-1 bg-brand-600 text-white py-2 rounded-lg text-sm font-medium">Guardar</button>
            <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-slate-500">Cancelar</button>
          </div>
        </div>
      )}

      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar por lugar o quién sale..." className="w-full border border-slate-200 rounded-xl pl-9 pr-8 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-300" />
        {query && <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"><X size={14} /></button>}
      </div>

      {allWho.length > 0 && (
        <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-4 px-4">
          <button onClick={() => setWhoFilter('all')} className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition ${whoFilter === 'all' ? 'bg-brand-600 text-white border-brand-600' : 'bg-white border-slate-200 text-slate-600'}`}>Todos</button>
          {allWho.map(w => (
            <button key={w} onClick={() => setWhoFilter(w)} className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition ${whoFilter === w ? 'bg-brand-600 text-white border-brand-600' : 'bg-white border-slate-200 text-slate-600'}`}>{w}</button>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <p className="text-center text-sm text-slate-400 py-10">
          {posts.length === 0 ? 'Agrega el primer post arriba' : 'Nada coincide con tu búsqueda'}
        </p>
      )}

      {filtered.map(post => (
        <div key={post.id} className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-sm flex gap-3">
          {post.photo && <img src={post.photo} className="w-16 h-16 object-cover rounded-lg border border-slate-200 shrink-0" />}
          <div className="flex-1 min-w-0">
            <a href={post.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:underline break-all">
              <ExternalLink size={13} className="shrink-0" /> Ver post
            </a>
            {post.location && <p className="text-xs text-slate-600 mt-1">{post.location}{post.park && post.park !== 'any' && ` · ${PARK_LABELS[post.park]}`}</p>}
            {post.who.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1.5">
                {post.who.map(w => <span key={w} className="text-[10px] bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full">{w}</span>)}
              </div>
            )}
            {post.uploadedBy && <p className="text-[10px] text-slate-400 mt-1.5">Subido por {post.uploadedBy}</p>}
          </div>
          <button onClick={() => remove(post.id)} className="text-slate-300 hover:text-rose-500 transition shrink-0"><Trash2 size={14} /></button>
        </div>
      ))}
    </div>
  );
}
