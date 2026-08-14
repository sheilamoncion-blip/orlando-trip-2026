import { useState } from 'react';
import { Trash2, X } from 'lucide-react';
import PhotoUploader from './PhotoUploader';
import { db } from '../lib/db';
import { resizeImage } from '../lib/imageUtils';

export default function ItemPhotos({ itemId }: { itemId: string }) {
  const [photos, setPhotos] = useState<string[]>(() => db.getItemPhotos(itemId));
  const [zoomed, setZoomed] = useState<string | null>(null);

  const upload = async (dataUrl: string) => {
    try {
      const resized = await resizeImage(dataUrl);
      db.addItemPhoto(itemId, resized);
      setPhotos(db.getItemPhotos(itemId));
    } catch {
      alert('No se pudo guardar la foto — el navegador se quedó sin espacio de almacenamiento. Intenta borrar alguna foto vieja y vuelve a intentar.');
    }
  };

  const remove = (index: number) => {
    db.removeItemPhoto(itemId, index);
    setPhotos(db.getItemPhotos(itemId));
  };

  return (
    <div className="mt-2">
      {photos.length > 0 && (
        <div className="flex gap-1.5 overflow-x-auto pb-1 mb-1.5">
          {photos.map((src, i) => (
            <div key={i} className="relative shrink-0 group">
              <button type="button" onClick={() => setZoomed(src)}>
                <img src={src} className="w-14 h-14 object-cover rounded-lg border border-slate-200" />
              </button>
              <button onClick={() => remove(i)} className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition text-rose-500 shadow">
                <Trash2 size={10} />
              </button>
            </div>
          ))}
        </div>
      )}
      <PhotoUploader onUpload={upload} label="Subir foto" />

      {zoomed && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-auto" onClick={() => setZoomed(null)}>
          <button onClick={() => setZoomed(null)} className="fixed top-4 right-4 bg-white/90 rounded-full p-2 z-10">
            <X size={20} />
          </button>
          <img src={zoomed} alt="" className="max-w-full max-h-full object-contain" style={{ touchAction: 'pinch-zoom' }} />
        </div>
      )}
    </div>
  );
}
