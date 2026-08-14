import { useState } from 'react';
import { MapPin, ChevronDown, Image as ImageIcon, X, ZoomIn } from 'lucide-react';
import { PARK_LABELS, PARK_COLORS, type ParkId } from '../types';
import PhotoUploader from '../components/PhotoUploader';
import { db } from '../lib/db';

const PARKS_ORDER: ParkId[] = ['universal', 'islands', 'epic', 'magic-kingdom', 'epcot'];

export default function MapScreen() {
  return (
    <div className="pb-24 max-w-lg mx-auto flex flex-col h-full">
      <div className="p-4 pb-2">
        <h1 className="text-xl font-extrabold text-slate-800 flex items-center gap-2"><MapPin size={20} /> Mapas</h1>
      </div>

      <div className="px-4 pt-2 space-y-2.5">
        <p className="text-xs text-slate-500">Mapas oficiales de cada parque. Si falta alguno, súbelo (mejor si pesa poco — fotos muy grandes pueden fallar).</p>
        {PARKS_ORDER.map(parkId => <ParkMapCard key={parkId} parkId={parkId} />)}
      </div>
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
