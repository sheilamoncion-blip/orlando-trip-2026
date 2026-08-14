import { useMemo, useState } from 'react';
import BackButton from '../components/BackButton';
import PhotoUploader from '../components/PhotoUploader';
import { Plus, X, MapPinned, Phone, Cake as CakeIcon, Users, Pencil } from 'lucide-react';
import { db } from '../lib/db';
import { removeBackground } from '../lib/imageUtils';
import type { FamilyMember } from '../types';

function groupByLabel(members: FamilyMember[]): [string, FamilyMember[]][] {
  const map = new Map<string, FamilyMember[]>();
  members.forEach(m => {
    (map.get(m.groupLabel) || map.set(m.groupLabel, []).get(m.groupLabel)!).push(m);
  });
  return Array.from(map.entries());
}

function initials(name: string): string {
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0]?.toUpperCase()).join('');
}

function Avatar({ member, size = 'md' }: { member: FamilyMember; size?: 'md' | 'lg' }) {
  const dims = size === 'lg' ? 'w-24 h-32' : 'w-20 h-24';
  if (member.avatar) {
    return <img src={member.avatar} className={`${dims} object-contain`} style={{ filter: 'drop-shadow(0 3px 5px rgba(0,0,0,0.25))' }} />;
  }
  return (
    <div className={`${dims} rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold border border-slate-100 ${size === 'lg' ? 'text-2xl' : 'text-base'}`}>
      {initials(member.name)}
    </div>
  );
}

interface FormState { name: string; age: string; phone: string; groupLabel: string; avatar: string }
const emptyForm: FormState = { name: '', age: '', phone: '', groupLabel: '', avatar: '' };

export default function Family() {
  const [members, setMembers] = useState<FamilyMember[]>(() => db.getFamilyMembers());
  const [selected, setSelected] = useState<FamilyMember | null>(null);
  const [editing, setEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [groupStatus, setGroupStatus] = useState(() => db.getGroupStatus());
  const [myStatus, setMyStatus] = useState('');

  const existingGroups = useMemo(() => Array.from(new Set(members.map(m => m.groupLabel))), [members]);
  const grouped = useMemo(() => groupByLabel(members), [members]);

  const addMember = () => {
    if (!form.name.trim() || !form.groupLabel.trim()) return;
    const member: FamilyMember = {
      id: crypto.randomUUID(), name: form.name.trim(), age: form.age ? Number(form.age) : undefined,
      phone: form.phone.trim() || undefined, avatar: form.avatar || undefined, groupLabel: form.groupLabel.trim(),
    };
    const updated = [...members, member];
    setMembers(updated);
    db.saveFamilyMembers(updated);
    setForm(emptyForm);
    setShowForm(false);
  };

  const startEdit = (m: FamilyMember) => {
    setForm({ name: m.name, age: m.age ? String(m.age) : '', phone: m.phone || '', groupLabel: m.groupLabel, avatar: m.avatar || '' });
    setEditing(true);
  };

  const saveEdit = () => {
    if (!selected || !form.name.trim() || !form.groupLabel.trim()) return;
    const updatedMember: FamilyMember = {
      ...selected, name: form.name.trim(), age: form.age ? Number(form.age) : undefined,
      phone: form.phone.trim() || undefined, avatar: form.avatar || undefined, groupLabel: form.groupLabel.trim(),
    };
    const updated = members.map(m => m.id === selected.id ? updatedMember : m);
    setMembers(updated);
    db.saveFamilyMembers(updated);
    setSelected(updatedMember);
    setEditing(false);
  };

  const removeMember = (id: string) => {
    const updated = members.filter(m => m.id !== id);
    setMembers(updated);
    db.saveFamilyMembers(updated);
    setSelected(null);
    setEditing(false);
  };

  const closeModal = () => { setSelected(null); setEditing(false); };

  const shareStatus = () => {
    const me = localStorage.getItem('otp_me') || 'Alguien';
    if (!myStatus.trim()) return;
    db.setGroupStatus(me, myStatus.trim());
    setGroupStatus(db.getGroupStatus());
    setMyStatus('');
  };

  const companions = selected ? members.filter(m => m.groupLabel === selected.groupLabel && m.id !== selected.id) : [];

  return (
    <div className="p-4 pb-24 max-w-lg mx-auto space-y-4">
      <BackButton fallback="/mas" label="Más" />
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-800">Familia</h1>
          <p className="text-sm text-slate-500">{members.length} en la lista</p>
        </div>
        <button onClick={() => { setForm(emptyForm); setShowForm(!showForm); }} className="flex items-center gap-1 bg-brand-600 text-white text-xs font-medium px-3 py-2 rounded-lg">
          <Plus size={14} /> Agregar
        </button>
      </header>

      {showForm && (
        <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-sm space-y-2">
          <div className="flex items-center gap-3">
            {form.avatar ? (
              <img src={form.avatar} className="w-16 h-20 object-contain" style={{ filter: 'drop-shadow(0 3px 5px rgba(0,0,0,0.25))' }} />
            ) : (
              <div className="w-16 h-20 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center text-lg font-bold shrink-0">{form.name ? initials(form.name) : '?'}</div>
            )}
            <PhotoUploader onUpload={async a => { const bg = await removeBackground(a); setForm(f => ({ ...f, avatar: bg })); }} label="Subir avatar" />
          </div>
          <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Nombre y apellido" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-300" />
          <div className="grid grid-cols-2 gap-2">
            <input value={form.age} onChange={e => setForm(f => ({ ...f, age: e.target.value }))} type="number" placeholder="Edad" className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-300" />
            <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="Teléfono" className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-300" />
          </div>
          <input
            value={form.groupLabel}
            onChange={e => setForm(f => ({ ...f, groupLabel: e.target.value }))}
            list="group-options"
            placeholder="Grupo (ej: Mamá y yo, Mi prima con su esposo e hijas)"
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-300"
          />
          <datalist id="group-options">
            {existingGroups.map(g => <option key={g} value={g} />)}
          </datalist>
          <div className="flex gap-2">
            <button onClick={addMember} className="flex-1 bg-brand-600 text-white py-2 rounded-lg text-sm font-medium">Guardar</button>
            <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-slate-500">Cancelar</button>
          </div>
        </div>
      )}

      {grouped.length === 0 && !showForm && (
        <p className="text-center text-sm text-slate-400 py-10">Agrega al primer familiar arriba</p>
      )}

      {grouped.map(([label, groupMembers]) => (
        <section key={label}>
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1.5"><Users size={12} /> {label}</h2>
          <div className="flex flex-wrap gap-3">
            {groupMembers.map(m => (
              <button key={m.id} onClick={() => setSelected(m)} className="flex flex-col items-center gap-1 w-20">
                <Avatar member={m} />
                <span className="text-[10px] text-slate-600 text-center leading-tight line-clamp-2">{m.name}</span>
              </button>
            ))}
          </div>
        </section>
      ))}

      <section>
        <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-2 flex items-center gap-1.5"><MapPinned size={14} /> ¿Dónde está cada quién?</h2>
        <p className="text-xs text-slate-500 mb-2">
          El GPS en vivo entre 20 personas requiere un backend compartido (ver README — Fase 2 con Supabase).
          Por ahora, cada quien escribe dónde está y se actualiza al recargar la app.
        </p>
        <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-sm space-y-2">
          <div className="flex gap-2">
            <input value={myStatus} onChange={e => setMyStatus(e.target.value)} onKeyDown={e => e.key === 'Enter' && shareStatus()} placeholder="Ej: En Space Mountain, nos vemos en 30 min" className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-xs bg-white focus:outline-none" />
            <button onClick={shareStatus} className="bg-brand-600 text-white px-3 py-2 rounded-lg text-xs font-medium">Compartir</button>
          </div>
          <div className="space-y-1.5 pt-1">
            {groupStatus.length === 0 && <p className="text-xs text-slate-400 text-center py-2">Nadie ha compartido su estado todavía</p>}
            {groupStatus.map(g => (
              <div key={g.name} className="flex items-center justify-between text-xs bg-slate-50 rounded-lg px-3 py-2">
                <span className="font-medium text-slate-700">{g.name}</span>
                <span className="text-slate-500">{g.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selected && !editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4" onClick={closeModal}>
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-3" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar member={selected} size="lg" />
                <div>
                  <p className="text-base font-bold text-slate-800">{selected.name}</p>
                  <p className="text-xs text-slate-500">{selected.groupLabel}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => startEdit(selected)} className="text-slate-400 hover:text-brand-600"><Pencil size={16} /></button>
                <button onClick={closeModal} className="text-slate-400"><X size={18} /></button>
              </div>
            </div>

            <div className="space-y-1.5 text-sm">
              {selected.age && <p className="flex items-center gap-2 text-slate-700"><CakeIcon size={14} className="text-slate-400" /> {selected.age} años</p>}
              {selected.phone && <p className="flex items-center gap-2 text-slate-700"><Phone size={14} className="text-slate-400" /> {selected.phone}</p>}
            </div>

            {companions.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Acompañantes</p>
                <div className="flex flex-wrap gap-1.5">
                  {companions.map(c => (
                    <span key={c.id} className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full">{c.name}</span>
                  ))}
                </div>
              </div>
            )}

            <button onClick={() => removeMember(selected.id)} className="w-full text-center text-xs text-rose-500 pt-2">Eliminar de la lista</button>
          </div>
        </div>
      )}

      {selected && editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4" onClick={() => setEditing(false)}>
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-2" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-1">
              <p className="text-base font-bold text-slate-800">Editar perfil</p>
              <button onClick={() => setEditing(false)} className="text-slate-400"><X size={18} /></button>
            </div>
            <div className="flex items-center gap-3">
              {form.avatar ? (
                <img src={form.avatar} className="w-16 h-20 object-contain" style={{ filter: 'drop-shadow(0 3px 5px rgba(0,0,0,0.25))' }} />
              ) : (
                <div className="w-16 h-20 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center text-lg font-bold shrink-0">{form.name ? initials(form.name) : '?'}</div>
              )}
              <PhotoUploader onUpload={async a => { const bg = await removeBackground(a); setForm(f => ({ ...f, avatar: bg })); }} label="Cambiar avatar" />
            </div>
            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Nombre y apellido" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-300" />
            <div className="grid grid-cols-2 gap-2">
              <input value={form.age} onChange={e => setForm(f => ({ ...f, age: e.target.value }))} type="number" placeholder="Edad" className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-300" />
              <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="Teléfono" className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-300" />
            </div>
            <input
              value={form.groupLabel}
              onChange={e => setForm(f => ({ ...f, groupLabel: e.target.value }))}
              list="group-options"
              placeholder="Grupo"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-300"
            />
            <div className="flex gap-2 pt-1">
              <button onClick={saveEdit} className="flex-1 bg-brand-600 text-white py-2 rounded-lg text-sm font-medium">Guardar cambios</button>
              <button onClick={() => setEditing(false)} className="px-4 py-2 text-sm text-slate-500">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
