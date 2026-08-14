import { db } from './db';

type Resolver = (name: string) => void;
let pendingResolvers: Resolver[] = [];
let listeners: (() => void)[] = [];

export function onMeModalRequest(cb: () => void) {
  listeners.push(cb);
  return () => { listeners = listeners.filter(l => l !== cb); };
}

export function hasPendingMeRequest() {
  return pendingResolvers.length > 0;
}

export function resolveMeModal(name: string) {
  if (name && name.trim()) db.setMe(name.trim());
  const resolvers = pendingResolvers;
  pendingResolvers = [];
  resolvers.forEach(r => r(name.trim()));
}

/** Devuelve el nombre guardado; si no hay ninguno, abre el modal "¿Quién eres?" y espera. */
export function ensureMe(): Promise<string> {
  const me = db.getMe();
  if (me) return Promise.resolve(me);
  return new Promise(resolve => {
    pendingResolvers.push(resolve);
    listeners.forEach(l => l());
  });
}
