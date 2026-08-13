import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import PhotoUploader from './PhotoUploader';
import { db } from '../lib/db';

export default function ItemPhotos({ itemId }: { itemId: string }) {
  const [photos, setPhotos] = useState<string[]>(() => db.getItemPhotos(itemId));

  const upload = (dataUrl: string) => {
    db.addItemPhoto(itemId, dataUrl);
    setPhotos(db.getItemPhotos(itemId));
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
              <img src={src} className="w-14 h-14 object-cover rounded-lg border border-slate-200" />
              <button onClick={() => remove(i)} className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition text-rose-500 shadow">
                <Trash2 size={10} />
              </button>
            </div>
          ))}
        </div>
      )}
      <PhotoUploader onUpload={upload} label="Subir foto" />
    </div>
  );
}
