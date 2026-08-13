import type { Comment, PhotoBoardItem } from '../types';

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

  // Family roster
  getFamily: (): string[] => load('otp_family', ['Sheila', 'Carlos Manuel']),
  saveFamily: (names: string[]) => save('otp_family', names),

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

  // Group status text (since live GPS sharing needs a backend — see README)
  getGroupStatus: (): { name: string; status: string; updatedAt: string }[] => load('otp_group_status', []),
  setGroupStatus: (name: string, status: string) => {
    const all = load<{ name: string; status: string; updatedAt: string }[]>('otp_group_status', []);
    const idx = all.findIndex(g => g.name === name);
    const entry = { name, status, updatedAt: new Date().toISOString() };
    if (idx >= 0) all[idx] = entry; else all.push(entry);
    save('otp_group_status', all);
  },
};
