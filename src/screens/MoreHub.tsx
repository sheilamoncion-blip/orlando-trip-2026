import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users2, Drama, Music2, Camera, Image, Gift, Cake, Users, Settings, MapPin } from 'lucide-react';
import { BIRTHDAYS, VISITED_PARKS } from '../data/trip';
import { PARK_LABELS, PARK_COLORS } from '../types';

const LINKS = [
  { to: '/personajes', icon: Users2, label: 'Personajes & Fotos', desc: 'Dónde encontrarlos, freebies y tips de foto' },
  { to: '/shows', icon: Drama, label: 'Shows por Área', desc: 'Horarios y ubicación de todos los shows' },
  { to: '/tiktok', icon: Music2, label: 'Ideas para TikTok', desc: 'Videos sugeridos, audio y checklist' },
  { to: '/instagram', icon: Camera, label: 'Ideas para Instagram', desc: 'Reels, carruseles y stories sugeridos' },
  { to: '/fotos', icon: Image, label: 'Tablero de Inspiración', desc: 'Fotos de Pinterest + nuestras fotos' },
  { to: '/tienda', icon: Gift, label: 'Personalización Disney', desc: 'Grabados y recuerdos por parque' },
  { to: '/familia', icon: Users, label: 'Familia', desc: 'Quién viene, notas y ajustes' },
];

type Tab = 'parques' | 'explorar';

export default function MoreHub() {
  const [tab, setTab] = useState<Tab>('explorar');

  return (
    <div className="p-4 pb-24 max-w-lg mx-auto space-y-4">
      <header className="pt-2">
        <h1 className="text-xl font-extrabold text-slate-800">Más</h1>
      </header>

      <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
        <button onClick={() => setTab('explorar')} className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${tab === 'explorar' ? 'bg-white text-brand-700 shadow-sm' : 'text-slate-500'}`}>Explorar</button>
        <button onClick={() => setTab('parques')} className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${tab === 'parques' ? 'bg-white text-brand-700 shadow-sm' : 'text-slate-500'}`}>Parques que visitaremos</button>
      </div>

      {tab === 'parques' && (
        <div className="space-y-2.5">
          {VISITED_PARKS.map(vp => (
            <Link
              key={vp.parkId}
              to={`/itinerario/${vp.date}`}
              className="flex items-center gap-3 bg-white rounded-xl border border-slate-200 p-3.5 shadow-sm hover:border-brand-300 transition"
            >
              <div className="w-3 h-10 rounded-full shrink-0" style={{ backgroundColor: PARK_COLORS[vp.parkId] }} />
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-slate-400" />
                  <p className="text-sm font-semibold text-slate-800">{PARK_LABELS[vp.parkId]}</p>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{vp.date} · {vp.dayLabel}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {tab === 'explorar' && (
        <>
          <div className="grid grid-cols-2 gap-2.5">
            {BIRTHDAYS.map(b => (
              <Link key={b.id} to={`/cumpleanos/${b.id}`} className="col-span-2 bg-gradient-to-r from-amber-50 to-pink-50 border border-amber-200 rounded-xl p-3 flex items-center gap-2.5">
                <Cake size={20} className="text-amber-500 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-slate-800">{b.name} cumple {b.age}</p>
                  <p className="text-xs text-slate-500">{b.date} — ver perks especiales</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="space-y-2">
            {LINKS.map(l => (
              <Link key={l.to} to={l.to} className="flex items-center gap-3 bg-white rounded-xl border border-slate-200 p-3.5 shadow-sm hover:border-brand-300 transition">
                <div className="bg-brand-50 rounded-lg p-2 shrink-0"><l.icon size={18} className="text-brand-600" /></div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{l.label}</p>
                  <p className="text-xs text-slate-500">{l.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          <Link to="/ajustes" className="flex items-center gap-2 justify-center text-xs text-slate-400 pt-2">
            <Settings size={13} /> Ajustes y datos
          </Link>
        </>
      )}
    </div>
  );
}
