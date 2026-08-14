import { db } from './db';

// Devuelve el nombre guardado en Ajustes; si no hay ninguno, pregunta una vez y lo guarda.
export function ensureMe(): string {
  let me = db.getMe();
  if (me) return me;
  const family = db.getFamily();
  const name = window.prompt(`¿Quién eres? (Escribe tu nombre tal como aparece en Familia)\n\n${family.join(', ')}`, family[0] || '');
  if (name && name.trim()) {
    me = name.trim();
    db.setMe(me);
  }
  return me;
}
