// Epic Universe — Aug 25, 2026 (Sheila's 37th birthday)
// Parque nuevo (abrió mayo 2025) — patrones de espera estimados con base en el comportamiento
// típico de parques nuevos de Universal (demanda muy alta los primeros 1-2 años, sube fuerte
// después de las 10 AM). Alturas oficiales confirmadas.
import type { Attraction, Meal, CharacterMeet, AreaGuide, HourlyWait } from '../types';

const DAY = '2026-08-25';

function hw(entries: [string, number, number, string?][]): HourlyWait[] {
  return entries.map(([time, minMin, maxMin, note]) => ({ time, minMin, maxMin, note }));
}

// ───────────────────────── CELESTIAL PARK (hub central) ─────────────────────────

export const CELESTIAL_ATTRACTIONS: Attraction[] = [
  {
    id: 'epic-stardust-racers', park: 'epic', area: 'Celestial Park', day: DAY,
    name: 'Stardust Racers', durationMin: 3, typicalWaitMin: 90, heightMinIn: 48, intensity: 5,
    photoTip: 'Las dos montañas rusas gemelas (roja y azul) se ven espectaculares desde el puente de Celestial Park al atardecer.',
    referenceLinks: [], nearbyCharacters: [],
    bestTime: '9:00-9:30 AM (apertura) o última hora antes del cierre',
    hourlyWait: hw([['9:00 AM', 30, 60, 'Aún alto — parque nuevo, mucha demanda'], ['11:00 AM', 90, 130], ['1:00 PM', 110, 160, 'Pico'], ['3:00 PM', 90, 130], ['6:00 PM', 60, 90], ['9:00 PM', 40, 70]]),
    guide: 'La montaña rusa dual más nueva de Universal — carreras lado a lado entre dos trenes. Espera considerar el single-rider si está disponible, reduce mucho el tiempo.',
  },
  {
    id: 'epic-constellation-carousel', park: 'epic', area: 'Celestial Park', day: DAY,
    name: 'Constellation Carousel', durationMin: 3, typicalWaitMin: 20, heightMinIn: null, intensity: 1,
    photoTip: 'Carrusel de noche con luces — foto espectacular después de las 7 PM.',
    referenceLinks: [], nearbyCharacters: [],
    bestTime: 'Cualquier hora — atracción de baja demanda relativa',
    hourlyWait: hw([['10:00 AM', 10, 20], ['1:00 PM', 20, 35], ['6:00 PM', 15, 25]]),
    guide: 'Carrusel temático familiar, buena opción de descanso entre atracciones intensas.',
  },
];

export const CELESTIAL_MEALS: Meal[] = [
  {
    id: 'epic-atlantic', park: 'epic', area: 'Celestial Park', day: DAY,
    name: 'Atlantic (fine dining)', priceRange: '$35-60', tasteRating: 5, photogenicRating: 5, typicalWaitMin: 0,
    recommended: ['Surf and turf', 'vista al acuario victoriano de Celestial Park'], addOns: [{ label: 'Copa de champagne', price: 14 }],
    photoTip: 'El interior estilo acuario victoriano es la foto — pide mesa cerca de la ventana.',
    dietary: 'Requiere reserva con anticipación', guide: 'Ideal para una celebración de cumpleaños — el restaurante insignia del parque.',
  },
  {
    id: 'epic-pizza-moon', park: 'epic', area: 'Celestial Park', day: DAY,
    name: 'Pizza Moon', priceRange: '$14-20', tasteRating: 4, photogenicRating: 4, typicalWaitMin: 15,
    recommended: ['Pizza clásica', 'decoración de teatro de juguete victoriano'], addOns: [],
    photoTip: 'El interior temático de teatro de juguete es único — foto del ambiente completo.',
  },
];

export const CELESTIAL_AREA_GUIDE: AreaGuide = {
  id: 'area-celestial-park', park: 'epic', name: 'Celestial Park', emoji: '🌌',
  bestFor: 'Hub central del parque — punto de encuentro natural', walkFrom: 'Conecta con las 4 lands temáticas',
  guide: `Celestial Park es el hub central de Epic Universe, conecta a las otras 4 lands. Aquí está Stardust Racers (la atracción headline del parque) y el restaurante insignia Atlantic — ideal para la cena de cumpleaños de Sheila.
TIP: Al ser un parque nuevo (2025), la demanda es más alta que en parques establecidos — reserva Virtual Line / Universal Express si está disponible para Stardust Racers.`,
};

// ───────────────────────── SUPER NINTENDO WORLD ─────────────────────────

export const NINTENDO_ATTRACTIONS: Attraction[] = [
  {
    id: 'epic-mario-kart', park: 'epic', area: 'Super Nintendo World', day: DAY,
    name: 'Mario Kart: Bowser\'s Challenge', durationMin: 5, typicalWaitMin: 60, heightMinIn: 40, intensity: 3,
    photoTip: 'Los lentes de realidad aumentada crean una experiencia única — pide que te fotografíen con el visor puesto antes de entrar.',
    referenceLinks: ['https://www.pinterest.com/search/pins/?q=super%20nintendo%20world%20epic%20universe'], nearbyCharacters: ['Mario', 'Luigi', 'Princess Peach'],
    bestTime: '9:00-9:30 AM (apertura)',
    hourlyWait: hw([['9:00 AM', 25, 45], ['11:00 AM', 60, 90], ['1:00 PM', 80, 120, 'Pico'], ['3:00 PM', 60, 90], ['6:00 PM', 40, 65]]),
    guide: 'Dark ride interactivo con lentes AR — compite tirando caparazones y recogiendo monedas. Puntaje visible al final, se puede repetir para superar la marca.',
  },
  {
    id: 'epic-mine-cart-madness', park: 'epic', area: 'Super Nintendo World', day: DAY,
    name: 'Mine-Cart Madness (Donkey Kong)', durationMin: 3, typicalWaitMin: 45, heightMinIn: 40, intensity: 4,
    photoTip: 'Entrada temática a la mina — buen video de POV en el descenso.', referenceLinks: [], nearbyCharacters: ['Donkey Kong'],
    bestTime: '9:30-10:00 AM',
    hourlyWait: hw([['9:30 AM', 20, 35], ['12:00 PM', 55, 85], ['2:00 PM', 65, 100, 'Pico'], ['5:00 PM', 40, 60]]),
    guide: 'Montaña rusa familiar con giros bruscos temáticos de la mina de Donkey Kong.',
  },
];

export const NINTENDO_MEALS: Meal[] = [
  {
    id: 'epic-toadstool-cafe', park: 'epic', area: 'Super Nintendo World', day: DAY,
    name: 'Toadstool Café', priceRange: '$14-20', tasteRating: 4, photogenicRating: 5, typicalWaitMin: 20,
    recommended: ['Hamburguesa temática de hongo', 'Pasta Toad'], addOns: [{ label: 'Bebida Power-Up (souvenir)', price: 7 }],
    photoTip: 'El plato con forma de hongo es MUY fotogénico — flat-lay desde arriba.', dietary: 'Contiene gluten y lácteos',
  },
];

export const NINTENDO_CHARACTERS: CharacterMeet[] = [
  {
    id: 'epic-mario-luigi-char', park: 'epic', area: 'Super Nintendo World', name: 'Mario & Luigi',
    appearanceTimes: ['10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM'],
    freebies: ['Foto con gorra roja/verde', 'Pose de salto icónica'],
    bestTime: '10:00 AM (menos fila al abrir Nintendo World)',
    photoTip: 'Pide la pose de salto — es la más icónica de Mario.',
    referenceLinks: [],
    outfitOptions: [
      { label: 'Camisa roja + overol azul (Mario)', impact: 9, cost: '$0-20', description: 'Reacción extra especial del personaje' },
      { label: 'Camisa verde (Luigi)', impact: 8, cost: '$0-15', description: 'Buen balance' },
    ],
  },
];

export const NINTENDO_AREA_GUIDE: AreaGuide = {
  id: 'area-super-nintendo-world', park: 'epic', name: 'Super Nintendo World', emoji: '🍄',
  bestFor: 'Familias y fans de videojuegos — muy fotogénico', walkFrom: 'Conecta con Celestial Park',
  guide: `Land más colorida y fotogénica del parque. Los "Power-Up Bands" (pulseras interactivas, se compran aparte) activan efectos especiales en cada zona — vale la pena si el presupuesto alcanza.
ESTRATEGIA: llegar a la apertura (9 AM), Mario Kart primero (fila crece rapidísimo después de las 10 AM), luego Mine-Cart Madness, almorzar en Toadstool Café, fotos con Mario/Luigi a las 10-11 AM.`,
};

// ───────────────────────── ISLE OF BERK (HOW TO TRAIN YOUR DRAGON) ─────────────────────────

export const BERK_ATTRACTIONS: Attraction[] = [
  {
    id: 'epic-hiccup-gliders', park: 'epic', area: 'Isle of Berk', day: DAY,
    name: 'Hiccup\'s Wing Gliders', durationMin: 3, typicalWaitMin: 40, heightMinIn: 40, intensity: 3,
    photoTip: 'Vuela sobre Isle of Berk — foto desde el muelle antes de subir, con los dragones de fondo.',
    referenceLinks: [], nearbyCharacters: [],
    bestTime: '9:00-10:00 AM',
    hourlyWait: hw([['9:00 AM', 15, 30], ['11:00 AM', 40, 65], ['1:00 PM', 55, 85, 'Pico'], ['4:00 PM', 35, 55], ['7:00 PM', 20, 35]]),
    guide: 'Coaster suspendido familiar, sensación de vuelo suave — parecido a un "flying" coaster clásico pero más accesible.',
  },
  {
    id: 'epic-dragon-racers-rally', park: 'epic', area: 'Isle of Berk', day: DAY,
    name: 'Dragon Racer\'s Rally', durationMin: 3, typicalWaitMin: 55, heightMinIn: 48, intensity: 4,
    photoTip: 'La aceleración inicial da buena cara de susto — cámara lista.', referenceLinks: [], nearbyCharacters: [],
    bestTime: '9:00-9:30 AM',
    hourlyWait: hw([['9:00 AM', 25, 40], ['11:00 AM', 55, 85], ['1:00 PM', 70, 100, 'Pico'], ['5:00 PM', 40, 65]]),
    guide: 'La montaña rusa más intensa de Isle of Berk — altura mínima 48".',
  },
];

export const BERK_MEALS: Meal[] = [
  {
    id: 'epic-mead-hall', park: 'epic', area: 'Isle of Berk', day: DAY,
    name: 'Mead Hall', priceRange: '$18-28', tasteRating: 4, photogenicRating: 4, typicalWaitMin: 20,
    recommended: ['Costillas ahumadas', 'Pollo asado estilo vikingo'], addOns: [{ label: 'Cuerno de miel fermentada (souvenir)', price: 9 }],
    photoTip: 'El salón temático vikingo con mesas largas de madera es la foto de ambiente.', dietary: 'Contiene gluten',
    guide: 'Buena opción de grupo grande — mesas comunales estilo salón vikingo.',
  },
];

export const BERK_AREA_GUIDE: AreaGuide = {
  id: 'area-isle-of-berk', park: 'epic', name: 'Isle of Berk', emoji: '🐉',
  bestFor: 'Fans de How to Train Your Dragon, familias con niños mayores', walkFrom: 'Conecta con Celestial Park',
  guide: `Land ambientada en la isla vikinga de la película. Dos atracciones principales (Wing Gliders más suave, Dragon Racer's Rally más intensa). Mead Hall es ideal para almuerzo de grupo grande — mesas comunales.`,
};

// ───────────────────────── MINISTRY OF MAGIC (HARRY POTTER) ─────────────────────────

export const MINISTRY_ATTRACTIONS: Attraction[] = [
  {
    id: 'epic-battle-ministry', park: 'epic', area: 'Ministry of Magic', day: DAY,
    name: 'Harry Potter and the Battle at the Ministry', durationMin: 6, typicalWaitMin: 60, heightMinIn: 40, intensity: 3,
    photoTip: 'El atrio del Ministerio de Magia (con las chimeneas de Floo) es el mejor fondo del parque — llega antes de que se llene de gente.',
    referenceLinks: ['https://www.pinterest.com/search/pins/?q=ministry%20of%20magic%20epic%20universe'], nearbyCharacters: [],
    bestTime: '9:00-9:30 AM (apertura) o después de 7 PM',
    hourlyWait: hw([['9:00 AM', 30, 50], ['11:00 AM', 60, 95], ['1:00 PM', 80, 120, 'Pico'], ['4:00 PM', 55, 85], ['7:00 PM', 30, 55]]),
    guide: 'La atracción más nueva de Harry Potter — combina dark ride con proyecciones 360° en el atrio del Ministerio. Sin inversiones fuertes, apto para toda la familia.',
  },
];

export const MINISTRY_MEALS: Meal[] = [
  {
    id: 'epic-le-gobelet-noir', park: 'epic', area: 'Ministry of Magic', day: DAY,
    name: 'Le Gobelet Noir', priceRange: '$16-24', tasteRating: 4, photogenicRating: 4, typicalWaitMin: 15,
    recommended: ['Platos de inspiración francesa/mágica'], addOns: [],
    photoTip: 'Ambiente elegante estilo café parisino mágico.',
  },
  {
    id: 'epic-bieraubeurre', park: 'epic', area: 'Ministry of Magic', day: DAY,
    name: 'French Butterbeer (carrito Bièraubeurre)', priceRange: '$7-11', tasteRating: 5, photogenicRating: 5, typicalWaitMin: 5,
    recommended: ['Frozen en agosto', 'versión francesa del clásico Butterbeer'], addOns: [{ label: 'Vaso souvenir', price: 4 }],
    photoTip: 'Espuma cremosa de cerca, con las puertas del Ministerio de fondo.',
  },
];

export const MINISTRY_AREA_GUIDE: AreaGuide = {
  id: 'area-ministry-of-magic', park: 'epic', name: 'Ministry of Magic', emoji: '⚡',
  bestFor: 'El otro momento mágico de Harry Potter del viaje (después de Diagon Alley el día 23)', walkFrom: 'Conecta con Celestial Park',
  guide: `La zona mágica más nueva — el Ministerio de Magia con chimeneas Floo activas. Menos "shopping" que Diagon Alley, más enfocada en la atracción y la ambientación del atrio.
TIP: Compara con Diagon Alley (día 23) — a la familia le gusta mencionar cuál prefirió.`,
};

// ───────────────────────── DARK UNIVERSE ─────────────────────────

export const DARKUNIVERSE_ATTRACTIONS: Attraction[] = [
  {
    id: 'epic-monsters-unchained', park: 'epic', area: 'Dark Universe', day: DAY,
    name: 'Monsters Unchained: The Frankenstein Experiment', durationMin: 5, typicalWaitMin: 55, heightMinIn: 48, intensity: 4,
    photoTip: 'Zona con niebla y luces verdes — muy fotogénica, mejor de noche.', referenceLinks: [], nearbyCharacters: [],
    bestTime: '9:00-9:30 AM o después de 7 PM',
    hourlyWait: hw([['9:00 AM', 25, 45], ['12:00 PM', 60, 95], ['2:00 PM', 70, 110, 'Pico'], ['5:00 PM', 45, 70], ['8:00 PM', 25, 45]]),
    guide: 'Dark ride de terror clásico (no apta para quienes se asustan fácil) — altura mínima 48".',
  },
  {
    id: 'epic-curse-werewolf', park: 'epic', area: 'Dark Universe', day: DAY,
    name: 'Curse of the Werewolf', durationMin: 4, typicalWaitMin: 30, heightMinIn: null, intensity: 4,
    photoTip: 'Zona con niebla y luces rojas — muy fotogénica de noche.', referenceLinks: [], nearbyCharacters: [],
    bestTime: 'Después de 6 PM (mejor ambiente nocturno)',
    hourlyWait: hw([['10:00 AM', 15, 30], ['1:00 PM', 30, 50], ['6:00 PM', 20, 35]]),
    guide: 'Experiencia temática de terror, menor intensidad física que Monsters Unchained.',
  },
];

export const DARKUNIVERSE_MEALS: Meal[] = [
  {
    id: 'epic-das-stakehaus', park: 'epic', area: 'Dark Universe', day: DAY,
    name: 'Das Stakehaus', priceRange: '$16-24', tasteRating: 4, photogenicRating: 3, typicalWaitMin: 15,
    recommended: ['Bratwurst', 'Schnitzel estilo alemán transilvano'], addOns: [],
    photoTip: 'Ambiente de taberna gótica europea.',
  },
];

export const DARKUNIVERSE_AREA_GUIDE: AreaGuide = {
  id: 'area-dark-universe', park: 'epic', name: 'Dark Universe', emoji: '🧟',
  bestFor: 'Adultos, fans del terror clásico — mejor experiencia de noche', walkFrom: 'Conecta con Celestial Park',
  guide: `La land más atmosférica del parque — pueblo transilvano gótico con niebla constante. Recomendado visitarla al final del día (7-9 PM) cuando la iluminación nocturna hace la experiencia mucho más inmersiva.`,
};

// ───────────────────────── EXPORT: ALL COMBINED ─────────────────────────

export const EPIC_UNIVERSE_ATTRACTIONS: Attraction[] = [
  ...CELESTIAL_ATTRACTIONS, ...NINTENDO_ATTRACTIONS, ...BERK_ATTRACTIONS,
  ...MINISTRY_ATTRACTIONS, ...DARKUNIVERSE_ATTRACTIONS,
];

export const EPIC_UNIVERSE_MEALS: Meal[] = [
  ...CELESTIAL_MEALS, ...NINTENDO_MEALS, ...BERK_MEALS, ...MINISTRY_MEALS, ...DARKUNIVERSE_MEALS,
];

export const EPIC_UNIVERSE_CHARACTERS: CharacterMeet[] = [...NINTENDO_CHARACTERS];

export const EPIC_UNIVERSE_AREA_GUIDES: AreaGuide[] = [
  CELESTIAL_AREA_GUIDE, NINTENDO_AREA_GUIDE, BERK_AREA_GUIDE, MINISTRY_AREA_GUIDE, DARKUNIVERSE_AREA_GUIDE,
];
