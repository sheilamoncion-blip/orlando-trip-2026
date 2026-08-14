import { useEffect, useMemo, useState } from 'react';
import BackButton from '../components/BackButton';
import PhotoUploader from '../components/PhotoUploader';
import { Plus, X, MapPinned, Phone, Cake as CakeIcon, Users, Pencil, UserPlus, Trash2 } from 'lucide-react';
import { db } from '../lib/db';
import { resizeImage } from '../lib/imageUtils';
import type { FamilyMember, FamilyGroup } from '../types';

function initials(name: string): string {
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0]?.toUpperCase()).join('');
}

function Avatar({ member, size = 'md' }: { member: FamilyMember; size?: 'md' | 'lg' }) {
  const box = size === 'lg' ? 'w-28 h-32' : 'w-20 h-24';
  return (
    <div className={`${box} rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center overflow-hidden shrink-0`}>
      {member.avatar ? (
        <img src={member.avatar} className="w-full h-full object-contain" />
      ) : (
        <span className={`text-brand-600 font-bold ${size === 'lg' ? 'text-2xl' : 'text-base'}`}>{initials(member.name)}</span>
      )}
    </div>
  );
}

interface FormState { name: string; age: string; phone: string; avatar: string }
const emptyForm: FormState = { name: '', age: '', phone: '', avatar: '' };

export default function Family() {
  const [groups, setGroups] = useState<FamilyGroup[]>(() => db.getFamilyGroups());
  const [members, setMembers] = useState<FamilyMember[]>([]);
  useEffect(() => { db.getFamilyMembers().then(setMembers); }, []);
  const [selected, setSelected] = useState<FamilyMember | null>(null);
  const [editing, setEditing] = useState(false);
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [newGroupLabel, setNewGroupLabel] = useState('');
  const [addingToGroup, setAddingToGroup] = useState<FamilyGroup | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [groupStatus, setGroupStatus] = useState(() => db.getGroupStatus());
  const [myStatus, setMyStatus] = useState('');

  const membersByGroup = useMemo(() => {
    const map = new Map<string, FamilyMember[]>();
    members.forEach(m => {
      (map.get(m.groupLabel) || map.set(m.groupLabel, []).get(m.groupLabel)!).push(m);
    });
    return map;
  }, [members]);

  const addGroup = () => {
    if (!newGroupLabel.trim()) return;
    const group: FamilyGroup = { id: crypto.randomUUID(), label: newGroupLabel.trim() };
    const updated = [...groups, group];
    setGroups(updated);
    db.saveFamilyGroups(updated);
    setNewGroupLabel('');
    setShowAddGroup(false);
    setAddingToGroup(group);
    setForm(emptyForm);
  };

  const addMember = async () => {
    if (!form.name.trim() || !addingToGroup) return;
    const member: FamilyMember = {
      id: crypto.randomUUID(), name: form.name.trim(), age: form.age ? Number(form.age) : undefined,
      phone: form.phone.trim() || undefined, avatar: form.avatar || undefined, groupLabel: addingToGroup.label,
    };
    const updated = [...members, member];
    try {
      await db.saveFamilyMembers(updated);
      setMembers(updated);
      setForm(emptyForm);
      setAddingToGroup(null);
    } catch {
      alert('No se pudo guardar. Intenta de nuevo — si sigue fallando, avísale a Sheila.');
    }
  };

  const startEdit = (m: FamilyMember) => {
    setForm({ name: m.name, age: m.age ? String(m.age) : '', phone: m.phone || '', avatar: m.avatar || '' });
    setEditing(true);
  };

  const saveEdit = async () => {
    if (!selected || !form.name.trim()) return;
    const updatedMember: FamilyMember = {
      ...selected, name: form.name.trim(), age: form.age ? Number(form.age) : undefined,
      phone: form.phone.trim() || undefined, avatar: form.avatar || undefined,
    };
    const updated = members.map(m => m.id === selected.id ? updatedMember : m);
    try {
      await db.saveFamilyMembers(updated);
      setMembers(updated);
      setSelected(updatedMember);
      setEditing(false);
    } catch {
      alert('No se pudo guardar. Intenta de nuevo — si sigue fallando, avísale a Sheila.');
    }
  };

  const removeMember = async (id: string) => {
    const updated = members.filter(m => m.id !== id);
    setMembers(updated);
    await db.saveFamilyMembers(updated);
    setSelected(null);
    setEditing(false);
  };

  const removeGroup = async (group: FamilyGroup) => {
    const groupMembers = membersByGroup.get(group.label) || [];
    const msg = groupMembers.length > 0
      ? `Esto eliminará "${group.label}" y a sus ${groupMembers.length} integrante${groupMembers.length !== 1 ? 's' : ''}. ¿Continuar?`
      : `¿Eliminar "${group.label}"?`;
    if (!confirm(msg)) return;
    const updatedGroups = groups.filter(g => g.id !== group.id);
    const updatedMembers = members.filter(m => m.groupLabel !== group.label);
    setGroups(updatedGroups);
    setMembers(updatedMembers);
    db.saveFamilyGroups(updatedGroups);
    await db.saveFamilyMembers(updatedMembers);
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
          <p className="text-sm text-slate-500">{groups.length} {groups.length === 1 ? 'familia' : 'familias'} · {members.length} en la lista</p>
        </div>
        <button onClick={() => { setNewGroupLabel(''); setShowAddGroup(!showAddGroup); }} className="flex items-center gap-1 bg-brand-600 text-white text-xs font-medium px-3 py-2 rounded-lg">
          <Plus size={14} /> Agregar familia
        </button>
      </header>

      {showAddGroup && (
        <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-sm space-y-2">
          <p className="text-xs text-slate-500">Nombre de la familia (los dos apellidos)</p>
          <input
            value={newGroupLabel}
            onChange={e => setNewGroupLabel(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addGroup()}
            placeholder="Ej: Familia Lorenzo Moncion"
            autoFocus
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-300"
          />
          <div className="flex gap-2">
            <button onClick={addGroup} className="flex-1 bg-brand-600 text-white py-2 rounded-lg text-sm font-medium">Crear familia</button>
            <button onClick={() => setShowAddGroup(false)} className="px-4 py-2 text-sm text-slate-500">Cancelar</button>
          </div>
        </div>
      )}

      {groups.length === 0 && !showAddGroup && (
        <p className="text-center text-sm text-slate-400 py-10">Agrega la primera familia arriba (ej: "Familia Lorenzo Moncion")</p>
      )}

      {groups.map(group => {
        const groupMembers = membersByGroup.get(group.label) || [];
        return (
          <section key={group.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-3.5">
            <div className="flex items-center justify-between mb-2.5">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1.5"><Users size={12} /> {group.label}</h2>
              <button onClick={() => removeGroup(group)} className="text-slate-300 hover:text-rose-500 transition">
                <Trash2 size={14} />
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {groupMembers.map(m => (
                <button key={m.id} onClick={() => setSelected(m)} className="flex flex-col items-center gap-1 w-20">
                  <Avatar member={m} />
                  <span className="text-[10px] text-slate-600 text-center leading-tight line-clamp-2">{m.name}</span>
                </button>
              ))}
              <button
                onClick={() => { setAddingToGroup(group); setForm(emptyForm); }}
                className="flex flex-col items-center justify-center gap-1 w-20 h-24 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 hover:border-brand-300 hover:text-brand-500 transition"
              >
                <UserPlus size={20} />
                <span className="text-[10px] font-medium">Agregar</span>
              </button>
            </div>
          </section>
        );
      })}

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

      {addingToGroup && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4" onClick={() => setAddingToGroup(null)}>
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-2" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-1">
              <p className="text-base font-bold text-slate-800">Agregar a {addingToGroup.label}</p>
              <button onClick={() => setAddingToGroup(null)} className="text-slate-400"><X size={18} /></button>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-16 h-20 rounded-2xl bg-white border border-slate-200 flex items-center justify-center overflow-hidden shrink-0">
                {form.avatar ? <img src={form.avatar} className="w-full h-full object-contain" /> : <span className="text-brand-600 text-lg font-bold">{form.name ? initials(form.name) : '?'}</span>}
              </div>
              <PhotoUploader onUpload={async a => { const small = await resizeImage(a, 600); setForm(f => ({ ...f, avatar: small })); }} label="Subir avatar" />
            </div>
            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Nombre y apellido" autoFocus className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-300" />
            <div className="grid grid-cols-2 gap-2">
              <input value={form.age} onChange={e => setForm(f => ({ ...f, age: e.target.value }))} type="number" placeholder="Edad" className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-300" />
              <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="Teléfono" className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-300" />
            </div>
            <div className="flex gap-2 pt-1">
              <button onClick={addMember} className="flex-1 bg-brand-600 text-white py-2 rounded-lg text-sm font-medium">Guardar</button>
              <button onClick={() => setAddingToGroup(null)} className="px-4 py-2 text-sm text-slate-500">Cancelar</button>
            </div>
          </div>
        </div>
      )}

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
              <div className="w-16 h-20 rounded-2xl bg-white border border-slate-200 flex items-center justify-center overflow-hidden shrink-0">
                {form.avatar ? <img src={form.avatar} className="w-full h-full object-contain" /> : <span className="text-brand-600 text-lg font-bold">{form.name ? initials(form.name) : '?'}</span>}
              </div>
              <PhotoUploader onUpload={async a => { const small = await resizeImage(a, 600); setForm(f => ({ ...f, avatar: small })); }} label="Cambiar avatar" />
            </div>
            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Nombre y apellido" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-300" />
            <div className="grid grid-cols-2 gap-2">
              <input value={form.age} onChange={e => setForm(f => ({ ...f, age: e.target.value }))} type="number" placeholder="Edad" className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-300" />
              <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="Teléfono" className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-300" />
            </div>
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
