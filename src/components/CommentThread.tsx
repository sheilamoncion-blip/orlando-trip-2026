import { useState } from 'react';
import { MessageCircle, Send, Trash2 } from 'lucide-react';
import { db } from '../lib/db';
import type { Comment } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

const QUICK_EMOJI = ['❤️', '😂', '🎉', '👍', '😍'];

export default function CommentThread({ threadId }: { threadId: string }) {
  const [comments, setComments] = useState<Comment[]>(() => db.getComments(threadId));
  const [text, setText] = useState('');
  const [author, setAuthor] = useState(() => localStorage.getItem('otp_me') || '');
  const [open, setOpen] = useState(false);

  const send = (emoji?: string) => {
    if (!text.trim() && !emoji) return;
    const who = author.trim() || 'Familia';
    localStorage.setItem('otp_me', who);
    db.addComment(threadId, who, text.trim(), emoji);
    setComments(db.getComments(threadId));
    setText('');
  };

  const remove = (id: string) => {
    db.deleteComment(id);
    setComments(db.getComments(threadId));
  };

  return (
    <div className="mt-2">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700">
        <MessageCircle size={13} /> {comments.length > 0 ? `${comments.length} comentario${comments.length !== 1 ? 's' : ''}` : 'Comentar'}
      </button>
      {open && (
        <div className="mt-2 space-y-2">
          {comments.map(c => (
            <div key={c.id} className="bg-slate-50 rounded-lg px-3 py-2 text-xs group relative">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="font-semibold text-slate-700">{c.author}</span>
                <span className="text-slate-400">{formatDistanceToNow(new Date(c.createdAt), { addSuffix: true, locale: es })}</span>
              </div>
              <p className="text-slate-600">{c.emoji ? `${c.emoji} ` : ''}{c.text}</p>
              <button onClick={() => remove(c.id)} className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-500">
                <Trash2 size={11} />
              </button>
            </div>
          ))}
          <div className="flex gap-1">
            {QUICK_EMOJI.map(e => (
              <button key={e} onClick={() => send(e)} className="text-sm hover:scale-125 transition">{e}</button>
            ))}
          </div>
          <div className="flex gap-1.5">
            <input
              value={author}
              onChange={e => setAuthor(e.target.value)}
              placeholder="Tu nombre"
              className="w-20 shrink-0 border border-slate-200 rounded-lg px-2 py-1.5 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-sky-400"
            />
            <input
              value={text}
              onChange={e => setText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Escribe un comentario..."
              className="flex-1 border border-slate-200 rounded-lg px-3 py-1.5 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-sky-400"
            />
            <button onClick={() => send()} className="bg-sky-600 text-white p-1.5 rounded-lg hover:opacity-90"><Send size={13} /></button>
          </div>
        </div>
      )}
    </div>
  );
}
