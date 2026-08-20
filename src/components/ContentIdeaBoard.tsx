import { useState } from 'react';
import { Search, X, Plus, ExternalLink, Music2, Trash2, ChevronDown } from 'lucide-react';
import { db } from '../lib/db';
import type { ContentIdea } from '../types';

interface FormState { title: string; song: string; description: string; referenceUrl: string; tips: string; bestTime: string; tags: string[] }
const emptyForm: FormState = { title: '', song: '', description: '', referenceUrl: '', tips: '', bestTime: '', tags: [] };

export default function ContentIdeaBoard({ platform }: { platform: ContentIdea['platform'] }) {
  const [ideas, setIdeas] = useState<ContentIdea[]>(() => db.getContentIdeas(platform));
  const [tags, setTags] = useState<string[]>(() => db.getIdeaTags());
  const [query, setQuery] = useState('');
  const [tagFilter, setTagFilter] = useState<string | 'all'>('all');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [newTag, setNewTag] = useState('');

  const refreshAll = () => setIdeas(db.getContentIdeas(platform));

  const toggleFormTag = (tag: string) => {
    setForm(f => ({ ...f, tags: f.tags.includes(tag) ? f.tags.filter(t => t !== tag) : [...f.tags, tag] }));
  };

  const addCustomTag = () => {
    const tag = newTag.trim();
    if (!tag) return;
    db.addIdeaTag(tag);
    setTags(db.getIdeaTags());
    setForm(f => ({ ...f, tags: f.tags.includes(tag) ? f.tags : [...f.tags, tag] }));
    setNewTag('');
  };

  const addIdea = () => {
    if (!form.title.trim()) return;
    const idea: ContentIdea = {
      id: crypto.randomUUID(), platform, title: form.title.trim(), song: form.song.trim(),
      description: form.description.trim(), referenceUrl: form.referenceUrl.trim() || undefined,
      tips: form.tips.trim() || undefined, bestTime: form.bestTime.trim(), tags: form.tags,
      status: { filmed: false, edited: false, posted: false }, createdAt: new Date().toISOString(),
    };
    const all = [idea, ...db.getContentIdeas()];
    db.saveContentIdeas(all);
    refreshAll();
    setForm(emptyForm);
    setShowForm(false);
  };

  const setStep = (id: string, step: 'filmed' | 'edited' | 'posted') => {
    const all = db.getContentIdeas();
    const updated = all.map(i => i.id === id ? { ...i, status: { ...i.status, [step]: !i.status[step] } } : i);
    db.saveContentIdeas(updated);
    refreshAll();
  };

  const remove = (id: string) => {
    const all = db.getContentIdeas().filter(i => i.id !== id);
    db.saveContentIdeas(all);
    refreshAll();
  };

  const filtered = ideas.filter(idea => {
    if (tagFilter !== 'all' && !idea.tags.includes(tagFilter)) return false;
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return idea.title.toLowerCase().includes(q) || idea.description.toLowerCase().includes(q) || idea.song.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar idea..." className="w-full border border-slate-200 rounded-xl pl-9 pr-8 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-300" />
          {query && <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"><X size={14} /></button>}
        </div>
        <button onClick={() => { setForm(emptyForm); setShowForm(!showForm); }} className="ml-2 flex items-center gap-1 bg-brand-600 text-white text-xs font-medium px-3 py-2.5 rounded-lg shrink-0">
          <Plus size={14} /> Agregar
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-sm space-y-2">
          <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Título de la idea" autoFocus className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-300" />
          <input value={form.song} onChange={e => setForm(f => ({ ...f, song: e.target.value }))} placeholder="Canción / audio" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-300" />
          <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Descripción de la idea" rows={2} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-300 resize-none" />
          <input value={form.referenceUrl} onChange={e => setForm(f => ({ ...f, referenceUrl: e.target.value }))} placeholder="URL de video de referencia" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-300" />
          <input value={form.tips} onChange={e => setForm(f => ({ ...f, tips: e.target.value }))} placeholder="Tips" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-300" />
          <input value={form.bestTime} onChange={e => setForm(f => ({ ...f, bestTime: e.target.value }))} placeholder="Mejor momento" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-300" />

          <div>
            <p className="text-xs text-slate-500 mb-1.5">Tags</p>
            <div className="flex flex-wrap gap-1.5 mb-1.5">
              {tags.map(tag => (
                <button key={tag} onClick={() => toggleFormTag(tag)} className={`text-xs font-medium px-2.5 py-1.5 rounded-full border transition ${form.tags.includes(tag) ? 'bg-brand-600 text-white border-brand-600' : 'bg-white border-slate-200 text-slate-600'}`}>
                  {tag}
                </button>
              ))}
            </div>
            <div className="flex gap-1.5">
              <input value={newTag} onChange={e => setNewTag(e.target.value)} onKeyDown={e => e.key === 'Enter' && addCustomTag()} placeholder="Nuevo tag..." className="flex-1 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs bg-slate-50 focus:outline-none" />
              <button onClick={addCustomTag} className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-medium">+ Tag</button>
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            <button onClick={addIdea} className="flex-1 bg-brand-600 text-white py-2 rounded-lg text-sm font-medium">Guardar idea</button>
            <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-slate-500">Cancelar</button>
          </div>
        </div>
      )}

      {tags.length > 0 && (
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          <button onClick={() => setTagFilter('all')} className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition ${tagFilter === 'all' ? 'bg-brand-600 text-white border-brand-600' : 'bg-white border-slate-200 text-slate-600'}`}>Todos</button>
          {tags.map(tag => (
            <button key={tag} onClick={() => setTagFilter(tag)} className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition ${tagFilter === tag ? 'bg-brand-600 text-white border-brand-600' : 'bg-white border-slate-200 text-slate-600'}`}>{tag}</button>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <p className="text-center text-sm text-slate-400 py-10">
          {ideas.length === 0 ? 'Agrega la primera idea arriba' : 'Nada coincide con tu búsqueda'}
        </p>
      )}

      {filtered.map(idea => (
        <IdeaCard key={idea.id} idea={idea} onStep={step => setStep(idea.id, step)} onRemove={() => remove(idea.id)} />
      ))}
    </div>
  );
}

function IdeaCard({ idea, onStep, onRemove }: { idea: ContentIdea; onStep: (step: 'filmed' | 'edited' | 'posted') => void; onRemove: () => void }) {
  const [showTips, setShowTips] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-slate-800">{idea.title}</h3>
        <button onClick={onRemove} className="text-slate-300 hover:text-rose-500 transition shrink-0"><Trash2 size={14} /></button>
      </div>
      {idea.song && <p className="text-xs text-slate-500 mt-1 flex items-center gap-1"><Music2 size={11} /> {idea.song}</p>}
      {idea.description && <p className="text-xs text-slate-600 mt-1">{idea.description}</p>}
      {idea.referenceUrl && (
        <a href={idea.referenceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[11px] text-brand-600 mt-1.5 hover:underline">
          <ExternalLink size={11} /> Video de referencia
        </a>
      )}
      {idea.bestTime && <p className="text-xs text-slate-400 mt-1.5">Mejor momento: {idea.bestTime}</p>}
      {idea.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1.5">
          {idea.tags.map(t => <span key={t} className="text-[10px] bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full">{t}</span>)}
        </div>
      )}
      {idea.tips && (
        <>
          <button onClick={() => setShowTips(!showTips)} className="text-[11px] text-slate-400 hover:text-slate-600 mt-1.5 flex items-center gap-1">
            <ChevronDown size={11} className={`transition-transform ${showTips ? 'rotate-180' : ''}`} /> {showTips ? 'Ocultar' : 'Ver'} tips
          </button>
          {showTips && <p className="text-xs text-slate-500 mt-1 bg-slate-50 rounded-lg p-2">{idea.tips}</p>}
        </>
      )}
      <div className="flex gap-1.5 mt-2.5">
        {(['filmed', 'edited', 'posted'] as const).map(step => (
          <button
            key={step}
            onClick={() => onStep(step)}
            className={`flex-1 text-[11px] font-medium py-1.5 rounded-lg border transition ${
              idea.status[step] ? 'bg-brand-600 text-white border-brand-600' : 'border-slate-200 text-slate-500'
            }`}
          >
            {step === 'filmed' ? 'Filmado' : step === 'edited' ? 'Editado' : 'Publicado'}
          </button>
        ))}
      </div>
    </div>
  );
}
