import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPin } from 'lucide-react';
import { PARK_LABELS, PARK_COLORS, type ParkId } from '../types';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Approximate park centers (public knowledge, no API key needed)
const PARK_COORDS: Record<ParkId, [number, number]> = {
  universal: [28.4743, -81.4677],
  islands: [28.4712, -81.4699],
  epic: [28.4508, -81.4407],
  'magic-kingdom': [28.4177, -81.5812],
  epcot: [28.3747, -81.5494],
};

type Filter = 'all' | 'parks' | 'restrooms' | 'restaurants';

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'Todo' },
  { key: 'parks', label: 'Parques' },
  { key: 'restaurants', label: 'Restaurantes' },
  { key: 'restrooms', label: 'Baños' },
];

const parkIcon = (color: string) => L.divIcon({
  className: '',
  html: `<div style="background:${color};width:16px;height:16px;border-radius:50%;border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.3)"></div>`,
  iconSize: [16, 16],
});

export default function MapScreen() {
  const [filter, setFilter] = useState<Filter>('all');

  return (
    <div className="pb-24 max-w-lg mx-auto flex flex-col h-full">
      <div className="p-4 pb-2">
        <h1 className="text-xl font-extrabold text-slate-800 flex items-center gap-2"><MapPin size={20} /> Mapa</h1>
        <p className="text-xs text-slate-500 mt-0.5">Mapa libre (OpenStreetMap) — sin necesidad de cuenta de Google Cloud</p>
      </div>

      <div className="flex gap-1.5 px-4 pb-2 overflow-x-auto">
        {FILTERS.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition ${filter === f.key ? 'bg-sky-600 text-white border-sky-600' : 'bg-white border-slate-200 text-slate-600'}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex-1 mx-4 rounded-xl overflow-hidden border border-slate-200 shadow-sm" style={{ minHeight: '60vh' }}>
        <MapContainer center={[28.42, -81.52]} zoom={11} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {(filter === 'all' || filter === 'parks') && (Object.entries(PARK_COORDS) as [ParkId, [number, number]][]).map(([park, coords]) => (
            <Marker key={park} position={coords} icon={parkIcon(PARK_COLORS[park])}>
              <Popup>
                <strong>{PARK_LABELS[park]}</strong>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <p className="text-[11px] text-slate-400 px-4 pt-2">
        Nota: ubicación en vivo de los 20 familiares y pines de "fila aumentó aquí" requieren un backend
        compartido (Supabase) para sincronizar entre dispositivos — ver Familia → Fase 2 en el README.
      </p>
    </div>
  );
}
