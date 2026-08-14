// Magic Kingdom — Aug 27, 2026
// Alturas y nombres confirmados con búsquedas actualizadas a 2026 (Tiana's Bayou Adventure
// reemplazó Splash Mountain; Big Thunder ahora 38"; TRON Lightcycle/Run ya operando).
import type { Attraction, Meal, CharacterMeet, AreaGuide, HourlyWait } from '../types';

const DAY = '2026-08-27';

function hw(entries: [string, number, number, string?][]): HourlyWait[] {
  return entries.map(([time, minMin, maxMin, note]) => ({ time, minMin, maxMin, note }));
}

// ───────────────────────── ADVENTURELAND ─────────────────────────

export const ADVENTURELAND_ATTRACTIONS: Attraction[] = [
  {
    id: 'mk-jungle-cruise', park: 'magic-kingdom', area: 'Adventureland', day: DAY,
    name: 'Jungle Cruise', durationMin: 10, typicalWaitMin: 35, heightMinIn: null, intensity: 1,
    photoTip: 'El bote y los animatrónicos son buen fondo — pide asiento adelante para mejor vista.',
    referenceLinks: [], nearbyCharacters: [],
    bestTime: '9:00-10:00 AM o después de 8 PM',
    hourlyWait: hw([['9:00 AM', 15, 25], ['12:00 PM', 35, 55], ['3:00 PM', 40, 60, 'Pico de calor'], ['6:00 PM', 25, 40], ['9:00 PM', 15, 25]]),
    guide: 'El "skipper" hace comentarios chistosos en vivo — cada recorrido es un poco distinto. Clásico imprescindible.',
  },
  {
    id: 'mk-pirates-caribbean', park: 'magic-kingdom', area: 'Adventureland', day: DAY,
    name: 'Pirates of the Caribbean', durationMin: 9, typicalWaitMin: 25, heightMinIn: null, intensity: 1,
    photoTip: 'La caída de agua al inicio — cámara lista para la salpicada (leve).', referenceLinks: [], nearbyCharacters: [],
    bestTime: 'Cualquier hora — la fila se mueve rápido gracias a la capacidad alta del bote',
    hourlyWait: hw([['10:00 AM', 15, 25], ['1:00 PM', 25, 40], ['5:00 PM', 20, 35]]),
    guide: 'Dark ride clásico en bote, apto para todas las edades, sin altura mínima.',
  },
];

export const ADVENTURELAND_MEALS: Meal[] = [
  {
    id: 'mk-skipper-canteen', park: 'magic-kingdom', area: 'Adventureland', day: DAY,
    name: 'Skipper Canteen (Cantina del capitán)', priceRange: '$18-26', tasteRating: 4, photogenicRating: 4, typicalWaitMin: 15,
    recommended: ['Pao de Queijo (menú secreto — pregunta por él)', 'Falls Family Falafel'], addOns: [],
    photoTip: 'Ambiente de exploradores años 30 — buen fondo temático.', dietary: 'Opciones vegetarianas disponibles',
    guide: 'Table service asequible, temática divertida con "chistes de skipper" en el menú.',
  },
  {
    id: 'mk-aloha-isle', park: 'magic-kingdom', area: 'Adventureland', day: DAY,
    name: 'Aloha Isle — Dole Whip (Remolino de piña helado)', priceRange: '$6-9', tasteRating: 5, photogenicRating: 4, typicalWaitMin: 15,
    recommended: ['Dole Whip clásico (piña)', 'Dole Whip float'], addOns: [{ label: 'Float (con jugo de piña)', price: 2 }],
    photoTip: 'El swirl amarillo brillante contra el cielo — clásico infaltable de Magic Kingdom.',
    dietary: 'Vegano',
  },
];

export const ADVENTURELAND_AREA_GUIDE: AreaGuide = {
  id: 'area-adventureland', park: 'magic-kingdom', name: 'Adventureland', emoji: '🌴',
  bestFor: 'Todas las edades — sin restricciones de altura', walkFrom: 'A la izquierda de Main Street, cruzando el castillo',
  guide: `Adventureland no tiene atracciones con altura mínima — ideal si el grupo tiene rango de edades amplio. El Dole Whip de Aloha Isle es parada obligatoria.
TIP: Jungle Cruise y Pirates se pueden hacer temprano (9-10 AM) antes de que suba el calor de Florida.`,
};

// ───────────────────────── FRONTIERLAND ─────────────────────────

export const FRONTIERLAND_ATTRACTIONS: Attraction[] = [
  {
    id: 'mk-big-thunder', park: 'magic-kingdom', area: 'Frontierland', day: DAY,
    name: 'Big Thunder Mountain Railroad', durationMin: 4, typicalWaitMin: 40, heightMinIn: 38, intensity: 3,
    photoTip: 'La montaña temática del "pueblo minero embrujado" es buen fondo — mejor luz en la mañana.',
    referenceLinks: [], nearbyCharacters: [],
    bestTime: '9:00-9:30 AM (rope drop) o después de 8 PM',
    hourlyWait: hw([['9:00 AM', 15, 30], ['11:00 AM', 40, 65], ['1:00 PM', 55, 85, 'Pico'], ['4:00 PM', 35, 55], ['8:00 PM', 20, 35]]),
    guide: 'Reabrió en mayo 2026 con nueva secuencia "Rainbow Caverns" y altura mínima reducida a 38". Familiar, sin inversiones.',
  },
  {
    id: 'mk-tiana-bayou', park: 'magic-kingdom', area: 'Frontierland', day: DAY,
    name: 'Tiana\'s Bayou Adventure', durationMin: 11, typicalWaitMin: 55, heightMinIn: 40, intensity: 3,
    photoTip: 'La caída final moja — guarda el teléfono antes, foto en el monitor de salida.',
    referenceLinks: [], nearbyCharacters: ['Princess Tiana'],
    bestTime: '9:00 AM (rope drop) — la fila crece muy rápido',
    hourlyWait: hw([['9:00 AM', 25, 45], ['11:00 AM', 55, 90], ['1:00 PM', 75, 120, 'Pico'], ['4:00 PM', 50, 80], ['7:00 PM', 30, 50]]),
    guide: 'Reemplazó a Splash Mountain — tema de "La Princesa y el Sapo". Te mojas en la caída final, considera un poncho si hace fresco.',
  },
];

export const FRONTIERLAND_MEALS: Meal[] = [
  {
    id: 'mk-pecos-bill', park: 'magic-kingdom', area: 'Frontierland', day: DAY,
    name: 'Pecos Bill Tall Tale Inn (La posada de cuentos de Pecos Bill)', priceRange: '$12-16', tasteRating: 3, photogenicRating: 3, typicalWaitMin: 10,
    recommended: ['Nachos con carne', 'Burrito bowl'], addOns: [], photoTip: 'Barra de toppings ilimitados — arma tu plato antes de la foto.',
  },
];

export const FRONTIERLAND_AREA_GUIDE: AreaGuide = {
  id: 'area-frontierland', park: 'magic-kingdom', name: 'Frontierland', emoji: '🤠',
  bestFor: 'Fans de montañas rusas familiares', walkFrom: 'Al oeste del castillo',
  guide: `Dos coasters familiares (Big Thunder y Tiana's Bayou). Rope drop (llegar 9 AM) es clave para ambas — la fila de Tiana's sube muy rápido después de las 10 AM.`,
};

// ───────────────────────── LIBERTY SQUARE ─────────────────────────

export const LIBERTYSQUARE_ATTRACTIONS: Attraction[] = [
  {
    id: 'mk-haunted-mansion', park: 'magic-kingdom', area: 'Liberty Square', day: DAY,
    name: 'Haunted Mansion', durationMin: 9, typicalWaitMin: 35, heightMinIn: null, intensity: 2,
    photoTip: 'La fachada de la mansión embrujada es de las más fotografiadas del parque — mejor con niebla de la mañana.',
    referenceLinks: [], nearbyCharacters: [],
    bestTime: '9:00-10:00 AM o después de 8 PM',
    hourlyWait: hw([['9:00 AM', 15, 25], ['12:00 PM', 35, 55], ['3:00 PM', 40, 60, 'Pico'], ['7:00 PM', 20, 35]]),
    guide: 'Dark ride clásico, atmosférico pero no da miedo real — apto para casi toda la familia. Sin altura mínima.',
  },
];

export const LIBERTYSQUARE_MEALS: Meal[] = [
  {
    id: 'mk-columbia-harbour', park: 'magic-kingdom', area: 'Liberty Square', day: DAY,
    name: 'Columbia Harbour House (Casa portuaria Columbia)', priceRange: '$13-17', tasteRating: 4, photogenicRating: 3, typicalWaitMin: 15,
    recommended: ['Fish & chips', 'Lobster roll (temporada)'], addOns: [], photoTip: 'Piso superior con ambiente de posada marinera — mesas junto a la ventana.',
  },
];

export const LIBERTYSQUARE_AREA_GUIDE: AreaGuide = {
  id: 'area-liberty-square', park: 'magic-kingdom', name: 'Liberty Square', emoji: '🕯️',
  bestFor: 'Todas las edades, ambiente histórico/atmosférico', walkFrom: 'Entre Frontierland y Fantasyland',
  guide: `Área pequeña pero icónica — Haunted Mansion es el imprescindible. Buen lugar para una pausa tranquila entre Frontierland y Fantasyland.`,
};

// ───────────────────────── FANTASYLAND ─────────────────────────

export const FANTASYLAND_ATTRACTIONS: Attraction[] = [
  {
    id: 'mk-seven-dwarfs', park: 'magic-kingdom', area: 'Fantasyland', day: DAY,
    name: 'Seven Dwarfs Mine Train', durationMin: 3, typicalWaitMin: 60, heightMinIn: 38, intensity: 3,
    photoTip: 'Los vagones se mecen al ritmo de "Heigh-Ho" — buen video con audio.', referenceLinks: [], nearbyCharacters: [],
    bestTime: '9:00 AM (rope drop) — la más popular del parque, fila crece rapidísimo',
    hourlyWait: hw([['9:00 AM', 30, 55], ['11:00 AM', 60, 95], ['1:00 PM', 80, 120, 'Pico — la más larga de Magic Kingdom'], ['4:00 PM', 55, 85], ['8:00 PM', 30, 50]]),
    guide: 'La atracción más solicitada de Fantasyland — considera Lightning Lane si el presupuesto alcanza, o hazla primero al abrir.',
  },
  {
    id: 'mk-peter-pan', park: 'magic-kingdom', area: 'Fantasyland', day: DAY,
    name: 'Peter Pan\'s Flight', durationMin: 3, typicalWaitMin: 55, heightMinIn: null, intensity: 1,
    photoTip: 'Vista nocturna de Londres desde el barco volador — muy fotogénica dentro de la atracción (foto interior no siempre posible, disfrútala).',
    referenceLinks: [], nearbyCharacters: ['Peter Pan'],
    bestTime: '9:00-9:30 AM',
    hourlyWait: hw([['9:00 AM', 25, 45], ['12:00 PM', 55, 85], ['3:00 PM', 60, 90, 'Pico']]),
    guide: 'Clásico familiar sin altura mínima pero con fila sorprendentemente larga todo el día — ir temprano.',
  },
  {
    id: 'mk-small-world', park: 'magic-kingdom', area: 'Fantasyland', day: DAY,
    name: "It's a Small World", durationMin: 11, typicalWaitMin: 20, heightMinIn: null, intensity: 1,
    photoTip: 'Los animatrónicos coloridos de cada país — foto panorámica desde el bote.', referenceLinks: [], nearbyCharacters: [],
    bestTime: 'Cualquier hora — capacidad alta, fila rara vez larga',
    hourlyWait: hw([['11:00 AM', 10, 20], ['2:00 PM', 15, 25], ['6:00 PM', 10, 20]]),
    guide: 'Buen descanso con aire acondicionado en pleno calor de agosto.',
  },
];

export const FANTASYLAND_MEALS: Meal[] = [
  {
    id: 'mk-be-our-guest', park: 'magic-kingdom', area: 'Fantasyland', day: DAY,
    name: 'Be Our Guest (Sé nuestro invitado)', priceRange: '$20-35', tasteRating: 4, photogenicRating: 5, typicalWaitMin: 20,
    recommended: ['Filete de res', 'Sopa de cebolla francesa'], addOns: [],
    photoTip: 'El salón del castillo de la Bestia (West Wing con la rosa encantada) es la foto — pide sentarte ahí.',
    guide: 'Ambientado en el castillo de la Bestia — reserva con anticipación si es posible.',
  },
];

export const FANTASYLAND_CHARACTERS: CharacterMeet[] = [
  {
    id: 'mk-princesses-char', park: 'magic-kingdom', area: 'Fantasyland', name: 'Princesas Disney (Cinderella\'s Royal Table area)',
    appearanceTimes: ['10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM'],
    freebies: ['Autógrafo', 'Foto PhotoPass', 'Conversación en personaje'],
    bestTime: '10:00 AM (fila más corta)', photoTip: 'Pide la pose de reverencia clásica.',
    referenceLinks: [],
    outfitOptions: [{ label: 'Orejas o accesorio de princesa', impact: 8, cost: '$25-40', description: 'Buena reacción del personaje' }],
  },
];

export const FANTASYLAND_AREA_GUIDE: AreaGuide = {
  id: 'area-fantasyland', park: 'magic-kingdom', name: 'Fantasyland', emoji: '🏰',
  bestFor: 'Toda la familia — el corazón clásico de Magic Kingdom', walkFrom: 'Detrás del castillo de Cenicienta',
  guide: `La land más concurrida del parque. Seven Dwarfs Mine Train es la prioridad #1 del día — hacerla en el rope drop (9 AM) o aceptar filas de 60-120 min.
CHECKLIST: ☐ Seven Dwarfs (temprano) ☐ Peter Pan's Flight ☐ It's a Small World (descanso fresco) ☐ Comida en Be Our Guest si hay reserva`,
};

// ───────────────────────── TOMORROWLAND ─────────────────────────

export const TOMORROWLAND_ATTRACTIONS: Attraction[] = [
  {
    id: 'mk-space-mountain', park: 'magic-kingdom', area: 'Tomorrowland', day: DAY,
    name: 'Space Mountain', durationMin: 3, typicalWaitMin: 55, heightMinIn: 44, intensity: 4,
    photoTip: 'La fachada blanca futurista de noche con luces — icónica.', referenceLinks: [], nearbyCharacters: [],
    bestTime: '9:00 AM (rope drop) o después de 9 PM',
    hourlyWait: hw([['9:00 AM', 25, 45], ['11:00 AM', 55, 85], ['1:00 PM', 70, 110, 'Pico'], ['4:00 PM', 50, 75], ['9:00 PM', 25, 45]]),
    guide: 'Montaña rusa clásica en completa oscuridad — rápida y sin caídas grandes, sorprende por la oscuridad más que por la velocidad.',
  },
  {
    id: 'mk-tron', park: 'magic-kingdom', area: 'Tomorrowland', day: DAY,
    name: 'TRON Lightcycle / Run', durationMin: 2, typicalWaitMin: 65, heightMinIn: 48, intensity: 5,
    photoTip: 'Las motos de luz iluminadas de noche son la foto más espectacular de Tomorrowland.',
    referenceLinks: [], nearbyCharacters: [],
    bestTime: '9:00 AM (rope drop) — imprescindible ir directo al abrir',
    hourlyWait: hw([['9:00 AM', 30, 55], ['11:00 AM', 65, 100], ['1:00 PM', 85, 130, 'Pico — la más intensa del parque'], ['4:00 PM', 60, 95], ['9:00 PM', 30, 50]]),
    guide: 'La montaña rusa más rápida e intensa de Magic Kingdom — considera Lightning Lane o virtual queue si está disponible. Postura sentado tipo moto, poco espacio para objetos sueltos.',
  },
  {
    id: 'mk-peoplemover', park: 'magic-kingdom', area: 'Tomorrowland', day: DAY,
    name: 'Tomorrowland Transit Authority PeopleMover', durationMin: 10, typicalWaitMin: 10, heightMinIn: null, intensity: 1,
    photoTip: 'Recorrido panorámico de Tomorrowland desde arriba — buen descanso con aire fresco.',
    referenceLinks: [], nearbyCharacters: [],
    bestTime: 'Cualquier hora, ideal para descansar del calor',
    hourlyWait: hw([['12:00 PM', 5, 15], ['4:00 PM', 5, 15]]),
    guide: 'Subestimado — buena forma de ver TRON y Space Mountain desde arriba sin hacer fila para montarlos.',
  },
];

export const TOMORROWLAND_MEALS: Meal[] = [
  {
    id: 'mk-cosmic-rays', park: 'magic-kingdom', area: 'Tomorrowland', day: DAY,
    name: "Cosmic Ray's Starlight Café (Café bajo las estrellas de Cosmic Ray)", priceRange: '$12-16', tasteRating: 3, photogenicRating: 3, typicalWaitMin: 15,
    recommended: ['Rotisserie chicken', 'Combo de hamburguesa'], addOns: [], photoTip: 'Show del robot Sonny Eclipse mientras comes.',
  },
];

export const TOMORROWLAND_AREA_GUIDE: AreaGuide = {
  id: 'area-tomorrowland', park: 'magic-kingdom', name: 'Tomorrowland', emoji: '🚀',
  bestFor: 'Buscadores de emociones, mejor de noche con las luces', walkFrom: 'A la derecha del castillo',
  guide: `Tiene las 2 montañas rusas más intensas de Magic Kingdom (Space Mountain y TRON). Rope drop aquí es crítico — TRON en particular puede llegar a 130 min de espera al mediodía.
CHECKLIST: ☐ TRON (rope drop) ☐ Space Mountain ☐ PeopleMover (descanso) ☐ Monsters Inc. Laugh Floor (show, ver Shows)`,
};

// ───────────────────────── SHOWS / FUEGOS ─────────────────────────

export const MAGIC_KINGDOM_MEETING_SPOTS: CharacterMeet[] = [
  {
    id: 'mk-cinderella-castle-meet', park: 'magic-kingdom', area: 'Castillo de Cenicienta', name: 'Punto de encuentro — Castillo de Cenicienta',
    appearanceTimes: ['Todo el día'], freebies: ['Foto panorámica del castillo'],
    bestTime: 'Antes del show nocturno para asegurar buen lugar', photoTip: 'De día para foto clara del castillo, de noche para el show de proyecciones.',
    referenceLinks: [],
  },
];

// ───────────────────────── EXPORT: ALL COMBINED ─────────────────────────

export const MAGIC_KINGDOM_ATTRACTIONS: Attraction[] = [
  ...ADVENTURELAND_ATTRACTIONS, ...FRONTIERLAND_ATTRACTIONS, ...LIBERTYSQUARE_ATTRACTIONS,
  ...FANTASYLAND_ATTRACTIONS, ...TOMORROWLAND_ATTRACTIONS,
];

export const MAGIC_KINGDOM_MEALS: Meal[] = [
  ...ADVENTURELAND_MEALS, ...FRONTIERLAND_MEALS, ...LIBERTYSQUARE_MEALS, ...FANTASYLAND_MEALS, ...TOMORROWLAND_MEALS,
];

export const MAGIC_KINGDOM_CHARACTERS: CharacterMeet[] = [...FANTASYLAND_CHARACTERS, ...MAGIC_KINGDOM_MEETING_SPOTS];

export const MAGIC_KINGDOM_AREA_GUIDES: AreaGuide[] = [
  ADVENTURELAND_AREA_GUIDE, FRONTIERLAND_AREA_GUIDE, LIBERTYSQUARE_AREA_GUIDE, FANTASYLAND_AREA_GUIDE, TOMORROWLAND_AREA_GUIDE,
];
