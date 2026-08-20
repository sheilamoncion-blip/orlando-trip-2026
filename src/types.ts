export type ParkId = 'universal' | 'islands' | 'epic' | 'magic-kingdom' | 'epcot';

export interface TripDay {
  date: string; // yyyy-MM-dd
  label: string;
  park: ParkId | null;
  isFreeDay: boolean;
  freeDayPlan?: string;
  birthday?: 'carlos' | 'sheila';
  estimatedHours?: number;
}

export interface AddOn {
  label: string;
  price: number;
}

export interface HourlyWait {
  time: string; // "8:00 AM"
  minMin: number;
  maxMin: number;
  note?: string;
}

export interface OutfitOption {
  label: string;
  impact: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  cost: string;
  description: string;
}

export interface Attraction {
  id: string;
  park: ParkId;
  area?: string; // e.g. "Minion Land", "Diagon Alley"
  day: string; // yyyy-MM-dd
  name: string;
  durationMin: number;
  typicalWaitMin: number;
  heightMinIn: number | null;
  intensity: 1 | 2 | 3 | 4 | 5;
  photoTip: string;
  referenceLinks: string[];
  nearbyCharacters: string[];
  hourlyWait?: HourlyWait[];
  bestTime?: string;
  guide?: string; // extra long-form notes (queue experience, tips, FAQ) that don't need their own UI widget
}

export interface Meal {
  id: string;
  park: ParkId;
  area?: string;
  day: string;
  venue?: string; // restaurante/QSR/booth/carrito — si falta, se usa `name` como venue (item = venue)
  name: string;
  priceRange: string;
  tasteRating: number;
  photogenicRating: number;
  typicalWaitMin: number;
  recommended: string[];
  addOns: AddOn[];
  photoTip?: string;
  dietary?: string;
  guide?: string;
}

export interface ShowItem {
  id: string;
  park: ParkId;
  day: string | null;
  name: string;
  times: string[];
  durationMin: number;
  location: string;
  mustSee: boolean;
  indoor: boolean;
}

export interface CharacterMeet {
  id: string;
  park: ParkId;
  area?: string;
  name: string;
  appearanceTimes: string[];
  freebies: string[];
  bestTime: string;
  photoTip: string;
  referenceLinks: string[];
  outfitOptions?: OutfitOption[];
  guide?: string;
}

export interface AreaGuide {
  id: string;
  park: ParkId;
  name: string;
  emoji: string;
  bestFor: string;
  walkFrom?: string;
  guide: string; // long-form: checklist, FAQ, timing strategy, stats — rendered as formatted text
}

export interface CountryItem {
  id: string;
  name: string;
  price: number;
  taste: number;
  photogenic: number;
  description: string;
}

export interface Country {
  id: string;
  name: string;
  flag: string;
  foods: CountryItem[];
  drinks: CountryItem[];
  bestTime?: string;
  crowdLevel?: string; // e.g. "Alto — de los kioscos más populares del festival"
  photoTip?: string;
  entertainment?: string;
  guide?: string;
}

export interface ContentIdea {
  id: string;
  platform: 'tiktok' | 'reel';
  title: string;
  song: string; // canción/audio
  description: string;
  referenceUrl?: string; // link a un video de referencia (de otra cuenta, para inspirarse)
  tips?: string;
  bestTime: string; // mejor momento del día/parque para grabarlo
  tags: string[]; // ej: Comida, Vestuario, Personajes — libres, se pueden agregar más
  status: { filmed: boolean; edited: boolean; posted: boolean };
  createdAt: string;
}

export interface InstagramPost {
  id: string;
  link: string; // URL al post/reel real de Instagram
  photo?: string; // foto de referencia (dataUrl)
  who: string[]; // familiares etiquetados/que salen en el post
  location?: string; // texto libre, ej: "Frente al castillo"
  park?: ParkId | 'any';
  uploadedBy?: string;
  createdAt: string;
}

export interface PersonalizationItem {
  id: string;
  park: ParkId;
  name: string;
  priceRange: string;
  customizable: string;
  orderTime: string;
  location: string;
  birthdayPick?: 'carlos' | 'sheila';
}

export interface BirthdayPerson {
  id: 'carlos' | 'sheila';
  name: string;
  age: number;
  date: string;
  park: ParkId;
  perks: string[];
  mainGift: string;
  altGifts: string[];
}

export interface Comment {
  id: string;
  threadId: string;
  author: string;
  text: string;
  emoji?: string;
  createdAt: string;
}

export interface PhotoBoardItem {
  id: string;
  type: 'reference' | 'ours'; // 'reference' = foto real de Pinterest subida; 'ours' = foto de la familia
  park: ParkId | 'any';
  dataUrl: string;
  filename?: string;
  whereToStand?: string;
  bestTime?: string;
  note?: string;
  uploadedBy?: string;
  createdAt: string;
}

export interface FamilyGroup {
  id: string;
  label: string; // ej: "Familia Lorenzo Moncion"
}

export interface FamilyMember {
  id: string;
  name: string;
  age?: number;
  phone?: string;
  avatar?: string; // dataUrl
  groupLabel: string; // e.g. "Mamá y yo", "Mi prima con su esposo e hijas"
}

export interface VisitedPark {
  parkId: ParkId;
  date: string;
  dayLabel: string;
}

export interface ActivityUpdate {
  id: string;
  who: string;
  text: string; // e.g. "comió Butterbeer en Diagon Alley"
  rating?: number; // 1-5, opcional
  emoji?: string;
  createdAt: string;
}

export const PARK_LABELS: Record<ParkId, string> = {
  universal: 'Universal Studios',
  islands: 'Islands of Adventure',
  epic: 'Epic Universe',
  'magic-kingdom': 'Magic Kingdom',
  epcot: 'Epcot',
};

export const PARK_COLORS: Record<ParkId, string> = {
  universal: '#5B4B8A',
  islands: '#2E7D6B',
  epic: '#C0392B',
  'magic-kingdom': '#1E5FA8',
  epcot: '#8E44AD',
};
