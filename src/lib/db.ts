import type { Comment, PhotoBoardItem, FamilyMember, ActivityUpdate } from '../types';

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}

function save(key: string, data: unknown) {
  localStorage.setItem(key, JSON.stringify(data));
}

export interface TikTokStatus {
  filmed: boolean;
  edited: boolean;
  posted: boolean;
}

export interface MyMealStatus {
  tried: boolean;
  rating?: number; // 1-5
}

export interface Reservation {
  id: string;
  name: string;
  description: string;
  who: string[];
  dateTime: string;
}

export const db = {
  // Done state for attractions/meals/characters (keyed by item id)
  isDone: (itemId: string): boolean => load<Record<string, boolean>>('otp_done', {})[itemId] || false,
  setDone: (itemId: string, done: boolean) => {
    const all = load<Record<string, boolean>>('otp_done', {});
    all[itemId] = done;
    save('otp_done', all);
  },
  getAllDone: (): Record<string, boolean> => load('otp_done', {}),

  // Personal notes per item
  getNote: (itemId: string): string => load<Record<string, string>>('otp_notes', {})[itemId] || '',
  setNote: (itemId: string, note: string) => {
    const all = load<Record<string, string>>('otp_notes', {});
    all[itemId] = note;
    save('otp_notes', all);
  },

  // Who will eat/drink this (Epcot challenge) — itemId -> family member name
  getAssignee: (itemId: string): string => load<Record<string, string>>('otp_assignee', {})[itemId] || '',
  setAssignee: (itemId: string, name: string) => {
    const all = load<Record<string, string>>('otp_assignee', {});
    all[itemId] = name;
    save('otp_assignee', all);
  },

  // Comments per thread (threadId = item id)
  getComments: (threadId: string): Comment[] => load<Comment[]>('otp_comments', []).filter(c => c.threadId === threadId),
  addComment: (threadId: string, author: string, text: string, emoji?: string) => {
    const all = load<Comment[]>('otp_comments', []);
    const comment: Comment = { id: crypto.randomUUID(), threadId, author, text, emoji, createdAt: new Date().toISOString() };
    all.push(comment);
    save('otp_comments', all);
    return comment;
  },
  deleteComment: (id: string) => {
    const all = load<Comment[]>('otp_comments', []).filter(c => c.id !== id);
    save('otp_comments', all);
  },

  // TikTok production status
  getTikTokStatus: (id: string): TikTokStatus => load<Record<string, TikTokStatus>>('otp_tiktok', {})[id] || { filmed: false, edited: false, posted: false },
  setTikTokStatus: (id: string, status: TikTokStatus) => {
    const all = load<Record<string, TikTokStatus>>('otp_tiktok', {});
    all[id] = status;
    save('otp_tiktok', all);
  },

  // Family members — grouped by family unit, with avatar/age/phone
  getFamilyMembers: (): FamilyMember[] => load('otp_family_members', []),
  saveFamilyMembers: (members: FamilyMember[]) => save('otp_family_members', members),

  // Simple name list — used by assignee dropdowns (Epcot challenge, TikTok/Instagram ideas)
  getFamily: (): string[] => {
    const members = load<FamilyMember[]>('otp_family_members', []);
    if (members.length > 0) return members.map(m => m.name);
    return load('otp_family', ['Sheila', 'Carlos Manuel']);
  },

  // Photo inspiration board
  getPhotoBoard: (): PhotoBoardItem[] => load('otp_photoboard', []),
  savePhotoBoard: (items: PhotoBoardItem[]) => save('otp_photoboard', items),

  // Personalization shop orders
  isOrdered: (itemId: string): boolean => load<Record<string, boolean>>('otp_ordered', {})[itemId] || false,
  setOrdered: (itemId: string, ordered: boolean) => {
    const all = load<Record<string, boolean>>('otp_ordered', {});
    all[itemId] = ordered;
    save('otp_ordered', all);
  },

  // Manual weather override (per day) when no API key configured
  getManualWeather: (date: string): { tempC: number; condition: string } | null => load<Record<string, any>>('otp_weather_manual', {})[date] || null,
  setManualWeather: (date: string, tempC: number, condition: string) => {
    const all = load<Record<string, any>>('otp_weather_manual', {});
    all[date] = { tempC, condition };
    save('otp_weather_manual', all);
  },

  // Manual wait-time overrides (attractionId -> minutes) — used if live API unavailable
  getManualWait: (attractionId: string): number | null => load<Record<string, number>>('otp_wait_manual', {})[attractionId] ?? null,
  setManualWait: (attractionId: string, minutes: number) => {
    const all = load<Record<string, number>>('otp_wait_manual', {});
    all[attractionId] = minutes;
    save('otp_wait_manual', all);
  },

  // Reservations / reminders — nombre, descripción, quiénes, hora
  getReservations: (): Reservation[] => load('otp_reservations', []),
  saveReservations: (list: Reservation[]) => save('otp_reservations', list),

  // Alarms already fired (so we don't beep every check interval)
  getFiredAlarms: (): string[] => load('otp_fired_alarms', []),
  markAlarmFired: (id: string) => {
    const all = load<string[]>('otp_fired_alarms', []);
    if (!all.includes(id)) { all.push(id); save('otp_fired_alarms', all); }
  },

  // Planificación de horario por atracción: primer clic en un chip de hora = "planeado",
  // segundo clic en el mismo chip = "confirmado" (ya lo hicimos a esa hora)
  getPlannedTime: (itemId: string): string | null => load<Record<string, string>>('otp_planned_time', {})[itemId] || null,
  setPlannedTime: (itemId: string, time: string | null) => {
    const all = load<Record<string, string>>('otp_planned_time', {});
    if (time) all[itemId] = time; else delete all[itemId];
    save('otp_planned_time', all);
  },
  getConfirmedTime: (itemId: string): string | null => load<Record<string, string>>('otp_confirmed_time', {})[itemId] || null,
  setConfirmedTime: (itemId: string, time: string | null) => {
    const all = load<Record<string, string>>('otp_confirmed_time', {});
    if (time) all[itemId] = time; else delete all[itemId];
    save('otp_confirmed_time', all);
  },

  // Family photos attached to a specific attraction/meal/character/show (itemId -> dataUrls[])
  getItemPhotos: (itemId: string): string[] => load<Record<string, string[]>>('otp_item_photos', {})[itemId] || [],
  addItemPhoto: (itemId: string, dataUrl: string) => {
    const all = load<Record<string, string[]>>('otp_item_photos', {});
    all[itemId] = [...(all[itemId] || []), dataUrl];
    save('otp_item_photos', all);
  },
  removeItemPhoto: (itemId: string, index: number) => {
    const all = load<Record<string, string[]>>('otp_item_photos', {});
    all[itemId] = (all[itemId] || []).filter((_, i) => i !== index);
    save('otp_item_photos', all);
  },

  // Uploaded park map images (parkId -> dataUrl)
  getParkMap: (parkId: string): string | null => load<Record<string, string>>('otp_park_maps', {})[parkId] || null,
  setParkMap: (parkId: string, dataUrl: string) => {
    const all = load<Record<string, string>>('otp_park_maps', {});
    all[parkId] = dataUrl;
    save('otp_park_maps', all);
  },

  // Group status text (since live GPS sharing needs a backend — see README)
  getGroupStatus: (): { name: string; status: string; updatedAt: string }[] => load('otp_group_status', []),
  setGroupStatus: (name: string, status: string) => {
    const all = load<{ name: string; status: string; updatedAt: string }[]>('otp_group_status', []);
    const idx = all.findIndex(g => g.name === name);
    const entry = { name, status, updatedAt: new Date().toISOString() };
    if (idx >= 0) all[idx] = entry; else all.push(entry);
    save('otp_group_status', all);
  },

  // "Quién soy yo" — nombre del familiar usando este dispositivo (Ajustes)
  getMe: (): string => load('otp_me', ''),
  setMe: (name: string) => save('otp_me', name),

  // Interés en visitar un restaurante/venue (venueKey -> nombres de familiares)
  getVisitInterest: (venueKey: string): string[] => load<Record<string, string[]>>('otp_visit_interest', {})[venueKey] || [],
  toggleVisitInterest: (venueKey: string, name: string) => {
    const all = load<Record<string, string[]>>('otp_visit_interest', {});
    const list = all[venueKey] || [];
    all[venueKey] = list.includes(name) ? list.filter(n => n !== name) : [...list, name];
    save('otp_visit_interest', all);
    return all[venueKey];
  },

  // Si lo probé + mi calificación personal, por plato (itemId -> { tried, rating })
  getMyMealStatus: (itemId: string): MyMealStatus => load<Record<string, MyMealStatus>>('otp_my_meal_status', {})[itemId] || { tried: false },
  setMyMealStatus: (itemId: string, status: MyMealStatus) => {
    const all = load<Record<string, MyMealStatus>>('otp_my_meal_status', {});
    all[itemId] = status;
    save('otp_my_meal_status', all);
  },

  // Feed de actividad ("Sheila comió Butterbeer en Diagon Alley y le dio 4/5")
  getUpdates: (): ActivityUpdate[] => load<ActivityUpdate[]>('otp_updates', []),
  addUpdate: (who: string, text: string, rating?: number, emoji?: string) => {
    const all = load<ActivityUpdate[]>('otp_updates', []);
    const update: ActivityUpdate = { id: crypto.randomUUID(), who, text, rating, emoji, createdAt: new Date().toISOString() };
    all.unshift(update);
    save('otp_updates', all.slice(0, 100));
    return update;
  },
};
