// Universal Studios Florida — Aug 23, 2026 (Carlos Manuel's 45th birthday)
// Official ride names + heights from the printed park map (UniversalOrlandoMap.pdf).
// Wait-time patterns, ratings, photo/outfit tips from the family's ultra-detailed area guides.
import type { Attraction, Meal, CharacterMeet, AreaGuide, HourlyWait } from '../types';

const DAY = '2026-08-23';

function hw(entries: [string, number, number, string?][]): HourlyWait[] {
  return entries.map(([time, minMin, maxMin, note]) => ({ time, minMin, maxMin, note }));
}

// ───────────────────────── MINION LAND ─────────────────────────

export const MINION_ATTRACTIONS: Attraction[] = [
  {
    id: 'us-minion-mayhem', park: 'universal', area: 'Minion Land', day: DAY,
    name: 'Despicable Me Minion Mayhem', durationMin: 5, typicalWaitMin: 20, heightMinIn: 40, intensity: 2,
    photoTip: 'Foto en la fachada de "la casa de Gru" a las 8:10 AM — sin fila de fondo. Screenshot gratis del monitor de la foto de la atracción a la salida.',
    referenceLinks: [], nearbyCharacters: ['Bob el Minion', 'Kevin el Minion'],
    bestTime: '8:05-8:20 AM (0-10 min) o 8-9 PM',
    hourlyWait: hw([['8:00 AM', 0, 5, 'Perfecto — ir ya'], ['9:00 AM', 20, 35], ['11:00 AM', 60, 90, 'Pico — evitar'], ['1:00 PM', 80, 120, 'Peor momento'], ['3:00 PM', 50, 70], ['5:00 PM', 30, 50], ['8:00 PM', 15, 25], ['10:00 PM', 5, 15]]),
    guide: 'Simulador familiar (no coaster, sin inversiones). Accesible en silla de ruedas con transferencia. Capacidad ~1,500-2,000/hora. Foto en pantalla al salir: $15-20 o pide tomarle foto tú mismo gratis.',
  },
  {
    id: 'us-villain-con', park: 'universal', area: 'Minion Land', day: DAY,
    name: 'Illumination\'s Villain-Con Minion Blast', durationMin: 6, typicalWaitMin: 30, heightMinIn: 42, intensity: 3,
    photoTip: 'Vehículo con blaster interactivo — apunta al centro del blanco, dispara seguido (volumen > precisión) para mejor puntaje.',
    referenceLinks: [], nearbyCharacters: [],
    bestTime: '8:15-8:30 AM (justo después de Mayhem) o después de las 8 PM',
    hourlyWait: hw([['8:15 AM', 10, 20], ['9:30 AM', 35, 60], ['11:00 AM', 70, 100, 'Pico — peor que Mayhem'], ['1:00 PM', 90, 120], ['3:00 PM', 50, 80], ['5:00 PM', 35, 60], ['8:00 PM', 20, 40]]),
    guide: 'A diferencia de Mayhem, aquí compites por puntaje (bronce/plata/oro/platino) — se puede re-hacer para superar tu marca. Se pone más ocupado que Mayhem en las tardes.',
  },
];

export const MINION_MEALS: Meal[] = [
  // Illumination's Minion Café — menú real completo
  {
    id: 'us-minion-lucys-salmon', park: 'universal', area: 'Minion Land', day: DAY,
    name: "Lucy's Top Secret Salmon", priceRange: '$22.99', tasteRating: 5, photogenicRating: 4, typicalWaitMin: 15,
    recommended: ['Salmón atlántico a la parrilla', 'arroz azul de coco', 'pepinos thai', 'edamame', 'lipstick taser sauce'],
    addOns: [], photoTip: 'El arroz azul brillante contrasta con el salmón — foto desde arriba.',
    dietary: 'Sin lácteos, sin huevo, sin gluten, sin cacahuate, sin soya, sin mariscos de concha, sin nueces de árbol',
  },
  {
    id: 'us-minion-carls-cauliflower', park: 'universal', area: 'Minion Land', day: DAY,
    name: "Carl's Crispy Cauliflower", priceRange: '$18.99', tasteRating: 4, photogenicRating: 4, typicalWaitMin: 15,
    recommended: ['Coliflor crujiente con salsa agridulce picante', 'arroz azul de coco', 'pepinos thai', 'edamame'],
    addOns: [], photoTip: 'El arroz azul es la foto — opción vegana del menú.',
    dietary: 'Vegano · sin lácteos, huevo, pescado, gluten, cacahuate, mariscos, soya, nueces de árbol',
  },
  {
    id: 'us-minion-ottos-carbonara', park: 'universal', area: 'Minion Land', day: DAY,
    name: "Otto's Carbonara", priceRange: '$20.99', tasteRating: 5, photogenicRating: 3, typicalWaitMin: 15,
    recommended: ['Cavatappi amarillo', 'salsa cremosa de ajo', 'pancetta', 'guisantes'],
    addOns: [], dietary: 'Sin pescado, gluten, cacahuate, mariscos, soya, nueces de árbol',
  },
  {
    id: 'us-minion-stuarts-szechuan', park: 'universal', area: 'Minion Land', day: DAY,
    name: "Chicken Stuart's Szechuan Surprise", priceRange: '$18.99', tasteRating: 4, photogenicRating: 3, typicalWaitMin: 15,
    recommended: ['Pollo rotisserie glaseado Szechuan', 'lo mein de vegetales salteado'],
    addOns: [], dietary: 'Sin lácteos, huevo, pescado, gluten, mariscos, nueces de árbol',
  },
  {
    id: 'us-minion-drus-pork-sandwich', park: 'universal', area: 'Minion Land', day: DAY,
    name: "Uncle Dru's Belly Fillin' Pork Sandwich", priceRange: '$17.99', tasteRating: 5, photogenicRating: 4, typicalWaitMin: 15,
    recommended: ['Cerdo desmenuzado lento', 'chimichurri', 'alioli de mostaza', 'mantequilla de manzana', 'bacon jam', 'arúgula', 'pan de pretzel', 'con Minion tots'],
    addOns: [], photoTip: 'Corte transversal para mostrar las capas — muy fotogénico.',
    dietary: 'Sin huevo, pescado, mariscos, nueces de árbol',
  },
  {
    id: 'us-minion-cheese-ray-sandwich', park: 'universal', area: 'Minion Land', day: DAY,
    name: 'Steak & "Cheese Ray" Sandwich', priceRange: '$17.99', tasteRating: 5, photogenicRating: 4, typicalWaitMin: 15,
    recommended: ['Roast beef estilo French onion', 'cebollas caramelizadas', 'salsa secreta', 'queso cheddar "cheesy blast"', 'pan de cheddar y cebolla', 'con Minion tots'],
    addOns: [], dietary: 'Sin huevo, pescado, mariscos, nueces de árbol',
  },
  {
    id: 'us-minion-jerrys-burger', park: 'universal', area: 'Minion Land', day: DAY,
    name: "Jerry's Mega Cheesy Burger", priceRange: '$18.99', tasteRating: 5, photogenicRating: 5, typicalWaitMin: 15,
    recommended: ['Carne 7oz', 'queso americano', 'bacon crujiente', 'lechuga', 'tomate', 'salsa de queso', 'pan brioche casero', 'con Minion tots'],
    addOns: [], photoTip: 'La torre de ingredientes con el queso derretido escurriendo — foto clásica de burger.',
    dietary: 'Sin pescado, mariscos, nueces de árbol',
  },
  {
    id: 'us-minion-kevins-salad', park: 'universal', area: 'Minion Land', day: DAY,
    name: "Kevin's Chopa Chopa Salad", priceRange: '$17.99', tasteRating: 4, photogenicRating: 4, typicalWaitMin: 10,
    recommended: ['Col morada y arúgula', 'tomate', 'pepino', 'edamame', 'pollo rotisserie desmenuzado', 'queso fresco', 'vinagreta cítrica'],
    addOns: [], dietary: 'Sin lácteos (opción), huevo, pescado, gluten, mariscos, soya, nueces de árbol',
  },
  {
    id: 'us-minion-freedonia-mac', park: 'universal', area: 'Minion Land', day: DAY,
    name: 'Freedonia Festival of Mac & Cheese', priceRange: '$16.99', tasteRating: 5, photogenicRating: 4, typicalWaitMin: 10,
    recommended: ['Pasta con salsa de queso cheddar blanco', 'cerdo desmenuzado', 'perejil', 'parmesano', 'con Minion tots'],
    addOns: [], dietary: 'Sin huevo, pescado, mariscos, soya, nueces de árbol',
  },
  {
    id: 'us-minion-el-macho-nachos', park: 'universal', area: 'Minion Land', day: DAY,
    name: "El Macho's Supreme Nachos", priceRange: '$18.99', tasteRating: 4, photogenicRating: 4, typicalWaitMin: 10,
    recommended: ['Totopos crujientes', 'ropa vieja', 'jalapeños', 'crema de cilantro y lima', 'tomate', 'cebolla', 'salsa de queso'],
    addOns: [], photoTip: 'Buena opción para compartir en grupo grande.',
    dietary: 'Sin huevo, pescado, mariscos, soya, nueces de árbol',
  },
  {
    id: 'us-minion-mels-pizza', park: 'universal', area: 'Minion Land', day: DAY,
    name: "Mel's Meatball Mountain", priceRange: '$17.99', tasteRating: 4, photogenicRating: 4, typicalWaitMin: 15,
    recommended: ['Pizza rellena horneada', 'albóndigas', 'albahaca', 'mozzarella fresca', 'marinara'],
    addOns: [], dietary: 'Sin pescado, mariscos, nueces de árbol',
  },
  {
    id: 'us-minion-unicorn-cupcake', park: 'universal', area: 'Minion Land', day: DAY,
    name: 'Fluffy Unicorn Cupcake', priceRange: '$6.79', tasteRating: 5, photogenicRating: 5, typicalWaitMin: 5,
    recommended: ['Cupcake de confeti', 'glaseado vainilla y chicle', 'cuerno de unicornio de chocolate blanco'],
    addOns: [], photoTip: 'El cuerno de unicornio es la foto — muy colorido y tierno.',
    dietary: 'Vegetariano · sin pescado, mariscos, soya, nueces de árbol',
  },
  {
    id: 'us-minion-swiss-roll', park: 'universal', area: 'Minion Land', day: DAY,
    name: 'Minion Swiss Roll', priceRange: '$7.99', tasteRating: 5, photogenicRating: 5, typicalWaitMin: 5,
    recommended: ['Bizcocho de vainilla', 'ganache batida de piña y cardamomo', '"banana" de fruta de la pasión con cubierta de chocolate'],
    addOns: [], photoTip: 'El corte transversal muestra el relleno de colores — muy fotogénico.',
    dietary: 'Sin huevo, pescado, mariscos, nueces de árbol',
  },
  {
    id: 'us-minion-pet-rock', park: 'universal', area: 'Minion Land', day: DAY,
    name: "Otto's Pet Rock", priceRange: '$8.99', tasteRating: 4, photogenicRating: 4, typicalWaitMin: 5,
    recommended: ['Mousse de mantequilla de maní', 'jalea de fresa', 'maní triturado', 'bizcocho de banana bañado en chocolate'],
    addOns: [], dietary: 'Sin pescado, mariscos, soya',
  },
  {
    id: 'us-minion-tots', park: 'universal', area: 'Minion Land', day: DAY,
    name: 'Minion Tots', priceRange: '$5.99', tasteRating: 4, photogenicRating: 3, typicalWaitMin: 5,
    recommended: ['Tots de papa estilo minion — buen acompañante'], addOns: [], dietary: 'Vegetariano',
  },
  {
    id: 'us-minion-px41-punch', park: 'universal', area: 'Minion Land', day: DAY,
    name: 'PX-41 Punch (bebida especial)', priceRange: '$8.49', tasteRating: 4, photogenicRating: 5, typicalWaitMin: 5,
    recommended: ['Limonada con fresa y kiwi', 'topping color "Evil Minion"', 'Pop Rocks de blue raspberry'],
    addOns: [], photoTip: 'El color llamativo y las Pop Rocks la hacen la bebida más fotogénica del café.',
    dietary: 'Vegetariano',
  },
  {
    id: 'us-minion-antidote', park: 'universal', area: 'Minion Land', day: DAY,
    name: 'The Antidote (bebida especial)', priceRange: '$8.49', tasteRating: 5, photogenicRating: 5, typicalWaitMin: 5,
    recommended: ['Sabor a banana', 'topping color Minion', 'migas de galleta graham — sabe a pay de banana'],
    addOns: [], dietary: 'Vegetariano',
  },
  {
    id: 'us-minion-freestyle-cup', park: 'universal', area: 'Minion Land', day: DAY,
    name: 'Vaso souvenir Coca-Cola Freestyle®', priceRange: '$19.99 (día) + $12.99 día extra', tasteRating: 4, photogenicRating: 5, typicalWaitMin: 5,
    recommended: ['Más de 100 combinaciones de refrescos', 'refills todo el día de compra', 'descuento por comprar 2+ vasos'],
    addOns: [{ label: 'Día extra de refills', price: 12.99 }],
    photoTip: 'El vaso es el souvenir — se lo llevan a casa.',
    guide: 'Refills limitados a 1 cada 10 min, solo el día de compra salvo que agregues el día extra. No se puede compartir el vaso entre personas.',
  },
  {
    id: 'us-minion-mini-cheesy-mashup', park: 'universal', area: 'Minion Land', day: DAY,
    name: "Bob's Cheesy Mashup (menú niños)", priceRange: '$9.99', tasteRating: 4, photogenicRating: 3, typicalWaitMin: 10,
    recommended: ['Waffle de papa con cheddar', 'mac and cheese', 'salsa de queso', 'mini banana', 'uvas'],
    addOns: [], dietary: 'Vegetariano — para niños 9 años o menos',
  },
];

export const MINION_CHARACTERS: CharacterMeet[] = [
  {
    id: 'us-bob-minion', park: 'universal', area: 'Minion Land', name: 'Bob el Minion',
    appearanceTimes: ['10:00 AM', '12:30 PM', '3:00 PM', '5:30 PM'],
    freebies: ['Autógrafo', 'Foto PhotoPass (pide gratis)', 'Lección de "gibberish"', 'Selfie'],
    bestTime: '3:00 PM (fila de solo 5-15 min — la más corta del día)',
    photoTip: 'Agáchate a su altura. Pide la pose "ambos riendo" o "high-five a media acción".',
    referenceLinks: [],
    outfitOptions: [
      { label: 'Cosplay completo (amarillo + overol azul)', impact: 10, cost: '$25-120', description: 'Bob reacciona muchísimo más — interacción extra especial' },
      { label: 'Camisa amarilla + short azul (lo que ya tienes)', impact: 8, cost: '$20 (solo orejas)', description: 'Mejor balance esfuerzo/impacto — recomendado' },
      { label: 'Solo camisa amarilla', impact: 7, cost: '$0', description: 'Bob nota el amarillo, reacción moderada' },
      { label: 'Ropa normal', impact: 4, cost: '$0', description: 'Sigue siendo divertido, pero se pierde el momento especial' },
    ],
    guide: 'Bob NO se quita el disfraz, no habla inglés (solo gibberish), y la interacción dura 30-90 seg. Puedes conocer a Bob (10 AM) y Kevin (10:30 AM) en la misma hora — fila de Kevin suele ser más corta.',
  },
  {
    id: 'us-kevin-minion', park: 'universal', area: 'Minion Land', name: 'Kevin el Minion',
    appearanceTimes: ['10:30 AM', '1:00 PM', '3:30 PM', '6:00 PM'],
    freebies: ['Autógrafo', 'Foto PhotoPass'],
    bestTime: '10:30 AM (justo después de Bob, fila más corta)',
    photoTip: 'Mismos tips que Bob — colores amarillo/azul.',
    referenceLinks: [],
  },
];

export const MINION_AREA_GUIDE: AreaGuide = {
  id: 'area-minion-land', park: 'universal', name: 'Minion Land', emoji: '🟡',
  bestFor: 'Familias, buen arranque de día — ideal para cumpleaños de Carlos', walkFrom: '3-5 min desde la entrada (torniquetes)',
  guide: `ESTRATEGIA IDEAL (8:00-11:00 AM):
8:05 — Minion Mayhem → 8:35 — Villain-Con → 9:05 — Comida en Minion Café → 9:45 — Bob (10 AM) → 10:15 — Kevin opcional (10:30 AM) → 10:45 — merch (orejas $20) → 11:00 salir hacia Diagon Alley.

POR QUÉ FUNCIONA: a las 8 AM el 80% de la gente va directo a Harry Potter — Minion Land queda casi vacío 8-9 AM. Después de las 11 AM se llena rápido.

CHECKLIST:
☐ Vestir amarillo/azul (opción 2 recomendada) ☐ Ambas atracciones seguidas ☐ Comer temprano (9-9:45 AM) ☐ Conocer a Bob y opcionalmente Kevin ☐ Comprar orejas de minion ($20) ☐ 12-15 fotos

FAQ CLAVE:
• ¿Vale la pena la comida? Sí — cara pero icónica y muy fotogénica.
• ¿Qué pasa si llueve? Ambas atracciones son techadas, no se afectan.
• ¿Cuánto dura la visita completa? 2.5-3.5 horas.
• Presupuesto estimado: $65-100 por persona (atracciones incluidas en ticket, comida + merch aparte).`,
};

// ───────────────────────── DIAGON ALLEY ─────────────────────────

export const DIAGON_ATTRACTIONS: Attraction[] = [
  {
    id: 'us-gringotts', park: 'universal', area: 'Diagon Alley', day: DAY,
    name: 'Harry Potter and the Escape from Gringotts', durationMin: 6, typicalWaitMin: 60, heightMinIn: 42, intensity: 3,
    photoTip: 'Fachada de Gringotts y el dragón en el techo — mejor de noche (5-7 PM) con la iluminación mágica.',
    referenceLinks: [], nearbyCharacters: ['Harry Potter', 'Hermione Granger', 'Dumbledore'],
    bestTime: '11:00-11:30 AM (justo después del rush de apertura) o 7 PM+',
    hourlyWait: hw([['11:00 AM', 30, 50], ['12:00 PM', 45, 90], ['1:00 PM', 60, 120, 'Pico'], ['2:00 PM', 70, 130, 'Peor momento'], ['4:00 PM', 50, 90], ['6:00 PM', 30, 60], ['8:00 PM', 20, 40]]),
    guide: 'Dark ride banco de goblins con un momento sorpresa (revelación del dragón). Sin inversiones ni caídas grandes — familiar. Universal Express ahorra 60+ min si el tiempo apremia.',
  },
];

export const DIAGON_MEALS: Meal[] = [
  {
    id: 'us-leaky-cornish-pasty', park: 'universal', area: 'Diagon Alley', day: DAY,
    name: 'Cornish Pasty (Leaky Cauldron)', priceRange: '$13.99', tasteRating: 5, photogenicRating: 4, typicalWaitMin: 15,
    recommended: ['Pastel relleno de res, papa, colinabo — imprescindible'],
    addOns: [], photoTip: 'Corte transversal para mostrar el relleno; pastel dorado y crujiente.',
    dietary: 'Contiene res y gluten — hay versión vegetariana',
    guide: 'El plato insignia del Leaky Cauldron — pídelo siempre.',
  },
  {
    id: 'us-leaky-butterbeer', park: 'universal', area: 'Diagon Alley', day: DAY,
    name: 'Butterbeer (frozen o caliente)', priceRange: '$6.99 ($10.99 con vaso souvenir)', tasteRating: 5, photogenicRating: 5, typicalWaitMin: 5,
    recommended: ['Frozen en agosto (verano)', 'espuma cremosa arriba'],
    addOns: [{ label: 'Vaso souvenir', price: 4 }],
    photoTip: 'La espuma cremosa es la foto — de cerca, con la calle de Diagon Alley de fondo.',
    dietary: 'Contiene lácteos',
  },
  {
    id: 'us-leaky-apple-crumble', park: 'universal', area: 'Diagon Alley', day: DAY,
    name: 'Apple Crumble con Custard', priceRange: '$9.99', tasteRating: 5, photogenicRating: 4, typicalWaitMin: 15,
    recommended: ['Pide que sirvan el custard al momento — foto de la "pouring shot"'],
    addOns: [], photoTip: 'Captura el custard sirviéndose por encima — toma dinámica.', dietary: 'Contiene lácteos y gluten',
  },
];

export const DIAGON_CHARACTERS: CharacterMeet[] = [
  {
    id: 'us-harry-potter-char', park: 'universal', area: 'Diagon Alley', name: 'Harry Potter / Hermione / Draco / Dumbledore (rotan)',
    appearanceTimes: ['10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:30 PM', '4:30 PM', '6:00 PM', '7:00 PM'],
    freebies: ['Autógrafo (lleva libro o papel)', 'Foto PhotoPass', 'Pose con varita "Expelliarmus"'],
    bestTime: '11:00 AM o 4:30 PM (filas más cortas + buena luz)',
    photoTip: 'Pide 3-4 poses distintas; el personaje es paciente. La varita de Ollivanders ayuda mucho a la foto.',
    referenceLinks: [],
    outfitOptions: [
      { label: 'Cosplay Hogwarts completo (túnica + bufanda de casa)', impact: 10, cost: '$50-100', description: 'El personaje te reconoce — interacción extra mágica' },
      { label: 'Colores Gryffindor + varita', impact: 8, cost: '$10-20 (solo varita)', description: 'Recomendado — buen balance' },
      { label: 'Solo bufanda/corbata de casa', impact: 7, cost: 'variable', description: 'Sigue siendo temático' },
      { label: 'Ropa normal', impact: 6, cost: '$0', description: 'El personaje sigue siendo amigable' },
    ],
  },
];

export const DIAGON_AREA_GUIDE: AreaGuide = {
  id: 'area-diagon-alley', park: 'universal', name: 'Diagon Alley', emoji: '🪄',
  bestFor: 'El corazón mágico del día — el momento emocional de Diagon Alley', walkFrom: '10-12 min desde Minion Land',
  guide: `ESTRATEGIA IDEAL (11:15 AM-2:30 PM):
11:15 llegar → 11:20 Gringotts (30-50 min fila) → 12:00 Leaky Cauldron almuerzo (Cornish Pasty + Butterbeer + Apple Crumble) → 12:50 foto con personaje → 1:15 Ollivander's (varita interactiva, 20-45 min fila) → 2:15 fotos finales y compras → 2:30 salir.

OLLIVANDER'S: experiencia interactiva de selección de varita ($50), 15-20 min, memorable para todas las edades. Mejor momento: 11:30 AM o 7 PM (fila más corta).

CHECKLIST:
☐ Gringotts (con o sin Express) ☐ Almuerzo completo en Leaky Cauldron ☐ Foto con personaje de Harry Potter ☐ Experiencia de Ollivander's ☐ Butterbeer (mínimo 1) ☐ 15-20 fotos

FAQ CLAVE:
• ¿Gringotts o Forbidden Journey primero? Forbidden Journey (en Islands of Adventure) es más emocionante — hacerlo 8-9:30 AM, luego Gringotts a las 11 AM.
• ¿Necesito la varita? No es obligatorio pero muy recomendado — funciona en varios puntos interactivos del parque.
• Presupuesto por persona: $100-170 (comida + varita + bebidas + compras).
• Mejor momento del día: 11:15 AM-2:30 PM o después de las 6 PM (luz mágica nocturna).`,
};

// ───────────────────────── DREAMWORKS LAND ─────────────────────────

export const DREAMWORKS_ATTRACTIONS: Attraction[] = [
  {
    id: 'us-shrek-4d', park: 'universal', area: 'DreamWorks Land', day: DAY,
    name: 'Shrek\'s Swamp Meet / Shrek 4-D', durationMin: 13, typicalWaitMin: 40, heightMinIn: null, intensity: 3,
    photoTip: 'Letrero de entrada a las 9-9:30 AM sin fila de fondo.', referenceLinks: [], nearbyCharacters: ['Shrek', 'Donkey'],
    bestTime: '9:00 AM (apertura) o después de 5 PM',
    hourlyWait: hw([['9:00 AM', 10, 20], ['11:00 AM', 45, 75], ['1:00 PM', 70, 110, 'Pico'], ['2:00 PM', 80, 120, 'Peor momento'], ['5:00 PM', 30, 50], ['8:00 PM', 20, 35]]),
    guide: 'Experiencia 4D con efectos de agua/viento/movimiento de asiento. Apta para todas las edades. Donkey roba el show.',
  },
];

export const DREAMWORKS_MEALS: Meal[] = [
  {
    id: 'us-shrek-waffle-cone', park: 'universal', area: 'DreamWorks Land', day: DAY,
    name: 'Shrek Swamp Waffle Cone', priceRange: '$8.99', tasteRating: 5, photogenicRating: 5, typicalWaitMin: 10,
    recommended: ['Cono verde con soft-serve de vainilla, drizzle de lima'],
    addOns: [], photoTip: 'Foto a contraluz antes de que se derrita — el verde resalta con el sol.',
    dietary: 'Vegetariano, contiene lácteos',
  },
  {
    id: 'us-trolls-lemonade', park: 'universal', area: 'DreamWorks Land', day: DAY,
    name: 'Trolls Pink Lemonade (vaso souvenir)', priceRange: '$6.50 ($9 con vaso)', tasteRating: 5, photogenicRating: 5, typicalWaitMin: 5,
    recommended: ['Vaso con personaje de Trolls'], addOns: [{ label: 'Vaso souvenir', price: 3 }],
    photoTip: 'Rosa brillante — foto a contraluz para resaltar el color.', dietary: 'Vegano',
  },
];

export const DREAMWORKS_CHARACTERS: CharacterMeet[] = [
  {
    id: 'us-shrek-char', park: 'universal', area: 'DreamWorks Land', name: 'Shrek & Donkey',
    appearanceTimes: ['10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:30 PM', '4:30 PM', '5:30 PM'],
    freebies: ['Autógrafo', 'Foto PhotoPass', '"Get out of me swamp!"'],
    bestTime: '10:00 AM o 4:30 PM (fila más corta)',
    photoTip: 'Donkey se mueve mucho — ten la cámara lista, 3-4 tomas rápidas.',
    referenceLinks: [],
    outfitOptions: [{ label: 'Camisa/short verde', impact: 9, cost: '$0', description: 'Shrek hace la broma "¡combinas con mi pantano!"' }],
  },
];

export const DREAMWORKS_AREA_GUIDE: AreaGuide = {
  id: 'area-dreamworks', park: 'universal', name: 'DreamWorks Land', emoji: '🎨',
  bestFor: 'Familias con niños, ritmo relajado', walkFrom: '5-7 min desde Minion Land',
  guide: `ESTRATEGIA (2 horas, 10 AM-12 PM o 2:30-4:30 PM): Shrek 4-D → foto con Shrek → almuerzo/snack en DreamWorks Pavilion (Kung Fu Panda noodles + Trolls Lemonade).
FAQ: El show no es opcional realmente — es corto (13 min) y muy querido por niños. Hay opción vegana (tazón de Kung Fu Panda con tofu). Evitar 12-4 PM (pico de fila).`,
};

// ───────────────────────── SPRINGFIELD (THE SIMPSONS) ─────────────────────────

export const SPRINGFIELD_ATTRACTIONS: Attraction[] = [
  {
    id: 'us-simpsons-ride', park: 'universal', area: 'Springfield, U.S.A.', day: DAY,
    name: 'The Simpsons Ride', durationMin: 8, typicalWaitMin: 60, heightMinIn: 40, intensity: 4,
    photoTip: 'Letrero de Springfield y Moe\'s Tavern a las 9-9:30 AM.', referenceLinks: [], nearbyCharacters: ['Bart Simpson', 'Homer Simpson'],
    bestTime: '9:00 AM (apertura) o después de 6 PM',
    hourlyWait: hw([['9:00 AM', 15, 25], ['11:00 AM', 50, 80], ['1:00 PM', 90, 150, 'Pico — el peor del parque'], ['2:00 PM', 100, 140], ['5:00 PM', 40, 70], ['6:00 PM', 25, 45]]),
    guide: 'Simulador de movimiento con humor adulto/crudo — NO recomendado para niños pequeños. Contenido humorístico tipo Los Simpson.',
  },
];

export const SPRINGFIELD_MEALS: Meal[] = [
  {
    id: 'us-krusty-burger', park: 'universal', area: 'Springfield, U.S.A.', day: DAY,
    name: 'Krusty Burger Deluxe', priceRange: '$15.99', tasteRating: 4, photogenicRating: 4, typicalWaitMin: 10,
    recommended: ['2 carnes, tocino, cheddar, salsa Krusty'], addOns: [],
    photoTip: 'Ángulo desde arriba para mostrar la altura de la torre.', dietary: 'Contiene res, lácteos, gluten — hay versión vegetariana',
  },
  {
    id: 'us-lard-lad-donuts', park: 'universal', area: 'Springfield, U.S.A.', day: DAY,
    name: 'Lard Lad Donuts', priceRange: '$8.99', tasteRating: 5, photogenicRating: 5, typicalWaitMin: 8,
    recommended: ['3 donas surtidas con glaseado rosado'], addOns: [],
    photoTip: 'Close-up del glaseado rosado — el ítem más icónico de Homero.', dietary: 'Contiene lácteos y gluten',
  },
  {
    id: 'us-milhouse-squishy', park: 'universal', area: 'Springfield, U.S.A.', day: DAY,
    name: 'Milhouse\'s Squishy (vaso souvenir)', priceRange: '$6.50 ($9 con vaso)', tasteRating: 4, photogenicRating: 5, typicalWaitMin: 5,
    recommended: ['Slushie azul tropical'], addOns: [{ label: 'Vaso souvenir', price: 3 }],
    photoTip: 'Azul brillante a contraluz.', dietary: 'Vegano',
  },
];

export const SPRINGFIELD_CHARACTERS: CharacterMeet[] = [
  {
    id: 'us-bart-homer-char', park: 'universal', area: 'Springfield, U.S.A.', name: 'Bart & Homer Simpson',
    appearanceTimes: ['10:30 AM', '11:30 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'],
    freebies: ['Autógrafo', 'Foto PhotoPass', '"¡Ay, caramba!" / "D\'oh!"'],
    bestTime: '10:30 AM o 4:00 PM',
    photoTip: 'Bart es rápido y energético; Homer más calmado y posado — pide 3-4 tomas de cada uno.',
    referenceLinks: [],
  },
];

export const SPRINGFIELD_AREA_GUIDE: AreaGuide = {
  id: 'area-springfield', park: 'universal', name: 'Springfield, U.S.A.', emoji: '🍩',
  bestFor: 'Adultos y fans de Los Simpson (humor no apto para niños pequeños)', walkFrom: '5-8 min desde DreamWorks',
  guide: `ESTRATEGIA (2 horas, 12-2 PM o mejor 5-7 PM): fila más corta en la tarde-noche.
CHECKLIST: ☐ Simpsons Ride ☐ Fotos con Bart y Homer ☐ Krusty Burger o Lard Lad Donuts ☐ Duff Beer si hay adultos 21+
FAQ: El humor es adulto/crudo, no apto para niños pequeños. Evitar 12-2 PM (fila de hasta 150 min).`,
};

// ───────────────────────── WORLD EXPO (MEN IN BLACK) ─────────────────────────

export const WORLDEXPO_ATTRACTIONS: Attraction[] = [
  {
    id: 'us-mib-alien-attack', park: 'universal', area: 'World Expo', day: DAY,
    name: 'MEN IN BLACK Alien Attack', durationMin: 5, typicalWaitMin: 60, heightMinIn: 42, intensity: 3,
    photoTip: 'Fachada de MIB a las 9-9:30 AM.', referenceLinks: [], nearbyCharacters: [],
    bestTime: '9:00 AM (apertura) o después de 6 PM',
    hourlyWait: hw([['9:00 AM', 20, 35], ['11:00 AM', 60, 100], ['1:00 PM', 80, 130, 'Pico'], ['3:00 PM', 50, 90], ['6:00 PM', 30, 50]]),
    guide: 'Dark ride interactivo con blasters — dispara seguido a los objetivos (volumen > precisión), busca multiplicadores bonus. Puntaje final determina el "final" de la historia — se puede repetir para superar la marca.',
  },
];

export const WORLDEXPO_MEALS: Meal[] = [
  {
    id: 'us-alien-slushy', park: 'universal', area: 'World Expo', day: DAY,
    name: 'Alien Slushy (vaso souvenir cabeza de alien)', priceRange: '$6.50 ($9 con vaso)', tasteRating: 4, photogenicRating: 5, typicalWaitMin: 5,
    recommended: ['Verde o morado'], addOns: [{ label: 'Vaso souvenir', price: 3 }],
    photoTip: 'A contraluz para efecto luminoso.', dietary: 'Vegano',
  },
];

export const WORLDEXPO_AREA_GUIDE: AreaGuide = {
  id: 'area-world-expo', park: 'universal', name: 'World Expo', emoji: '👽',
  bestFor: 'Todos — divertido e interactivo, no muy intenso', walkFrom: '7-10 min desde Springfield',
  guide: `ESTRATEGIA (2 horas, 3-5 PM ideal — evita el mediodía). El sistema de puntaje es competitivo entre familiares — buena rivalidad amistosa.
FAQ: No es intenso (sin caídas ni velocidad). Ideal para todas las edades mezcladas.`,
};

// ───────────────────────── NEW YORK ─────────────────────────

export const NEWYORK_ATTRACTIONS: Attraction[] = [
  {
    id: 'us-revenge-mummy', park: 'universal', area: 'New York', day: DAY,
    name: 'Revenge of the Mummy', durationMin: 4, typicalWaitMin: 70, heightMinIn: 48, intensity: 5,
    photoTip: 'Fachada de la tumba egipcia — mejor a las 9-9:30 AM.', referenceLinks: [], nearbyCharacters: [],
    bestTime: '9:00 AM (apertura) o después de 8 PM',
    hourlyWait: hw([['9:00 AM', 25, 40], ['11:00 AM', 70, 110], ['1:00 PM', 90, 150, 'Pico — el más intenso del parque'], ['3:00 PM', 80, 130], ['6:00 PM+', 30, 80]]),
    guide: 'La montaña rusa techada más intensa de Universal Studios (65 mph, oscuridad total, lanzamientos múltiples). Altura mínima 48"/122cm. NO apta para niños pequeños o quienes no toleren velocidad/oscuridad. Sin mojarse (a diferencia de Splash Mountain). Se puede re-montar fácilmente.',
  },
];

export const NEWYORK_MEALS: Meal[] = [
  {
    id: 'us-nyc-hotdog', park: 'universal', area: 'New York', day: DAY,
    name: 'Classic NYC Hotdog', priceRange: '$13.99', tasteRating: 5, photogenicRating: 4, typicalWaitMin: 10,
    recommended: ['Mostaza estilo NY, chucrut, relish de cebolla'], addOns: [],
    photoTip: 'Mostaza amarilla clásica visible.', dietary: 'Contiene res y gluten',
  },
  {
    id: 'us-alchemy-cocktail', park: 'universal', area: 'New York', day: DAY,
    name: 'Alchemy Bar Craft Cocktail (21+)', priceRange: '$14.99', tasteRating: 5, photogenicRating: 5, typicalWaitMin: 10,
    recommended: ['Cóctel temático de la Momia, efecto hielo seco'], addOns: [],
    photoTip: 'La cristalería y el efecto de hielo seco son la foto — vale la pena para el cumpleaños de Carlos.',
    dietary: 'Contiene alcohol — solo 21+',
  },
];

export const NEWYORK_AREA_GUIDE: AreaGuide = {
  id: 'area-new-york', park: 'universal', name: 'New York', emoji: '🪦',
  bestFor: 'Buscadores de emociones fuertes, adultos', walkFrom: '5-7 min desde World Expo',
  guide: `ESTRATEGIA: mejor de noche (8-10 PM) para fila corta, o justo a la apertura (9 AM). Se puede volver a montar varias veces sin mucha fila.
CUMPLEAÑOS DE CARLOS: el cóctel de Alchemy Bar (con hielo seco) es un buen brindis de cumpleaños nocturno.`,
};

// ───────────────────────── SAN FRANCISCO ─────────────────────────

export const SANFRANCISCO_ATTRACTIONS: Attraction[] = [
  {
    id: 'us-fast-furious', park: 'universal', area: 'San Francisco', day: DAY,
    name: 'Fast & Furious – Supercharged', durationMin: 7, typicalWaitMin: 50, heightMinIn: 40, intensity: 4,
    photoTip: 'Auto personalizado en la fachada de exhibición.', referenceLinks: [], nearbyCharacters: [],
    bestTime: '9:00 AM o después de 5 PM',
    hourlyWait: hw([['9:00 AM', 15, 30], ['12:00 PM', 70, 120], ['2:00 PM', 90, 150, 'Pico'], ['5:00 PM', 45, 80]]),
    guide: 'Simulador de movimiento moderado — menos intenso que Revenge of the Mummy. Apto para familias.',
  },
];

export const SANFRANCISCO_MEALS: Meal[] = [
  {
    id: 'us-turbo-burger', park: 'universal', area: 'San Francisco', day: DAY,
    name: 'Turbo Charger Burger', priceRange: '$14.99', tasteRating: 4, photogenicRating: 4, typicalWaitMin: 10,
    recommended: ['Cebolla crujiente, salsa especial'], addOns: [], photoTip: 'Diseño de "llamas" en el pan visible.', dietary: 'Contiene res, gluten, lácteos',
  },
];

export const SANFRANCISCO_AREA_GUIDE: AreaGuide = {
  id: 'area-san-francisco', park: 'universal', name: 'San Francisco', emoji: '🏎️',
  bestFor: 'Fans de autos y acción — opcional si el día se alarga', walkFrom: '5-7 min desde New York',
  guide: `Área más pequeña/rápida (1-1.5 horas). Mejor 5-6 PM. Se puede saltar si el tiempo apremia sin perder mucho.`,
};

// ───────────────────────── HOLLYWOOD ─────────────────────────

export const HOLLYWOOD_SHOWS_ATTRACTIONS: Attraction[] = [
  {
    id: 'us-horror-makeup-show', park: 'universal', area: 'Hollywood', day: DAY,
    name: 'Universal Orlando\'s Horror Make-Up Show', durationMin: 23, typicalWaitMin: 15, heightMinIn: null, intensity: 2,
    photoTip: 'Foto con el maquillista al salir del show — muy accesible y buena onda.', referenceLinks: [], nearbyCharacters: [],
    bestTime: 'Shows de 6 PM o 7:30 PM (buena luz, sin niños cansados)',
    hourlyWait: hw([['9:00 AM', 0, 0, 'Se puede entrar directo'], ['12:00 PM', 10, 25], ['6:00 PM', 15, 40]]),
    guide: 'Show en vivo educativo y cómico (NO da miedo real) — transformación de maquillaje de terror en vivo con efectos de sangre. Apto 6+. Incluido con la entrada, sin costo extra. Voluntarios del público bienvenidos.',
  },
];

export const HOLLYWOOD_MEALS: Meal[] = [
  {
    id: 'us-hollywood-popcorn', park: 'universal', area: 'Hollywood', day: DAY,
    name: 'Classic Movie Popcorn (balde souvenir)', priceRange: '$8.99-$11.99', tasteRating: 4, photogenicRating: 5, typicalWaitMin: 5,
    recommended: ['Balde temático coleccionable'], addOns: [], photoTip: 'Balde con branding de Hollywood visible.', dietary: 'Vegetariano',
  },
];

export const HOLLYWOOD_AREA_GUIDE: AreaGuide = {
  id: 'area-hollywood', park: 'universal', name: 'Hollywood', emoji: '🎬',
  bestFor: 'Cierre de noche — show incluido, ambiente relajado', walkFrom: '5-10 min desde San Francisco',
  guide: `Buen cierre de la noche: show de 20-25 min + foto con el maquillista + palomitas. Nueve funciones al día, cada ~90 min. Gratis con la entrada al parque.`,
};

// ───────────────────────── EXPORT: ALL COMBINED ─────────────────────────

export const UNIVERSAL_STUDIOS_ATTRACTIONS: Attraction[] = [
  ...MINION_ATTRACTIONS, ...DIAGON_ATTRACTIONS, ...DREAMWORKS_ATTRACTIONS,
  ...SPRINGFIELD_ATTRACTIONS, ...WORLDEXPO_ATTRACTIONS, ...NEWYORK_ATTRACTIONS,
  ...SANFRANCISCO_ATTRACTIONS, ...HOLLYWOOD_SHOWS_ATTRACTIONS,
];

export const UNIVERSAL_STUDIOS_MEALS: Meal[] = [
  ...MINION_MEALS, ...DIAGON_MEALS, ...DREAMWORKS_MEALS, ...SPRINGFIELD_MEALS,
  ...WORLDEXPO_MEALS, ...NEWYORK_MEALS, ...SANFRANCISCO_MEALS, ...HOLLYWOOD_MEALS,
];

export const UNIVERSAL_STUDIOS_CHARACTERS: CharacterMeet[] = [
  ...MINION_CHARACTERS, ...DIAGON_CHARACTERS, ...DREAMWORKS_CHARACTERS, ...SPRINGFIELD_CHARACTERS,
];

export const UNIVERSAL_STUDIOS_AREA_GUIDES: AreaGuide[] = [
  MINION_AREA_GUIDE, DIAGON_AREA_GUIDE, DREAMWORKS_AREA_GUIDE, SPRINGFIELD_AREA_GUIDE,
  WORLDEXPO_AREA_GUIDE, NEWYORK_AREA_GUIDE, SANFRANCISCO_AREA_GUIDE, HOLLYWOOD_AREA_GUIDE,
];
