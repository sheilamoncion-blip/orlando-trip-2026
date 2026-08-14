import type { TripDay, Attraction, Meal, ShowItem, CharacterMeet, Country, TikTokIdea, InstagramIdea, PersonalizationItem, BirthdayPerson, AreaGuide, VisitedPark } from '../types';
import { UNIVERSAL_STUDIOS_ATTRACTIONS, UNIVERSAL_STUDIOS_MEALS, UNIVERSAL_STUDIOS_CHARACTERS, UNIVERSAL_STUDIOS_AREA_GUIDES } from './universalStudiosAreas';
import { EPIC_UNIVERSE_ATTRACTIONS, EPIC_UNIVERSE_MEALS, EPIC_UNIVERSE_CHARACTERS, EPIC_UNIVERSE_AREA_GUIDES } from './epicUniverseAreas';
import { MAGIC_KINGDOM_ATTRACTIONS, MAGIC_KINGDOM_MEALS, MAGIC_KINGDOM_CHARACTERS, MAGIC_KINGDOM_AREA_GUIDES } from './magicKingdomAreas';
import { EPCOT_ATTRACTIONS, EPCOT_EXTRA_MEALS, EPCOT_AREA_GUIDES } from './epcotAreas';

export const TRIP_DAYS: TripDay[] = [
  { date: '2026-08-22', label: 'Llegada', park: null, isFreeDay: true, freeDayPlan: 'Disney Springs, Beach Club, descansar del viaje' },
  { date: '2026-08-23', label: 'Universal Studios & Islands of Adventure', park: 'universal', isFreeDay: false, birthday: 'carlos', estimatedHours: 10 },
  { date: '2026-08-24', label: 'Día libre', park: null, isFreeDay: true, freeDayPlan: 'Downtown Disney, piscina' },
  { date: '2026-08-25', label: 'Epic Universe', park: 'epic', isFreeDay: false, birthday: 'sheila', estimatedHours: 9 },
  { date: '2026-08-26', label: 'Día libre', park: null, isFreeDay: true, freeDayPlan: 'Relax en el hotel, preparar comidas' },
  { date: '2026-08-27', label: 'Magic Kingdom', park: 'magic-kingdom', isFreeDay: false, estimatedHours: 11 },
  { date: '2026-08-28', label: 'Día libre (medio día opcional)', park: null, isFreeDay: true, freeDayPlan: 'Medio día opcional, compras' },
  { date: '2026-08-29', label: 'Epcot', park: 'epcot', isFreeDay: false, estimatedHours: 10 },
  { date: '2026-08-30', label: 'Salida', park: null, isFreeDay: true, freeDayPlan: 'Empacar, viaje de regreso' },
];

export const VISITED_PARKS: VisitedPark[] = [
  { parkId: 'universal', date: '2026-08-23', dayLabel: 'Día 1 — Carlos 45' },
  { parkId: 'islands', date: '2026-08-23', dayLabel: 'Día 1 — Carlos 45' },
  { parkId: 'epic', date: '2026-08-25', dayLabel: 'Día 2 — Sheila 37' },
  { parkId: 'magic-kingdom', date: '2026-08-27', dayLabel: 'Día 3' },
  { parkId: 'epcot', date: '2026-08-29', dayLabel: 'Día 4 — Festival de Comida y Vino' },
];

export const BIRTHDAYS: BirthdayPerson[] = [
  {
    id: 'carlos', name: 'Carlos Manuel', age: 45, date: '2026-08-23', park: 'universal',
    perks: [
      'Pide la pulsera "Celebrating" en Guest Services (GRATIS)',
      'Pregunta por descuentos/postres gratis de cumpleaños',
      'Champagne en Mythos ($35)',
      'Pastel de cumpleaños (ordenar 1 día antes, $35-60)',
      'Foto grupal para el recuerdo',
    ],
    mainGift: 'Varita personalizada "Carlos 45" ($45-60)',
    altGifts: ['Pastel de cumpleaños ($35-60)', 'Champagne en Mythos ($35)'],
  },
  {
    id: 'sheila', name: 'Sheila', age: 37, date: '2026-08-25', park: 'epic',
    perks: [
      'Pide la pulsera "Celebrating" en Guest Services (GRATIS)',
      'Perfume Dior grabado "Sheila 37 Orlando 2026" — ordenar temprano (2-3h de proceso)',
      'Pastel de cumpleaños (ordenar 1 día antes, $35-60)',
      'Celebración con champagne en restaurante',
      'Foto grupal para el recuerdo',
    ],
    mainGift: 'Perfume Dior grabado ($150-200, "Sheila 37 Orlando 2026")',
    altGifts: ['Tiara personalizada ($60-120)', 'Orejas personalizadas ($35-80)', 'Pasaporte grabado ($25-40)'],
  },
];

export const ATTRACTIONS: Attraction[] = [
  // Aug 23 - Universal Studios Florida, 8 áreas ultra-detalladas (Carlos)
  ...UNIVERSAL_STUDIOS_ATTRACTIONS,

  // Aug 23 - Islands of Adventure (mismo día, Park-to-Park ticket)
  a('islands', '2026-08-23', 'Harry Potter and the Forbidden Journey', 4, 45, 48, 3, 'Filma la entrada al castillo de Hogwarts desde el puente — mejor luz en la mañana.', ['https://www.pinterest.com/search/pins/?q=hogwarts%20castle%20universal'], ['Dumbledore', 'Hermione', 'Hagrid']),
  a('islands', '2026-08-23', 'Skull Island: Reign of Kong', 6, 30, 36, 3, 'La niebla de la entrada se ve increíble en cámara lenta.', [], []),
  a('islands', '2026-08-23', 'The Amazing Adventures of Spider-Man', 4, 35, 40, 3, 'El logo 3D de Marvel a la entrada es un buen fondo.', [], ['Spider-Man']),
  a('islands', '2026-08-23', "Jurassic World VelociCoaster", 2, 60, 51, 5, 'La cámara de la caída al agua toma la mejor foto — revisa el kiosko al bajar.', [], []),
  a('islands', '2026-08-23', 'The Incredible Hulk Coaster', 2, 45, 54, 5, 'El lanzamiento inicial da la mejor cara de susto — cámara en la primera colina.', [], []),

  // Aug 25 - Epic Universe (Sheila) — 5 lands ultra-detalladas
  ...EPIC_UNIVERSE_ATTRACTIONS,

  // Aug 27 - Magic Kingdom — 5 lands ultra-detalladas
  ...MAGIC_KINGDOM_ATTRACTIONS,

  // Aug 29 - Epcot — World Celebration/Discovery/Nature + atracciones de World Showcase
  ...EPCOT_ATTRACTIONS,
];

export const MEALS: Meal[] = [
  // Aug 23 - Universal Studios Florida, 8 áreas ultra-detalladas
  ...UNIVERSAL_STUDIOS_MEALS,

  // Aug 23 - Islands of Adventure
  m('islands', '2026-08-23', 'Mythos Restaurant (Restaurante Mythos)', '$25-45', 5, 5, 20, ['Salmón glaseado con miel y limón', 'Risotto de camarones', 'Pastel de chocolate y banana'], [{ label: 'Copa de vino', price: 12 }]),
  m('islands', '2026-08-23', 'Three Broomsticks (Las Tres Escobas)', '$15-20', 4, 4, 15, ['Fish & chips', 'Turkey leg'], [{ label: 'Butterbeer helado', price: 6 }, { label: 'Cerveza + Vaso Vikingo', price: 5 }]),

  // The Frying Dutchman — Amity Island (Islands of Adventure)
  { id: 'islands-frying-dutchman-combo', park: 'islands', day: '2026-08-23', venue: 'The Frying Dutchman', name: 'Battered Fish and Shrimp Combo (Combo de pescado y camarón empanizado)', priceRange: '$24.49', tasteRating: 5, photogenicRating: 3, typicalWaitMin: 15, recommended: ['Bacalao fresco cortado a mano en batter, camarón empanizado, papas fritas, con malteada'], addOns: [], dietary: 'Pescado, mariscos, gluten' },
  { id: 'islands-frying-dutchman-fish-shrimp-platter', park: 'islands', day: '2026-08-23', venue: 'The Frying Dutchman', name: 'Battered Fish and Shrimp Platter (Plato de pescado y camarón empanizado)', priceRange: '$18.99', tasteRating: 5, photogenicRating: 3, typicalWaitMin: 15, recommended: ['Bacalao fresco en batter, camarón empanizado, papas fritas, tots, hushpuppy y salsa tártara/cóctel casera'], addOns: [], dietary: 'Pescado, mariscos, gluten' },
  { id: 'islands-frying-dutchman-fish-combo', park: 'islands', day: '2026-08-23', venue: 'The Frying Dutchman', name: 'Battered and Plattered Fish Combo (Combo de pescado empanizado en plato)', priceRange: '$22.49', tasteRating: 4, photogenicRating: 3, typicalWaitMin: 15, recommended: ['Bacalao fresco en batter, papas fritas, con malteada'], addOns: [], dietary: 'Pescado, gluten' },
  { id: 'islands-frying-dutchman-fish-platter', park: 'islands', day: '2026-08-23', venue: 'The Frying Dutchman', name: 'Battered and Plattered Fish Platter (Plato de pescado empanizado)', priceRange: '$16.99', tasteRating: 4, photogenicRating: 3, typicalWaitMin: 15, recommended: ['Bacalao fresco en batter, con tots de papa'], addOns: [], dietary: 'Pescado, mariscos, ajonjolí, gluten' },
  { id: 'islands-frying-dutchman-shrimp-combo', park: 'islands', day: '2026-08-23', venue: 'The Frying Dutchman', name: "Basket O' Shrimp Combo (Combo de canasta de camarones)", priceRange: '$22.49', tasteRating: 4, photogenicRating: 3, typicalWaitMin: 15, recommended: ['Camarón empanizado, papas fritas, con malteada'], addOns: [], dietary: 'Mariscos, gluten' },
  { id: 'islands-frying-dutchman-shrimp-basket', park: 'islands', day: '2026-08-23', venue: 'The Frying Dutchman', name: "Basket O' Shrimp (Canasta de camarones)", priceRange: '$16.99', tasteRating: 4, photogenicRating: 3, typicalWaitMin: 15, recommended: ['Camarón empanizado, papas fritas'], addOns: [], dietary: 'Mariscos, ajonjolí, gluten' },
  { id: 'islands-frying-dutchman-fountain', park: 'islands', day: '2026-08-23', venue: 'The Frying Dutchman', name: 'Bebidas de fuente (soda, Buzz Cola) (Refrescos de máquina)', priceRange: '$4.29-$4.99', tasteRating: 3, photogenicRating: 2, typicalWaitMin: 5, recommended: ['Coca-Cola, Coke Zero, Diet Coke, Sprite, Fanta Naranja, Barq\'s Root Beer, HiC Limonada, Gold Peak té helado, Buzz Cola (sin calorías, sabor cereza)'], addOns: [], dietary: 'Varía' },
  { id: 'islands-frying-dutchman-shake', park: 'islands', day: '2026-08-23', venue: 'The Frying Dutchman', name: 'Milkshake "100% Mammal Milk" (Batido "100% leche de mamífero")', priceRange: '$7.49', tasteRating: 4, photogenicRating: 4, typicalWaitMin: 10, recommended: ['Chocolate, vainilla o mixto'], addOns: [], photoTip: 'El nombre "100% Mammal Milk" (guiño a Jurassic Park) es buen detalle para foto/story.', dietary: 'Vegetariano — lácteos, huevo, gluten' },

  // Aug 25 - Epic Universe — 5 lands ultra-detalladas
  ...EPIC_UNIVERSE_MEALS,

  // Aug 27 - Magic Kingdom — 5 lands ultra-detalladas
  ...MAGIC_KINGDOM_MEALS,

  // Aug 29 - Epcot (World Nature; el resto está en el reto Eat Around the World)
  ...EPCOT_EXTRA_MEALS,
];

export const SHOWS: ShowItem[] = [
  s('islands', '2026-08-23', 'Frog Choir', ['10:30 AM', '12:00 PM', '2:00 PM', '4:00 PM'], 15, 'Hogsmeade', false, false),
  s('universal', '2026-08-23', 'Universal Orlando\'s Horror Make-Up Show', ['9:00 AM', '10:30 AM', '12:00 PM', '1:30 PM', '3:00 PM', '4:30 PM', '6:00 PM', '7:30 PM', '9:00 PM'], 23, 'Hollywood', true, true),
  s('magic-kingdom', '2026-08-27', 'Happily Ever After', ['8:30 PM'], 25, 'Cinderella Castle', true, false),
  s('magic-kingdom', '2026-08-27', 'Disney Enchantment', ['9:15 PM'], 20, 'Cinderella Castle', false, false),
  s('magic-kingdom', '2026-08-27', "Monsters Inc. Laugh Floor", ['Continuo, cada 15 min'], 15, 'Tomorrowland', false, true),
  s('epcot', '2026-08-29', 'Harmonious / Luminous', ['9:00 PM'], 20, 'World Showcase Lagoon', true, false),
  s('epcot', '2026-08-29', 'Mariachi Cobre', ['Varias veces al día'], 20, 'México', false, false),
  s('epcot', '2026-08-29', 'Matsuriza (Taiko Drums)', ['Varias veces al día'], 15, 'Japón', false, false),
  s('epcot', '2026-08-29', 'Voices of Liberty / Acordeón', ['Varias veces al día'], 15, 'UK / Alemania', false, false),
  s('epcot', '2026-08-29', 'Samba Dancers', ['Varias veces al día'], 15, 'Brasil', false, false),
];

export const CHARACTERS: CharacterMeet[] = [
  // Aug 23 - Universal Studios Florida (Minion Land, Diagon Alley, DreamWorks, Springfield)
  ...UNIVERSAL_STUDIOS_CHARACTERS,

  // Aug 23 - Islands of Adventure
  c('islands', 'Dumbledore', ['11:00 AM', '3:00 PM'], ['Autógrafo', 'Consejo mágico'], '11:00 AM (menos fila)', 'Pide que levante la varita — buena silueta con el castillo detrás.', []),
  c('islands', 'Hermione Granger', ['10:30 AM', '2:30 PM'], ['Autógrafo', 'Abrazo'], '10:30 AM', 'Foto leyendo un "libro" imaginario.', []),
  c('islands', 'Hagrid', ['11:30 AM', '4:00 PM'], ['Pluma de recuerdo', 'Abrazo de oso'], '11:30 AM', 'Es alto — toma la foto desde abajo para resaltarlo.', []),
  c('islands', 'Spider-Man', ['12:00 PM', '3:30 PM'], ['Pose de acción', 'Choca los cinco'], '12:00 PM', 'Pide la pose colgando de una "telaraña".', []),

  // Aug 25 - Epic Universe
  ...EPIC_UNIVERSE_CHARACTERS,

  // Aug 27 - Magic Kingdom
  ...MAGIC_KINGDOM_CHARACTERS,
];

export const AREA_GUIDES: AreaGuide[] = [
  ...UNIVERSAL_STUDIOS_AREA_GUIDES,
  ...EPIC_UNIVERSE_AREA_GUIDES,
  ...MAGIC_KINGDOM_AREA_GUIDES,
  ...EPCOT_AREA_GUIDES,
];

export const COUNTRIES: Country[] = [
  country('mexico', 'México', '🇲🇽', [
    ci('Tacos', 12, 5, 4, 'Tacos al pastor tradicionales'),
    ci('Ceviche', 15, 4, 4, 'Ceviche de pescado fresco'),
    ci('Chile Relleno', 14, 4, 3, 'Chile poblano relleno de queso'),
    ci('Churros', 8, 5, 5, 'Con chocolate o cajeta'),
  ], [
    ci('Margarita', 9, 4, 5, 'Clásica con sal'),
    ci('Agua de Jamaica', 5, 4, 3, 'Refrescante, sin alcohol'),
    ci('Cerveza', 7, 3, 2, 'Cerveza mexicana importada'),
  ], {
    bestTime: '11:00 AM (justo al abrir World Showcase) — es el primer pabellón, se llena rápido después del mediodía',
    crowdLevel: 'Alto — primer pabellón que ve la gente al entrar',
    photoTip: 'La pirámide maya iluminada por dentro (donde está la Margarita bar) es la foto más icónica — mejor de noche.',
    entertainment: 'Mariachi Cobre — varias veces al día frente a la pirámide',
    guide: 'Empieza aquí apenas abra World Showcase (11 AM) para evitar la fila que se forma después del mediodía. El interior de la pirámide (Plaza de los Amigos) tiene A/C — buen respiro del calor.',
  }),
  country('japon', 'Japón', '🇯🇵', [
    ci('Ramen', 18, 5, 4, 'Caldo tonkotsu tradicional'),
    ci('Sushi', 20, 4, 5, 'Variedad de nigiri y rolls'),
    ci('Tempura', 16, 4, 4, 'Camarón y vegetales'),
    ci('Mochi', 6, 4, 5, 'Postre de arroz relleno'),
  ], [
    ci('Sake', 8, 3, 3, 'Sake caliente o frío'),
    ci('Melon Soda', 6, 4, 5, 'Muy fotogénico, color verde brillante'),
    ci('Té Verde', 4, 3, 2, 'Té verde caliente'),
  ], {
    bestTime: '2:00-4:00 PM (después del pico de almuerzo)',
    crowdLevel: 'Medio-alto — la tienda Mitsukoshi atrae mucha gente aparte de la comida',
    photoTip: 'La pagoda de 5 pisos y el jardín japonés — muy fotogénico, poca gente se detiene a fotografiarlo bien.',
    entertainment: 'Matsuriza (tambores Taiko) — varias funciones al día, revisa horario en la app',
    guide: 'El interior de la tienda Mitsukoshi tiene A/C y es divertido para explorar mientras se hace tiempo entre comidas.',
  }),
  country('francia', 'Francia', '🇫🇷', [
    ci('Crêpes', 12, 5, 5, 'Dulces o saladas'),
    ci('Escargots', 16, 3, 3, 'Caracoles con mantequilla de ajo'),
    ci('Ratatouille', 15, 4, 4, 'Vegetales estilo la película'),
    ci('Macarons', 8, 5, 5, 'Colores variados, muy fotogénicos'),
    ci('Sopa de Cebolla', 12, 4, 3, 'Gratinada con queso'),
  ], [
    ci('Vino', 12, 4, 3, 'Copa de vino tinto o blanco'),
    ci('Chocolate Caliente', 6, 5, 4, 'Espeso estilo francés'),
    ci('Spritz', 10, 4, 4, 'Aperitivo con burbujas'),
  ], {
    bestTime: '12:00-1:00 PM o después de 6 PM — uno de los kioscos más populares del festival, se forma fila',
    crowdLevel: 'Muy alto — de los booths más populares del Festival de Comida y Vino',
    photoTip: 'La torre Eiffel a escala y los macarons de colores — flat-lay de los macarons con la torre de fondo.',
    entertainment: 'Réplica de la Torre Eiffel, calles estilo parisino para fotos',
    guide: 'Combínalo con Remy\'s Ratatouille Adventure (ver pestaña Itinerario) ya que está en el mismo pabellón. Fila de comida puede tardar 15-20 min en horas pico.',
  }),
  country('uk', 'Reino Unido', '🇬🇧', [
    ci('Fish & Chips', 16, 4, 3, 'Clásico británico'),
    ci('Meat Pie', 12, 4, 3, 'Pastel de carne'),
    ci('Sticky Toffee Pudding', 10, 5, 4, 'Postre de toffee tibio'),
  ], [
    ci('Ale', 8, 3, 2, 'Cerveza inglesa tipo ale'),
    ci('Té', 6, 3, 3, 'Té negro con leche'),
  ], {
    bestTime: '3:00-5:00 PM',
    crowdLevel: 'Medio — el Rose & Crown Pub se llena en la noche',
    photoTip: 'Las casas estilo Tudor y el jardín de rosas — buen fondo con poca gente en la tarde.',
    entertainment: 'Voices of Liberty o acordeón — varias veces al día frente al pub',
    guide: 'El Rose & Crown Pub tiene buena vista al lago para ver el show nocturno (Harmonious/Luminous) desde la terraza si llegas temprano a reservar mesa.',
  }),
  country('canada', 'Canadá', '🇨🇦', [
    ci('Poutine', 14, 4, 4, 'Papas con queso y gravy'),
    ci('Butter Tarts', 8, 4, 4, 'Postre tradicional canadiense'),
  ], [
    ci('Cerveza', 7, 3, 2, 'Cerveza canadiense'),
  ], {
    bestTime: '4:00-5:00 PM — el kiosco de comida más popular del festival, evita mediodía',
    crowdLevel: 'El más alto de los 11 — la sopa de queso cheddar del festival es "un rito de iniciación"',
    photoTip: 'Los jardines estilo Victoria, BC y la cascada — uno de los pabellones más fotogénicos y con menos gente parada a fotografiar.',
    guide: 'Es el último pabellón del recorrido (o el primero si caminas al revés desde el International Gateway) — muchas familias lo dejan para el final y se pierden que cierra temprano. Verifica el horario antes de planear llegar tarde.',
  }),
  country('italia', 'Italia', '🇮🇹', [
    ci('Pasta', 16, 5, 4, 'Pasta fresca al estilo italiano'),
    ci('Risotto', 15, 4, 4, 'Cremoso, variedad de sabores'),
    ci('Gelato', 8, 5, 5, 'Variedad de sabores, muy fotogénico'),
  ], [
    ci('Vino', 12, 4, 3, 'Copa de vino italiano'),
    ci('Espresso', 4, 3, 2, 'Espresso tradicional'),
  ], {
    bestTime: '2:00-4:00 PM',
    crowdLevel: 'Medio',
    photoTip: 'La fuente de Neptuno y la plaza estilo Venecia — buena luz en la tarde.',
    entertainment: 'Músicos ambulantes ocasionales en la plaza',
    guide: 'El gelato es parada obligatoria en el calor de agosto — se derrite rápido, foto primero, comer después.',
  }),
  country('alemania', 'Alemania', '🇩🇪', [
    ci('Schnitzel', 16, 4, 3, 'Empanizado tradicional'),
    ci('Pretzels', 8, 4, 4, 'Con mostaza'),
    ci('Pastel Selva Negra', 10, 5, 5, 'Chocolate y cerezas'),
  ], [
    ci('Cerveza', 8, 4, 3, 'Variedad alemana'),
    ci('Vino de Manzana', 8, 3, 3, 'Apfelwein tradicional'),
  ], {
    bestTime: '1:00-3:00 PM',
    crowdLevel: 'Medio',
    photoTip: 'La plaza estilo pueblo bávaro con el reloj de carrillón — foto clásica de "postal alemana".',
    entertainment: 'Acordeón / música bávara ocasional',
    guide: 'Buen punto para descansar sentado (mesas cubiertas) a media tarde entre países.',
  }),
  country('marruecos', 'Marruecos', '🇲🇦', [
    ci('Tagine', 16, 4, 4, 'Guiso tradicional marroquí'),
    ci('Cuscús', 14, 4, 3, 'Con vegetales'),
    ci('Falafel', 10, 4, 3, 'Croquetas de garbanzo'),
  ], [
    ci('Té de Menta', 5, 4, 4, 'Servido con ceremonia tradicional'),
  ], {
    bestTime: 'Cualquier hora — de los pabellones menos concurridos',
    crowdLevel: 'Bajo — subestimado, buena opción para saltarse filas',
    photoTip: 'Los mosaicos de azulejos y arcos — de los fondos más fotogénicos y con menos gente de todo World Showcase.',
    guide: 'Uno de los pabellones más tranquilos — buena oportunidad de fotos sin gente de fondo y sin fila para comer.',
  }),
  country('noruega', 'Noruega', '🇳🇴', [
    ci('Salmón', 18, 4, 4, 'Salmón noruego preparado tradicionalmente'),
    ci('Albóndigas', 14, 4, 3, 'Albóndigas suecas/noruegas'),
  ], [
    ci('Aquavit', 8, 3, 2, 'Licor tradicional nórdico'),
    ci('Bebida de Bayas', 6, 4, 4, 'Refrescante y colorida'),
  ], {
    bestTime: '11:00-12:00 PM (segundo pabellón del recorrido, aún poca gente)',
    crowdLevel: 'Alto en la atracción (Frozen Ever After) — bajo en los kioscos de comida',
    photoTip: 'El castillo estilo estave church noruego — foto clásica antes de que se llene.',
    guide: 'Combínalo con Frozen Ever After (ver pestaña Itinerario) — la fila de la atracción sube rápido después de las 12 PM, la comida en cambio no tiene mucha fila.',
  }),
  country('egipto', 'Egipto', '🇪🇬', [
    ci('Koshary', 12, 4, 3, 'Plato tradicional de lentejas y pasta'),
    ci('Falafel Wrap', 10, 4, 3, 'Wrap de falafel fresco'),
  ], [
    ci('Té de Menta', 5, 4, 3, 'Té egipcio tradicional'),
  ], {
    bestTime: 'Cualquier hora — kiosco pequeño, poca fila',
    crowdLevel: 'Bajo',
    photoTip: 'Detalles de jeroglíficos y columnas — buen fondo rápido sin esperar.',
    guide: 'Es un kiosco pequeño dentro del área de Marruecos/exterior — no tiene pabellón propio grande, revisa el mapa de la app para ubicarlo.',
  }),
  country('brasil', 'Brasil', '🇧🇷', [
    ci('Churrasco', 20, 5, 4, 'Carne asada estilo brasileño'),
    ci('Pão de Queijo', 8, 5, 5, 'Pan de queso, muy fotogénico'),
  ], [
    ci('Caipirinha', 10, 4, 4, 'Cóctel tradicional brasileño'),
    ci('Açaí', 9, 4, 5, 'Bowl de açaí, muy colorido'),
  ], {
    bestTime: '5:00-7:00 PM (mejor ambiente con música en vivo antes del show nocturno)',
    crowdLevel: 'Medio, sube en la noche por los bailarines de samba',
    photoTip: 'El bowl de açaí morado brillante — de los ítems más fotogénicos de todo el reto.',
    entertainment: 'Samba Dancers — shows nocturnos, buen cierre antes de Harmonious/Luminous',
    guide: 'Es de los pabellones más nuevos de World Showcase — buena energía nocturna, ideal para terminar el recorrido de los 11 países antes del show de fuegos.',
  }),
];

export const TIKTOK_IDEAS: TikTokIdea[] = [
  tk('Entrada Harry Potter', 'Hedwig\'s Theme', 'Filma la primera vista del castillo — caminando hacia adelante, cámara baja subiendo.', 15, 'Llegada, mañana con buena luz', 5, 'universal'),
  tk('Gritos en la Montaña Rusa', 'Audio "Rollercoaster"', 'Cámara en mano en la fila, luego reacción de la cámara de la atracción.', 10, 'En la fila o al bajar', 4, 'any'),
  tk('Sorbo de Butterbeer', 'ASMR + "Life is sweet"', 'Close-up del sorbo con espuma, sonido ASMR.', 8, 'Al recibir la bebida', 4, 'universal'),
  tk('Alrededor del Mundo', '"Around the World" (Daft Punk)', 'Transición rápida entre los 11 países del World Showcase.', 60, 'Durante el reto de Epcot', 5, 'epcot'),
  tk('Food Haul', 'ASMR comiendo', 'Mostrar toda la comida probada en el día, estilo mukbang corto.', 60, 'Después de comer', 4, 'any'),
  tk('Reacción a los Fuegos', 'Audio oficial "Happily Ever After"', 'Cámara en las caras de la familia mirando el show.', 60, 'Durante el show nocturno', 5, 'magic-kingdom'),
  tk('Magia del Castillo', '"Magical moment" (trending)', 'Toma cinemática del castillo con la familia caminando.', 30, 'Atardecer', 4, 'magic-kingdom'),
  tk('Momentos en Familia', 'Música emotiva', 'Recopilación de risas y abrazos del día.', 60, 'Cualquier momento', 3, 'any'),
  tk('Bloopers y Fails', 'Sonido de comedia', 'Los momentos chistosos/torpes del día.', 45, 'Cualquier momento', 4, 'any'),
  tk('Vlog Disney', 'Canción trending', 'Vlog completo del día, en 4-5 partes.', 180, 'Todo el día', 5, 'any'),
];

export const INSTAGRAM_IDEAS: InstagramIdea[] = [
  ig('Carrusel del día', 'Carrusel', '8-10 fotos curadas del día: atracciones, comida, familia — cierra con una foto grupal.', ['#OrlandoTrip2026', '#FamiliaLorenzo', '#DisneyWorld'], 'Noche, después de revisar todas las fotos', 5, 'any'),
  ig('Reel de transformación', 'Reel', 'Antes/después: la fila vs. la cara de emoción en la atracción — corte rápido con audio trending.', ['#UniversalOrlando', '#ThemePark'], 'Justo al bajar de la atracción', 4, 'any'),
  ig('Story "encuesta"', 'Story', 'Pregunta a los seguidores: "¿Cuál probamos primero?" con foto de 2-3 platillos del reto de Epcot.', ['#EatAroundTheWorld'], 'Durante el reto de los 11 países', 3, 'epcot'),
  ig('Reel POV atracción', 'Reel', 'Grabación en primera persona (POV) de la fila hasta subir — bien editado con música que combine el ritmo.', ['#POV', '#Universal'], 'En la fila, cámara al frente', 5, 'any'),
  ig('Story cuenta regresiva cumpleaños', 'Story', 'Cuenta regresiva de Instagram con foto de Carlos/Sheila el día de su cumpleaños.', ['#Cumpleaños45', '#Cumpleaños37'], 'La mañana del cumpleaños', 4, 'any'),
  ig('Carrusel comparativo', 'Carrusel', 'Foto de referencia de Pinterest al lado de la foto real de la familia recreándola.', ['#DisneyBound'], 'Después de recrear varias fotos del tablero', 4, 'any'),
  ig('Reel resumen del viaje', 'Reel', 'Compilado final de los 9 días — el más importante, guardar para el último día.', ['#OrlandoTrip2026', '#FamiliaLorenzo'], 'Último día, antes de salir', 5, 'any'),
];

export const PERSONALIZATION: PersonalizationItem[] = [
  p('magic-kingdom', 'Perfume Dior grabado', '$150-200', 'Grabado personalizado gratis', '2-3 horas de proceso', 'Guerlain Boutique / Perfumería en Main Street', 'sheila'),
  p('magic-kingdom', 'Orejas personalizadas', '$35-80', 'Bordado con nombre gratis', '30-45 min', 'Bibbidi Bobbidi Boutique / tiendas de Main Street', 'sheila'),
  p('magic-kingdom', 'Tiara de princesa grabada', '$60-120', 'Grabado personalizado', '30-45 min', 'Uptown Jewelers, Main Street', 'sheila'),
  p('epcot', 'Pasaporte personalizado', '$25-40', 'Grabado gratis en la tapa', '15-20 min', 'World Showcase — tienda de pasaportes', undefined),
  p('epcot', 'Jarra de butterbeer grabada', '$25-35', 'Grabado personalizado', '15-20 min', 'World Showcase', undefined),
  p('universal', 'Varita personalizada "Carlos 45"', '$45-60', 'Grabado del nombre en la varita', '20-30 min', 'Ollivanders, Diagon Alley / Hogsmeade', 'carlos'),
];

function a(park: Attraction['park'], day: string, name: string, durationMin: number, typicalWaitMin: number, heightMinIn: number | null, intensity: 1|2|3|4|5, photoTip: string, referenceLinks: string[], nearbyCharacters: string[]): Attraction {
  return { id: slug(park + '-' + name), park, day, name, durationMin, typicalWaitMin, heightMinIn, intensity, photoTip, referenceLinks, nearbyCharacters };
}
function m(park: Meal['park'], day: string, name: string, priceRange: string, tasteRating: number, photogenicRating: number, typicalWaitMin: number, recommended: string[], addOns: { label: string; price: number }[]): Meal {
  return { id: slug(park + '-' + name), park, day, name, priceRange, tasteRating, photogenicRating, typicalWaitMin, recommended, addOns };
}
function s(park: ShowItem['park'], day: string | null, name: string, times: string[], durationMin: number, location: string, mustSee: boolean, indoor: boolean): ShowItem {
  return { id: slug(park + '-' + name), park, day, name, times, durationMin, location, mustSee, indoor };
}
function c(park: CharacterMeet['park'], name: string, appearanceTimes: string[], freebies: string[], bestTime: string, photoTip: string, referenceLinks: string[]): CharacterMeet {
  return { id: slug(park + '-' + name), park, name, appearanceTimes, freebies, bestTime, photoTip, referenceLinks };
}
function ci(name: string, price: number, taste: number, photogenic: number, description: string) {
  return { id: slug(name), name, price, taste, photogenic, description };
}
function country(id: string, name: string, flag: string, foods: ReturnType<typeof ci>[], drinks: ReturnType<typeof ci>[], details?: { bestTime?: string; crowdLevel?: string; photoTip?: string; entertainment?: string; guide?: string }): Country {
  return { id, name, flag, foods, drinks, ...details };
}
function tk(title: string, audio: string, description: string, durationSec: number, bestTime: string, viralPotential: 1|2|3|4|5, park: TikTokIdea['park']): TikTokIdea {
  return { id: slug(title), title, audio, description, durationSec, bestTime, viralPotential, park };
}
function ig(title: string, format: InstagramIdea['format'], description: string, hashtags: string[], bestTime: string, viralPotential: 1|2|3|4|5, park: InstagramIdea['park']): InstagramIdea {
  return { id: slug(title), title, format, description, hashtags, bestTime, viralPotential, park };
}
function p(park: PersonalizationItem['park'], name: string, priceRange: string, customizable: string, orderTime: string, location: string, birthdayPick?: 'carlos' | 'sheila'): PersonalizationItem {
  return { id: slug(park + '-' + name), park, name, priceRange, customizable, orderTime, location, birthdayPick };
}
function slug(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
