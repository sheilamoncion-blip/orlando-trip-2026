import { useRef } from 'react';
import { Camera } from 'lucide-react';

export default function PhotoUploader({ onUpload, label = 'Subir foto' }: { onUpload: (dataUrl: string, filename: string) => void; label?: string }) {
  const input = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onUpload(reader.result as string, file.name);
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <>
      <button onClick={() => input.current?.click()} className="flex items-center gap-1.5 text-xs font-medium text-sky-600 hover:underline">
        <Camera size={14} /> {label}
      </button>
      <input ref={input} type="file" accept="image/*" onChange={handleChange} className="hidden" />
    </>
  );
}
