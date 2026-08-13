import { Star, Camera } from 'lucide-react';

export function TasteStars({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" title={`Sabor: ${value}/5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={12} className={i < value ? 'fill-amber-400 text-amber-400' : 'text-gray-300'} />
      ))}
    </span>
  );
}

export function PhotogenicRating({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" title={`Fotogénico: ${value}/5`}>
      {Array.from({ length: value }).map((_, i) => (
        <Camera key={i} size={12} className="text-brand-500" />
      ))}
    </span>
  );
}

export function IntensityDots({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" title={`Intensidad: ${value}/5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`w-1.5 h-1.5 rounded-full ${i < value ? 'bg-rose-500' : 'bg-gray-200'}`} />
      ))}
    </span>
  );
}
