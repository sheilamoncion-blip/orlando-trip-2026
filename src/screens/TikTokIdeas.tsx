import BackButton from '../components/BackButton';
import ContentIdeaBoard from '../components/ContentIdeaBoard';
import { Music2 } from 'lucide-react';

export default function TikTokIdeas() {
  return (
    <div className="p-4 pb-24 max-w-lg mx-auto space-y-3">
      <BackButton fallback="/mas" label="Más" />
      <header>
        <h1 className="text-xl font-extrabold text-slate-800 flex items-center gap-2"><Music2 size={20} /> Ideas para TikTok</h1>
        <p className="text-sm text-slate-500">Agrega ideas para que cualquiera las tome y las grabe</p>
      </header>

      <ContentIdeaBoard platform="tiktok" />
    </div>
  );
}
