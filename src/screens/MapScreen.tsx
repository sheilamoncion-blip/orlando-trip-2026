import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPin, ChevronDown, Image as ImageIcon, X, ZoomIn } from 'lucide-react';
import { PARK_LABELS, PARK_COLORS, type ParkId } from '../types';
import PhotoUploader from '../components/PhotoUploader';
import { db } from '../lib/db';
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

const PARKS_ORDER: ParkId[] = ['universal', 'islands', 'epic', 'magic-kingdom', 'epcot'];

type MapFilter = 'all' | 'parks' | 'restrooms' | 'restaurants';

const FILTERS: { key: MapFilter; label: string }[] = [
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

type Tab = 'interactivo' | 'parques';

export default function MapScreen() {
  const [tab, setTab] = useState<Tab>('interactivo');
  const [filter, setFilter] = useState<MapFilter>('all');

  return (
    <div className="pb-24 max-w-lg mx-auto flex flex-col h-full">
      <div className="p-4 pb-2">
        <h1 className="text-xl font-extrabold text-slate-800 flex items-center gap-2"><MapPin size={20} /> Mapas</h1>
      </div>

      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mx-4">
        <button onClick={() => setTab('interactivo')} className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${tab === 'interactivo' ? 'bg-white text-brand-700 shadow-sm' : 'text-slate-500'}`}>Mapa interactivo</button>
        <button onClick={() => setTab('parques')} className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${tab === 'parques' ? 'bg-white text-brand-700 shadow-sm' : 'text-slate-500'}`}>Mapas de Parques</button>
      </div>

      {tab === 'interactivo' && (
        <>
          <p className="text-xs text-slate-500 mt-2 px-4">Mapa libre (OpenStreetMap) — sin necesidad de cuenta de Google Cloud</p>
          <div className="flex gap-1.5 px-4 pb-2 pt-2 overflow-x-auto">
            {FILTERS.map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition ${filter === f.key ? 'bg-brand-600 text-white border-brand-600' : 'bg-white border-slate-200 text-slate-600'}`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex-1 mx-4 rounded-xl overflow-hidden border border-slate-200 shadow-sm" style={{ minHeight: '55vh' }}>
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
        </>
      )}

      {tab === 'parques' && (
        <div className="px-4 pt-2 space-y-2.5">
          <p className="text-xs text-slate-500">Mapas oficiales de cada parque. Si falta alguno, súbelo (mejor si pesa poco — fotos muy grandes pueden fallar).</p>
          {PARKS_ORDER.map(parkId => <ParkMapCard key={parkId} parkId={parkId} />)}
        </div>
      )}
    </div>
  );
}

function ParkMapCard({ parkId }: { parkId: ParkId }) {
  const staticSrc = `/maps/${parkId}.jpg`;
  const [open, setOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [staticOk, setStaticOk] = useState(true);
  const [mapUrl, setMapUrl] = useState<string | null>(() => db.getParkMap(parkId));

  const hasMap = staticOk || !!mapUrl;
  const activeSrc = staticOk ? staticSrc : mapUrl;

  const upload = (dataUrl: string) => {
    try {
      db.setParkMap(parkId, dataUrl);
      setMapUrl(dataUrl);
      setOpen(true);
    } catch {
      alert('Esa imagen es demasiado pesada para subirla desde la app. Pídele a Sheila que la coloque directo en el proyecto (public/maps/).');
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-3 p-3.5 text-left">
        <div className="w-3 h-10 rounded-full shrink-0" style={{ backgroundColor: PARK_COLORS[parkId] }} />
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-800">Mapa de {PARK_LABELS[parkId]}</p>
          <p className="text-xs text-slate-500 mt-0.5">{hasMap ? 'Toca para ver' : 'Sin foto todavía'}</p>
        </div>
        {!hasMap && <ImageIcon size={16} className="text-slate-300 shrink-0" />}
        <ChevronDown size={16} className={`text-slate-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-3.5 pb-3.5">
          {activeSrc && (
            <button onClick={() => setZoomed(true)} className="relative block w-full group">
              <img
                src={activeSrc}
                alt={`Mapa de ${PARK_LABELS[parkId]}`}
                className="w-full rounded-lg border border-slate-100 mb-2"
                onError={() => setStaticOk(false)}
              />
              <span className="absolute bottom-4 right-2 bg-black/60 text-white rounded-full p-1.5 flex items-center gap-1 text-[10px]">
                <ZoomIn size={12} /> Toca para ampliar
              </span>
            </button>
          )}
          <PhotoUploader onUpload={upload} label={hasMap ? 'Actualizar mapa' : 'Subir mapa'} />
        </div>
      )}

      {zoomed && activeSrc && (
        <div className="fixed inset-0 bg-black z-50 overflow-auto" onClick={() => setZoomed(false)}>
          <button onClick={() => setZoomed(false)} className="fixed top-4 right-4 bg-white/90 rounded-full p-2 z-10">
            <X size={20} />
          </button>
          <img
            src={activeSrc}
            alt={`Mapa de ${PARK_LABELS[parkId]} ampliado`}
            className="min-w-full min-h-full w-auto h-auto"
            style={{ touchAction: 'pinch-zoom' }}
          />
        </div>
      )}
    </div>
  );
}
