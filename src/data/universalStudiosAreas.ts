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
    venue: "Illumination's Minion Café",
    name: "Lucy's Top Secret Salmon (El salmón súper secreto de Lucy)", priceRange: '$22.99', tasteRating: 5, photogenicRating: 4, typicalWaitMin: 15,
    recommended: ['Salmón atlántico a la parrilla', 'arroz azul de coco', 'pepinos thai', 'edamame', 'lipstick taser sauce'],
    addOns: [], photoTip: 'El arroz azul brillante contrasta con el salmón — foto desde arriba.',
    dietary: 'Sin lácteos, sin huevo, sin gluten, sin cacahuate, sin soya, sin mariscos de concha, sin nueces de árbol',
  },
  {
    id: 'us-minion-carls-cauliflower', park: 'universal', area: 'Minion Land', day: DAY,
    venue: "Illumination's Minion Café",
    name: "Carl's Crispy Cauliflower (La coliflor crujiente de Carl)", priceRange: '$18.99', tasteRating: 4, photogenicRating: 4, typicalWaitMin: 15,
    recommended: ['Coliflor crujiente con salsa agridulce picante', 'arroz azul de coco', 'pepinos thai', 'edamame'],
    addOns: [], photoTip: 'El arroz azul es la foto — opción vegana del menú.',
    dietary: 'Vegano · sin lácteos, huevo, pescado, gluten, cacahuate, mariscos, soya, nueces de árbol',
  },
  {
    id: 'us-minion-ottos-carbonara', park: 'universal', area: 'Minion Land', day: DAY,
    venue: "Illumination's Minion Café",
    name: "Otto's Carbonara (La carbonara de Otto)", priceRange: '$20.99', tasteRating: 5, photogenicRating: 3, typicalWaitMin: 15,
    recommended: ['Cavatappi amarillo', 'salsa cremosa de ajo', 'pancetta', 'guisantes'],
    addOns: [], dietary: 'Sin pescado, gluten, cacahuate, mariscos, soya, nueces de árbol',
  },
  {
    id: 'us-minion-stuarts-szechuan', park: 'universal', area: 'Minion Land', day: DAY,
    venue: "Illumination's Minion Café",
    name: "Chicken Stuart's Szechuan Surprise (La sorpresa Szechuan de pollo de Stuart)", priceRange: '$18.99', tasteRating: 4, photogenicRating: 3, typicalWaitMin: 15,
    recommended: ['Pollo rotisserie glaseado Szechuan', 'lo mein de vegetales salteado'],
    addOns: [], dietary: 'Sin lácteos, huevo, pescado, gluten, mariscos, nueces de árbol',
  },
  {
    id: 'us-minion-drus-pork-sandwich', park: 'universal', area: 'Minion Land', day: DAY,
    venue: "Illumination's Minion Café",
    name: "Uncle Dru's Belly Fillin' Pork Sandwich (El sándwich de cerdo que llena la barriga del Tío Dru)", priceRange: '$17.99', tasteRating: 5, photogenicRating: 4, typicalWaitMin: 15,
    recommended: ['Cerdo desmenuzado lento', 'chimichurri', 'alioli de mostaza', 'mantequilla de manzana', 'bacon jam', 'arúgula', 'pan de pretzel', 'con Minion tots'],
    addOns: [], photoTip: 'Corte transversal para mostrar las capas — muy fotogénico.',
    dietary: 'Sin huevo, pescado, mariscos, nueces de árbol',
  },
  {
    id: 'us-minion-cheese-ray-sandwich', park: 'universal', area: 'Minion Land', day: DAY,
    venue: "Illumination's Minion Café",
    name: 'Steak & "Cheese Ray" Sandwich (Sándwich de bistec y "Cheese Ray")', priceRange: '$17.99', tasteRating: 5, photogenicRating: 4, typicalWaitMin: 15,
    recommended: ['Roast beef estilo French onion', 'cebollas caramelizadas', 'salsa secreta', 'queso cheddar "cheesy blast"', 'pan de cheddar y cebolla', 'con Minion tots'],
    addOns: [], dietary: 'Sin huevo, pescado, mariscos, nueces de árbol',
  },
  {
    id: 'us-minion-jerrys-burger', park: 'universal', area: 'Minion Land', day: DAY,
    venue: "Illumination's Minion Café",
    name: "Jerry's Mega Cheesy Burger (La hamburguesa mega quesuda de Jerry)", priceRange: '$18.99', tasteRating: 5, photogenicRating: 5, typicalWaitMin: 15,
    recommended: ['Carne 7oz', 'queso americano', 'bacon crujiente', 'lechuga', 'tomate', 'salsa de queso', 'pan brioche casero', 'con Minion tots'],
    addOns: [], photoTip: 'La torre de ingredientes con el queso derretido escurriendo — foto clásica de burger.',
    dietary: 'Sin pescado, mariscos, nueces de árbol',
  },
  {
    id: 'us-minion-kevins-salad', park: 'universal', area: 'Minion Land', day: DAY,
    venue: "Illumination's Minion Café",
    name: "Kevin's Chopa Chopa Salad (La ensalada Chopa Chopa de Kevin)", priceRange: '$17.99', tasteRating: 4, photogenicRating: 4, typicalWaitMin: 10,
    recommended: ['Col morada y arúgula', 'tomate', 'pepino', 'edamame', 'pollo rotisserie desmenuzado', 'queso fresco', 'vinagreta cítrica'],
    addOns: [], dietary: 'Sin lácteos (opción), huevo, pescado, gluten, mariscos, soya, nueces de árbol',
  },
  {
    id: 'us-minion-freedonia-mac', park: 'universal', area: 'Minion Land', day: DAY,
    venue: "Illumination's Minion Café",
    name: 'Freedonia Festival of Mac & Cheese (Festival de macarrones con queso de Freedonia)', priceRange: '$16.99', tasteRating: 5, photogenicRating: 4, typicalWaitMin: 10,
    recommended: ['Pasta con salsa de queso cheddar blanco', 'cerdo desmenuzado', 'perejil', 'parmesano', 'con Minion tots'],
    addOns: [], dietary: 'Sin huevo, pescado, mariscos, soya, nueces de árbol',
  },
  {
    id: 'us-minion-el-macho-nachos', park: 'universal', area: 'Minion Land', day: DAY,
    venue: "Illumination's Minion Café",
    name: "El Macho's Supreme Nachos (Los nachos supremos de El Macho)", priceRange: '$18.99', tasteRating: 4, photogenicRating: 4, typicalWaitMin: 10,
    recommended: ['Totopos crujientes', 'ropa vieja', 'jalapeños', 'crema de cilantro y lima', 'tomate', 'cebolla', 'salsa de queso'],
    addOns: [], photoTip: 'Buena opción para compartir en grupo grande.',
    dietary: 'Sin huevo, pescado, mariscos, soya, nueces de árbol',
  },
  {
    id: 'us-minion-mels-pizza', park: 'universal', area: 'Minion Land', day: DAY,
    venue: "Illumination's Minion Café",
    name: "Mel's Meatball Mountain (La montaña de albóndigas de Mel)", priceRange: '$17.99', tasteRating: 4, photogenicRating: 4, typicalWaitMin: 15,
    recommended: ['Pizza rellena horneada', 'albóndigas', 'albahaca', 'mozzarella fresca', 'marinara'],
    addOns: [], dietary: 'Sin pescado, mariscos, nueces de árbol',
  },
  {
    id: 'us-minion-unicorn-cupcake', park: 'universal', area: 'Minion Land', day: DAY,
    venue: "Illumination's Minion Café",
    name: 'Fluffy Unicorn Cupcake (Cupcake esponjoso de unicornio)', priceRange: '$6.79', tasteRating: 5, photogenicRating: 5, typicalWaitMin: 5,
    recommended: ['Cupcake de confeti', 'glaseado vainilla y chicle', 'cuerno de unicornio de chocolate blanco'],
    addOns: [], photoTip: 'El cuerno de unicornio es la foto — muy colorido y tierno.',
    dietary: 'Vegetariano · sin pescado, mariscos, soya, nueces de árbol',
  },
  {
    id: 'us-minion-swiss-roll', park: 'universal', area: 'Minion Land', day: DAY,
    venue: "Illumination's Minion Café",
    name: 'Minion Swiss Roll (Brazo de gitano Minion)', priceRange: '$7.99', tasteRating: 5, photogenicRating: 5, typicalWaitMin: 5,
    recommended: ['Bizcocho de vainilla', 'ganache batida de piña y cardamomo', '"banana" de fruta de la pasión con cubierta de chocolate'],
    addOns: [], photoTip: 'El corte transversal muestra el relleno de colores — muy fotogénico.',
    dietary: 'Sin huevo, pescado, mariscos, nueces de árbol',
  },
  {
    id: 'us-minion-pet-rock', park: 'universal', area: 'Minion Land', day: DAY,
    venue: "Illumination's Minion Café",
    name: "Otto's Pet Rock (La mascota de piedra de Otto)", priceRange: '$8.99', tasteRating: 4, photogenicRating: 4, typicalWaitMin: 5,
    recommended: ['Mousse de mantequilla de maní', 'jalea de fresa', 'maní triturado', 'bizcocho de banana bañado en chocolate'],
    addOns: [], dietary: 'Sin pescado, mariscos, soya',
  },
  {
    id: 'us-minion-tots', park: 'universal', area: 'Minion Land', day: DAY,
    venue: "Illumination's Minion Café",
    name: 'Minion Tots (Croquetas de papa Minion)', priceRange: '$5.99', tasteRating: 4, photogenicRating: 3, typicalWaitMin: 5,
    recommended: ['Tots de papa estilo minion — buen acompañante'], addOns: [], dietary: 'Vegetariano',
  },
  {
    id: 'us-minion-px41-punch', park: 'universal', area: 'Minion Land', day: DAY,
    venue: "Illumination's Minion Café",
    name: 'PX-41 Punch (bebida especial)', priceRange: '$8.49', tasteRating: 4, photogenicRating: 5, typicalWaitMin: 5,
    recommended: ['Limonada con fresa y kiwi', 'topping color "Evil Minion"', 'Pop Rocks de blue raspberry'],
    addOns: [], photoTip: 'El color llamativo y las Pop Rocks la hacen la bebida más fotogénica del café.',
    dietary: 'Vegetariano',
  },
  {
    id: 'us-minion-antidote', park: 'universal', area: 'Minion Land', day: DAY,
    venue: "Illumination's Minion Café",
    name: 'The Antidote (bebida especial)', priceRange: '$8.49', tasteRating: 5, photogenicRating: 5, typicalWaitMin: 5,
    recommended: ['Sabor a banana', 'topping color Minion', 'migas de galleta graham — sabe a pay de banana'],
    addOns: [], dietary: 'Vegetariano',
  },
  {
    id: 'us-minion-freestyle-cup', park: 'universal', area: 'Minion Land', day: DAY,
    venue: "Illumination's Minion Café",
    name: 'Vaso souvenir Coca-Cola Freestyle®', priceRange: '$19.99 (día) + $12.99 día extra', tasteRating: 4, photogenicRating: 5, typicalWaitMin: 5,
    recommended: ['Más de 100 combinaciones de refrescos', 'refills todo el día de compra', 'descuento por comprar 2+ vasos'],
    addOns: [{ label: 'Día extra de refills', price: 12.99 }],
    photoTip: 'El vaso es el souvenir — se lo llevan a casa.',
    guide: 'Refills limitados a 1 cada 10 min, solo el día de compra salvo que agregues el día extra. No se puede compartir el vaso entre personas.',
  },
  {
    id: 'us-minion-mini-cheesy-mashup', park: 'universal', area: 'Minion Land', day: DAY,
    venue: "Illumination's Minion Café",
    name: "Bob's Cheesy Mashup (Mezcla quesuda de Bob) (menú niños)", priceRange: '$9.99', tasteRating: 4, photogenicRating: 3, typicalWaitMin: 10,
    recommended: ['Waffle de papa con cheddar', 'mac and cheese', 'salsa de queso', 'mini banana', 'uvas'],
    addOns: [], dietary: 'Vegetariano — para niños 9 años o menos',
  },
  {
    id: 'us-minion-mini-moonballs', park: 'universal', area: 'Minion Land', day: DAY,
    venue: "Illumination's Minion Café",
    name: "Shrunken Moonballs with Flying Sauce (Bolitas lunares encogidas con salsa voladora) (menú niños)", priceRange: '$9.99', tasteRating: 4, photogenicRating: 3, typicalWaitMin: 10,
    recommended: ['Mini albóndigas en marinara sobre espagueti', 'con Minion tots y mini banana'],
    addOns: [], dietary: 'Para niños 9 años o menos — sin cacahuate',
  },
  {
    id: 'us-minion-mini-pbj', park: 'universal', area: 'Minion Land', day: DAY,
    venue: "Illumination's Minion Café",
    name: "Mr. Gru's PB & Jelly (El sándwich de mantequilla de maní y mermelada del Sr. Gru) (menú niños)", priceRange: '$9.99', tasteRating: 4, photogenicRating: 2, typicalWaitMin: 5,
    recommended: ['Sándwich prensado de mantequilla de maní y jalea de Gru', 'con Minion tots y mini banana'],
    addOns: [], dietary: 'Vegetariano — para niños 9 años o menos, contiene cacahuate',
  },
  {
    id: 'us-minion-coconut-rice', park: 'universal', area: 'Minion Land', day: DAY,
    venue: "Illumination's Minion Café (Acompañantes)",
    name: 'Coconut Blue Rice (Arroz azul de coco)', priceRange: '$4.79', tasteRating: 4, photogenicRating: 4, typicalWaitMin: 5,
    recommended: ['El arroz azul brillante que acompaña varios platos del menú — se puede pedir solo'],
    addOns: [], dietary: 'Vegano — sin lácteos, huevo, pescado, gluten, cacahuate, mariscos, soya, nueces de árbol',
  },
  {
    id: 'us-minion-banana-chips', park: 'universal', area: 'Minion Land', day: DAY,
    venue: "Illumination's Minion Café (Acompañantes)",
    name: 'Green Banana Chips (Chips de plátano verde)', priceRange: '$4.99', tasteRating: 3, photogenicRating: 2, typicalWaitMin: 5,
    recommended: ['Chips de plátano verde — buena opción crocante y ligera'],
    addOns: [], dietary: 'Vegano — GS',
  },
  {
    id: 'us-minion-beverages', park: 'universal', area: 'Minion Land', day: DAY,
    venue: "Illumination's Minion Café",
    name: 'Bebidas (soda individual, agua premium, jugos, Powerade, leche, café)', priceRange: '$4.29-$6', tasteRating: 3, photogenicRating: 2, typicalWaitMin: 5,
    recommended: ['Vaso individual Coca-Cola Freestyle®, H2O+ Premium, Perrier®, jugo Minute Maid (naranja/manzana), Powerade (fruit punch/mountain berry), leche 2%/chocolate, bebidas calientes (café, descafeinado, cocoa, té)'],
    addOns: [], dietary: 'Varía según bebida',
  },
  {
    id: 'us-minion-beer', park: 'universal', area: 'Minion Land', day: DAY,
    venue: "Illumination's Minion Café",
    name: 'Cerveza enlatada y seltzer', priceRange: '$10.75-$13', tasteRating: 3, photogenicRating: 2, typicalWaitMin: 10,
    recommended: ['Modelo Especial, Miller Lite, Yuengling®, Athletic Brewing Co® (sin alcohol), Michelob Ultra®, High Noon Pineapple Seltzer, Nütrl Orange Vodka Seltzer'],
    addOns: [], dietary: 'Contiene alcohol — 21+ (excepto Athletic Brewing Co®)',
  },
  {
    id: 'us-minion-wine', park: 'universal', area: 'Minion Land', day: DAY,
    venue: "Illumination's Minion Café",
    name: 'Vinos (tinto y blanco)', priceRange: '$11.00', tasteRating: 3, photogenicRating: 2, typicalWaitMin: 10,
    recommended: ['Spellbound Cabernet Sauvignon (tinto), Noble Vines 446 Chardonnay (blanco)'],
    addOns: [], dietary: 'Contiene alcohol — 21+',
  },

  // ───── Richter's Burger Co. — menú completo ─────
  { id: 'us-richters-triple-smash', park: 'universal', area: 'Minion Land', day: DAY, venue: "Richter's Burger Co.",
    name: 'Triple Smash Burger (Triple hamburguesa smash)', priceRange: '$22.49 (plato) / $26.99 (combo)', tasteRating: 5, photogenicRating: 4, typicalWaitMin: 15,
    recommended: ['Tres smash patties, queso americano, cebolla asada, salsa secreta, pickles, pan brioche'], addOns: [], dietary: 'Res, gluten, lácteos, cacahuate, ajonjolí, mariscos, nuez' },
  { id: 'us-richters-double-smash', park: 'universal', area: 'Minion Land', day: DAY, venue: "Richter's Burger Co.",
    name: 'Double Smash Burger (Doble hamburguesa smash)', priceRange: '$18.49 (plato) / $22.99 (combo)', tasteRating: 5, photogenicRating: 4, typicalWaitMin: 15,
    recommended: ['Dos smash patties, queso americano, cebolla asada, salsa secreta, pickles, pan brioche'], addOns: [], dietary: 'Res, gluten, lácteos, cacahuate, ajonjolí, mariscos, nuez' },
  { id: 'us-richters-crispy-chicken', park: 'universal', area: 'Minion Land', day: DAY, venue: "Richter's Burger Co.",
    name: 'Crispy Chicken Sandwich (Sándwich de pollo crujiente)', priceRange: '$14.49 (plato) / $18.99 (combo)', tasteRating: 4, photogenicRating: 4, typicalWaitMin: 15,
    recommended: ['Pollo frito cubierto en Flamin\' Hot® Cheetos®, queso pepperjack, ranch picante, lechuga, pickles'], addOns: [], photoTip: 'El crujiente rojo de Cheetos® es muy llamativo en foto.', dietary: 'Pescado (trazas), gluten, ajonjolí, mariscos, soya, nuez' },
  { id: 'us-richters-impossible', park: 'universal', area: 'Minion Land', day: DAY, venue: "Richter's Burger Co.",
    name: 'Impossible™ Vegetarian Smash Burger (Hamburguesa smash vegetariana Impossible)', priceRange: '$15.99 (plato) / $20.49 (combo)', tasteRating: 4, photogenicRating: 3, typicalWaitMin: 15,
    recommended: ['Carne Impossible™, queso americano, cebolla asada, salsa secreta, pickles, pan brioche'], addOns: [], dietary: 'Vegetariano — gluten, lácteos, ajonjolí, mariscos, nuez' },
  { id: 'us-richters-golden-gate-fries', park: 'universal', area: 'Minion Land', day: DAY, venue: "Richter's Burger Co. (Acompañantes)",
    name: 'Golden Gate Fries (Papas fritas Golden Gate)', priceRange: '$7.49', tasteRating: 5, photogenicRating: 4, typicalWaitMin: 10,
    recommended: ['Papas fritas con salsa de queso nacho Tostitos® y trocitos de tocineta'], addOns: [], dietary: 'Res, huevo, pescado, ajonjolí, mariscos, soya, nuez' },
  { id: 'us-richters-fries', park: 'universal', area: 'Minion Land', day: DAY, venue: "Richter's Burger Co. (Acompañantes)",
    name: 'French Fries (Papas fritas)', priceRange: '$5.49', tasteRating: 4, photogenicRating: 2, typicalWaitMin: 10,
    recommended: ['Clásicas, veganas'], addOns: [], dietary: 'Vegano — GS' },
  { id: 'us-richters-cap-crunch-shake', park: 'universal', area: 'Minion Land', day: DAY, venue: "Richter's Burger Co. (Postres)",
    name: "Cap'n Crunch® Shake (Batido Cap'n Crunch)", priceRange: '$9.49', tasteRating: 5, photogenicRating: 5, typicalWaitMin: 10,
    recommended: ['Cap\'n Crunch® con Crunch Berries®, helado de vainilla'], addOns: [], photoTip: 'Cereal de colores encima — muy llamativo para foto/story.', dietary: 'Vegetariano — huevo, pescado, gluten, ajonjolí, mariscos, soya, nuez' },
  { id: 'us-richters-frisco-shake', park: 'universal', area: 'Minion Land', day: DAY, venue: "Richter's Burger Co. (Postres)",
    name: 'The Frisco Chocolate Shake (El batido de chocolate Frisco)', priceRange: '$7.99', tasteRating: 4, photogenicRating: 4, typicalWaitMin: 10,
    recommended: ['Malteada clásica de chocolate'], addOns: [], dietary: 'Vegetariano — huevo, pescado, gluten, ajonjolí, mariscos, soya, nuez' },
  { id: 'us-richters-cookie', park: 'universal', area: 'Minion Land', day: DAY, venue: "Richter's Burger Co. (Postres)",
    name: 'Freshly Baked Giant Chocolate Chip Cookie (Galleta gigante de chispas de chocolate recién horneada)', priceRange: '$5.29', tasteRating: 4, photogenicRating: 3, typicalWaitMin: 5,
    recommended: ['Recién horneada, tamaño gigante'], addOns: [], dietary: 'Vegetariano — pescado, gluten, ajonjolí, mariscos, soya, nuez' },
  { id: 'us-richters-freestyle-cup', park: 'universal', area: 'Minion Land', day: DAY, venue: "Richter's Burger Co.",
    name: 'Vaso souvenir Coca-Cola Freestyle®', priceRange: '$19.99 (o $9.99 edición Grad 2026) + $12.99 día extra', tasteRating: 3, photogenicRating: 3, typicalWaitMin: 5,
    recommended: ['Más de 100 combinaciones, refills todo el día (máx. 1 cada 10 min, mismo día de compra, no compartible)'], addOns: [], dietary: 'Varía según bebida' },
  { id: 'us-richters-beverages', park: 'universal', area: 'Minion Land', day: DAY, venue: "Richter's Burger Co.",
    name: 'Bebidas (soda individual, agua premium, jugo)', priceRange: '$4.29-$6', tasteRating: 3, photogenicRating: 2, typicalWaitMin: 5,
    recommended: ['Vaso individual Coca-Cola Freestyle®, agua premium, jugo de naranja Minute Maid'], addOns: [], dietary: 'Varía' },
  { id: 'us-richters-beer', park: 'universal', area: 'Minion Land', day: DAY, venue: "Richter's Burger Co.",
    name: 'Cerveza (Modelo, Miller Lite, Michelob Ultra, High Noon)', priceRange: '$10.75-$13', tasteRating: 3, photogenicRating: 2, typicalWaitMin: 10,
    recommended: ['Modelo Especial, Miller Lite, Michelob Ultra, High Noon Pineapple Seltzer'], addOns: [], dietary: 'Contiene alcohol — 21+' },
  { id: 'us-richters-poncho', park: 'universal', area: 'Minion Land', day: DAY, venue: "Richter's Burger Co.",
    name: 'Poncho para la lluvia (Poncho impermeable)', priceRange: '$13.00', tasteRating: 3, photogenicRating: 1, typicalWaitMin: 5,
    recommended: ['No es comida — se vende en el mismo punto de venta, útil para días de lluvia'], addOns: [], dietary: 'N/A' },
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

  // ───── Carrito de snacks de Shrek's Swamp ─────
  { id: 'us-shrek-waffle', park: 'universal', area: 'DreamWorks Land', day: DAY, venue: "Shrek's Swamp (snacks)",
    name: 'Far Far A Waffle (Waffle de Far Far Away)', priceRange: '$11.49', tasteRating: 4, photogenicRating: 3, typicalWaitMin: 10,
    recommended: ['Waffle con pepperoni'], addOns: [], dietary: 'Contiene gluten, cerdo/res, lácteos' },
  { id: 'us-shrek-shrekzel', park: 'universal', area: 'DreamWorks Land', day: DAY, venue: "Shrek's Swamp (snacks)",
    name: 'Shrekzel (Pretzel de Shrek)', priceRange: '$12.99', tasteRating: 4, photogenicRating: 4, typicalWaitMin: 10,
    recommended: ['Pretzel grande servido con queso'], addOns: [], dietary: 'Vegetariano — gluten, lácteos' },
  { id: 'us-shrek-swamp-dog', park: 'universal', area: 'DreamWorks Land', day: DAY, venue: "Shrek's Swamp (snacks)",
    name: 'Swamp Dog (Perro caliente del pantano)', priceRange: '$9.99', tasteRating: 4, photogenicRating: 5, typicalWaitMin: 10,
    recommended: ['Hot dog con queso verde derretido envuelto en "corteza de árbol" de pizza'],
    addOns: [], photoTip: 'El queso verde chorreando es el gancho fotográfico — tema pantano de Shrek.', dietary: 'Res, gluten, lácteos' },
  { id: 'us-shrek-mud-pudding', park: 'universal', area: 'DreamWorks Land', day: DAY, venue: "Shrek's Swamp (snacks)",
    name: 'Mud Puddle Pudding (Pudín charco de lodo)', priceRange: '$5.99', tasteRating: 4, photogenicRating: 4, typicalWaitMin: 5,
    recommended: ['Pudín de chocolate, migas de galleta, trozo de cookie cake y bichos de gomita'],
    addOns: [], photoTip: 'Los "bichos" de gomita encima llaman la atención de los niños.', dietary: 'Vegetariano — gluten, lácteos, huevo' },
  { id: 'us-shrek-ogre-icepop', park: 'universal', area: 'DreamWorks Land', day: DAY, venue: "Shrek's Swamp (snacks)",
    name: 'Frozen Ogre Sour Apple Ice Pop (Paleta helada de manzana agria del ogro congelado)', priceRange: '$6.99', tasteRating: 4, photogenicRating: 4, typicalWaitMin: 5,
    recommended: ['Paleta helada de manzana ácida, color verde ogro'], addOns: [], dietary: 'Vegano' },
  { id: 'us-shrek-donkey-icepop', park: 'universal', area: 'DreamWorks Land', day: DAY, venue: "Shrek's Swamp (snacks)",
    name: 'Chonkey Donkey Chocolate Ice Pop (Paleta helada de chocolate del burro Chonkey)', priceRange: '$6.99', tasteRating: 4, photogenicRating: 4, typicalWaitMin: 5,
    recommended: ['Paleta helada de chocolate, tema Donkey'], addOns: [], dietary: 'Vegetariano — lácteos' },
  { id: 'us-shrek-slurps', park: 'universal', area: 'DreamWorks Land', day: DAY, venue: "Shrek's Swamp (snacks)",
    name: 'Bebidas (agua, Powerade, Monster Energy)', priceRange: '$3.75-$5.75', tasteRating: 3, photogenicRating: 2, typicalWaitMin: 5,
    recommended: ['Agua embotellada, Powerade, Monster Energy'], addOns: [], dietary: 'Varía según bebida' },
  { id: 'us-shrek-draft-beer', park: 'universal', area: 'DreamWorks Land', day: DAY, venue: "Shrek's Swamp (snacks)",
    name: 'Cerveza de barril 20oz (Warsteiner Pilsner, Miller Lite)', priceRange: '$11.25-$13', tasteRating: 3, photogenicRating: 2, typicalWaitMin: 10,
    recommended: ['Warsteiner Pilsner, Miller Lite'], addOns: [], dietary: 'Contiene alcohol — 21+' },
  { id: 'us-shrek-canned-beer', park: 'universal', area: 'DreamWorks Land', day: DAY, venue: "Shrek's Swamp (snacks)",
    name: 'Cerveza enlatada (Angry Orchard, Sierra Nevada, Nütrl, High Noon)', priceRange: '$11.50-$12.50', tasteRating: 3, photogenicRating: 2, typicalWaitMin: 10,
    recommended: ['Angry Orchard (sidra), Sierra Nevada Hazy Little Thing, Nütrl, High Noon'], addOns: [], dietary: 'Contiene alcohol — 21+' },

  // ───── Trolls Treats ─────
  { id: 'us-trolls-treats-poppy-pink', park: 'universal', area: 'DreamWorks Land', day: DAY, venue: 'Trolls Treats',
    name: 'Poppy-licious Pink (Rosado Poppy-licious)', priceRange: '$7.99 (cono) / $8.49 (copa)', tasteRating: 5, photogenicRating: 5, typicalWaitMin: 10,
    recommended: ['Soft serve de limonada rosada con chispas de flores'], addOns: [], photoTip: 'Rosa vibrante con chispas de colores — muy fotogénico, tema Poppy.', dietary: 'Vegetariano' },
  { id: 'us-trolls-treats-brozone-berry', park: 'universal', area: 'DreamWorks Land', day: DAY, venue: 'Trolls Treats',
    name: 'Brozone Berry (Baya Brozone)', priceRange: '$7.99 (cono) / $8.49 (copa)', tasteRating: 5, photogenicRating: 5, typicalWaitMin: 10,
    recommended: ['Soft serve de huckleberry con chispas de hoja verde'], addOns: [], dietary: 'Vegetariano' },
  { id: 'us-trolls-treats-soft-serve', park: 'universal', area: 'DreamWorks Land', day: DAY, venue: 'Trolls Treats',
    name: 'Soft Serve (vainilla, chocolate o mixto) (Helado suave)', priceRange: '$5.49 (cono) / $5.99 (copa)', tasteRating: 4, photogenicRating: 3, typicalWaitMin: 10,
    recommended: ['Clásico soft serve — buena opción económica'], addOns: [], dietary: 'Vegetariano' },
  { id: 'us-trolls-treats-churro-sundae', park: 'universal', area: 'DreamWorks Land', day: DAY, venue: 'Trolls Treats',
    name: 'Churro Sundae (Copa de helado con churro)', priceRange: '$9.99', tasteRating: 5, photogenicRating: 5, typicalWaitMin: 10,
    recommended: ['Helado de vainilla, salsa de chocolate y chispas sobre una cama de mini churros'], addOns: [], photoTip: 'El mejor postre fotogénico de DreamWorks Land — buena opción para compartir en familia.', dietary: 'Vegetariano' },
  { id: 'us-trolls-treats-beverages', park: 'universal', area: 'DreamWorks Land', day: DAY, venue: 'Trolls Treats',
    name: 'Bebidas (soda, Powerade, agua, High Noon)', priceRange: '$4.25-$13', tasteRating: 3, photogenicRating: 2, typicalWaitMin: 5,
    recommended: ['Coca-Cola®, Coke Zero®, Diet Coke®, Sprite®, Minute Maid® Limonada Rosa, Minute Maid® Blue Raspberry, Powerade® (Mountain Berry Blast/Fruit Punch), agua embotellada, High Noon® (21+)'], addOns: [], dietary: 'Varía — High Noon contiene alcohol, 21+' },
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

  // ───── Bumblebee Man's Taco Truck ─────
  { id: 'us-bumblebee-nachos', park: 'universal', area: 'Springfield, U.S.A.', day: DAY, venue: "Bumblebee Man's Taco Truck",
    name: 'Supreme Chicken Nachos (Nachos supremos de pollo)', priceRange: '$14.99', tasteRating: 4, photogenicRating: 4, typicalWaitMin: 10,
    recommended: ['Tortillas de maíz crujientes, pollo, crema, aguacate, jalapeño, salsa de queso, salsa de tomate'], addOns: [], dietary: 'Lácteos, huevo, pescado, gluten, cacahuate, ajonjolí, mariscos, soya, nuez' },
  { id: 'us-bumblebee-pollo-tacos', park: 'universal', area: 'Springfield, U.S.A.', day: DAY, venue: "Bumblebee Man's Taco Truck",
    name: 'Pollo Tacos', priceRange: '$12.99', tasteRating: 4, photogenicRating: 3, typicalWaitMin: 10,
    recommended: ['Pollo marinado en tortillas suaves, cebolla y cilantro. Servido con chips y salsa roja o verde'], addOns: [], dietary: 'Lácteos, huevo, pescado, cacahuate, ajonjolí, mariscos, nuez' },
  { id: 'us-bumblebee-carnitas-tacos', park: 'universal', area: 'Springfield, U.S.A.', day: DAY, venue: "Bumblebee Man's Taco Truck",
    name: 'Carnitas Tacos', priceRange: '$12.99', tasteRating: 5, photogenicRating: 3, typicalWaitMin: 10,
    recommended: ['Cerdo asado deshebrado en tortillas suaves, cebolla y cilantro'], addOns: [], dietary: 'Lácteos, huevo, pescado, cacahuate, ajonjolí, mariscos, nuez' },
  { id: 'us-bumblebee-carne-asada-tacos', park: 'universal', area: 'Springfield, U.S.A.', day: DAY, venue: "Bumblebee Man's Taco Truck",
    name: 'Carne Asada Tacos', priceRange: '$12.99', tasteRating: 5, photogenicRating: 4, typicalWaitMin: 10,
    recommended: ['Res marinada y asada a la parrilla en tortillas de harina suaves, cebolla y cilantro'], addOns: [], photoTip: 'El corte a la parrilla se ve bien en foto de cerca.', dietary: 'Lácteos, huevo, pescado, cacahuate, ajonjolí, mariscos, nuez' },
  { id: 'us-bumblebee-beverages', park: 'universal', area: 'Springfield, U.S.A.', day: DAY, venue: "Bumblebee Man's Taco Truck",
    name: 'Bebidas (soda, agua premium)', priceRange: '$4.79-$6', tasteRating: 3, photogenicRating: 2, typicalWaitMin: 5,
    recommended: ['Coca-Cola®, Coca-Cola Zero Sugar®, Diet Coke®, Sprite®, agua premium embotellada'], addOns: [], dietary: 'Varía' },
  { id: 'us-bumblebee-duff-beer', park: 'universal', area: 'Springfield, U.S.A.', day: DAY, venue: "Bumblebee Man's Taco Truck",
    name: 'Cerveza Duff (botella)', priceRange: '$11.75', tasteRating: 4, photogenicRating: 3, typicalWaitMin: 10,
    recommended: ['Duff, Duff Lite, Duff Dry — la cerveza temática de Los Simpson, buena para el brindis del cumpleaños de Carlos'], addOns: [], dietary: 'Contiene alcohol — 21+' },
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

  // ───── Avenue Eats — menú completo ─────
  { id: 'us-avenue-corn', park: 'universal', area: 'New York', day: DAY, venue: 'Avenue Eats',
    name: 'Street Corn on the Cob (Elote callejero)', priceRange: '$6.29', tasteRating: 4, photogenicRating: 4, typicalWaitMin: 10,
    recommended: ['Elote de verano, salsa cremosa de lima, queso Cotija'], addOns: [], dietary: 'Vegetariano, lácteos' },
  { id: 'us-avenue-nachos', park: 'universal', area: 'New York', day: DAY, venue: 'Avenue Eats',
    name: 'Loaded Nachos (Nachos cargados)', priceRange: '$12.49', tasteRating: 4, photogenicRating: 4, typicalWaitMin: 10,
    recommended: ['Totopos de maíz blanco, chili casero, salsa de tomate, salsa de queso cheddar, jalapeños, cebollín'], addOns: [], dietary: 'Lácteos, gluten' },
  { id: 'us-avenue-empanada', park: 'universal', area: 'New York', day: DAY, venue: 'Avenue Eats',
    name: 'Chicken Empanada (Empanada de pollo)', priceRange: '$14.99', tasteRating: 4, photogenicRating: 3, typicalWaitMin: 10,
    recommended: ['Empanada de pollo, viene en combo con chips'], addOns: [], dietary: 'Gluten' },
  { id: 'us-avenue-pao-de-queijo', park: 'universal', area: 'New York', day: DAY, venue: 'Avenue Eats',
    name: 'Pão de Queijo (Pan de queso brasileño)', priceRange: '$6.99', tasteRating: 4, photogenicRating: 3, typicalWaitMin: 10,
    recommended: ['Pan de queso brasileño'], addOns: [], dietary: 'Vegetariano, lácteos — sin gluten (receta tradicional)' },
  { id: 'us-avenue-fruit-bowl', park: 'universal', area: 'New York', day: DAY, venue: 'Avenue Eats',
    name: 'Fresh Fruit Bowl / Chips (Tazón de fruta fresca / papitas)', priceRange: '$3.99', tasteRating: 3, photogenicRating: 3, typicalWaitMin: 5,
    recommended: ['Opción ligera — fruta fresca o chips'], addOns: [], dietary: 'Vegano' },
  { id: 'us-avenue-pastelito', park: 'universal', area: 'New York', day: DAY, venue: 'Avenue Eats',
    name: 'Guava & Cheese Pastelito (Pastelito de guayaba y queso)', priceRange: '$6.99', tasteRating: 5, photogenicRating: 4, typicalWaitMin: 10,
    recommended: ['Pastelito de guayaba y queso — sabor caribeño'], addOns: [], dietary: 'Vegetariano, gluten, lácteos' },
  { id: 'us-avenue-beverages', park: 'universal', area: 'New York', day: DAY, venue: 'Avenue Eats',
    name: 'Bebidas (soda individual, agua, Powerade, vaso Freestyle)', priceRange: '$4-$19.99', tasteRating: 3, photogenicRating: 2, typicalWaitMin: 5,
    recommended: ['Coca-Cola Freestyle® individual, agua embotellada, Powerade, vaso souvenir Freestyle®'], addOns: [], dietary: 'Varía' },
  { id: 'us-avenue-beer', park: 'universal', area: 'New York', day: DAY, venue: 'Avenue Eats',
    name: 'Cerveza', priceRange: '$10.75-$13', tasteRating: 3, photogenicRating: 2, typicalWaitMin: 10,
    recommended: ['Selección de cerveza del punto de venta'], addOns: [], dietary: 'Contiene alcohol — 21+' },

  // ───── Central Park Crepes ─────
  { id: 'us-central-park-brisket-crepe', park: 'universal', area: 'New York', day: DAY, venue: 'Central Park Crepes',
    name: 'Smoked Brisket Crepe (Crepa de brisket ahumado)', priceRange: '$13.99', tasteRating: 5, photogenicRating: 4, typicalWaitMin: 15,
    recommended: ['Brisket ahumado, hash de maíz y manzana, queso pepper jack, BBQ de sidra de manzana, micro cilantro'], addOns: [], dietary: 'Res, lácteos, gluten' },
  { id: 'us-central-park-lemon-blueberry', park: 'universal', area: 'New York', day: DAY, venue: 'Central Park Crepes',
    name: 'Lemon Blueberry Crepe (Crepa de limón y arándanos)', priceRange: '$12.99', tasteRating: 5, photogenicRating: 5, typicalWaitMin: 15,
    recommended: ['Panqué de limón, lemon curd, arándanos frescos, crema batida, azúcar glass'], addOns: [], photoTip: 'Los arándanos frescos y el azúcar glass encima se ven muy bien en foto de cerca.', dietary: 'Vegetariano — gluten, lácteos, huevo' },
  { id: 'us-central-park-strawberry-hazelnut', park: 'universal', area: 'New York', day: DAY, venue: 'Central Park Crepes',
    name: 'Strawberry Hazelnut Crepe (Crepa de fresa y avellana)', priceRange: '$10.99', tasteRating: 5, photogenicRating: 5, typicalWaitMin: 15,
    recommended: ['Fresas con mascarpone de Nutella, Nutella, fresas, crema batida y azúcar glass'], addOns: [], photoTip: 'El relleno de Nutella asomando al cortar — muy fotogénico.', dietary: 'Vegetariano — gluten, lácteos, huevo, avellana' },
  { id: 'us-central-park-freestyle', park: 'universal', area: 'New York', day: DAY, venue: 'Central Park Crepes',
    name: 'Vaso individual Coca-Cola Freestyle®', priceRange: '$4.79', tasteRating: 3, photogenicRating: 2, typicalWaitMin: 5,
    recommended: ['Más de 100 combinaciones de bebida con el vaso individual Freestyle®'], addOns: [], dietary: 'Varía según bebida' },
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

  // ───── Lombard's Seafood Grille — menú completo (comida sentados) ─────
  { id: 'us-lombards-tuna-crudo', park: 'universal', area: 'San Francisco', day: DAY, venue: "Lombard's Seafood Grille",
    name: 'Tuna Crudo* (Atún crudo)', priceRange: '$18', tasteRating: 5, photogenicRating: 5, typicalWaitMin: 20,
    recommended: ['Atún curado, aguacate, chalotes, ponzu de lime, togarashi'], addOns: [], photoTip: 'Plato colorido bien emplatado — buena luz natural junto a la ventana.', dietary: 'Pescado crudo — GS' },
  { id: 'us-lombards-chicken-bites', park: 'universal', area: 'San Francisco', day: DAY, venue: "Lombard's Seafood Grille",
    name: 'Sweet and Spicy Chicken Bites (Bocaditos de pollo dulces y picantes)', priceRange: '$16', tasteRating: 4, photogenicRating: 3, typicalWaitMin: 20,
    recommended: ['Pollo empanizado a mano, salsa honey gochujang'], addOns: [], dietary: 'Contiene gluten' },
  { id: 'us-lombards-mussels', park: 'universal', area: 'San Francisco', day: DAY, venue: "Lombard's Seafood Grille",
    name: 'Mussels (Mejillones)', priceRange: '$18', tasteRating: 4, photogenicRating: 3, typicalWaitMin: 20,
    recommended: ['Reducción de mantequilla con IPA, andouille, tomates heirloom, pan de masa madre a la parrilla'], addOns: [], dietary: 'Mariscos, gluten' },
  { id: 'us-lombards-shrimp-cocktail', park: 'universal', area: 'San Francisco', day: DAY, venue: "Lombard's Seafood Grille",
    name: 'Shrimp Cocktail (Cóctel de camarones)', priceRange: '$22', tasteRating: 4, photogenicRating: 4, typicalWaitMin: 20,
    recommended: ['Camarones jumbo, salsa cóctel de cítricos, limón, naranja, rábano'], addOns: [], dietary: 'Mariscos — GS' },
  { id: 'us-lombards-calamari', park: 'universal', area: 'San Francisco', day: DAY, venue: "Lombard's Seafood Grille",
    name: 'Crispy Calamari (Calamares crujientes)', priceRange: '$18', tasteRating: 5, photogenicRating: 4, typicalWaitMin: 20,
    recommended: ['Calamar frito en buttermilk, salsa tártara de alcaparras, pickles caseros'], addOns: [], dietary: 'Mariscos, gluten' },
  { id: 'us-lombards-salad', park: 'universal', area: 'San Francisco', day: DAY, venue: "Lombard's Seafood Grille",
    name: "Lombard's Salad (La ensalada de Lombard)", priceRange: '$16', tasteRating: 4, photogenicRating: 3, typicalWaitMin: 15,
    recommended: ['Mezcla verde, palmitos, tomates, pepino, mandarina, vinagreta de champagne'], addOns: [], dietary: 'Vegano — GS' },
  { id: 'us-lombards-caesar', park: 'universal', area: 'San Francisco', day: DAY, venue: "Lombard's Seafood Grille",
    name: 'Caesar Salad (Ensalada César)', priceRange: '$16 (+8 pollo, +11 camarón, +13 salmón)', tasteRating: 4, photogenicRating: 3, typicalWaitMin: 15,
    recommended: ['Romana picada, crutones, Parmigiano Reggiano'], addOns: [{ label: 'Pollo', price: 8 }, { label: 'Camarón', price: 11 }, { label: 'Salmón*', price: 13 }], dietary: 'Contiene gluten, lácteos' },
  { id: 'us-lombards-lobster-bisque', park: 'universal', area: 'San Francisco', day: DAY, venue: "Lombard's Seafood Grille",
    name: 'Lobster Bisque (Bisque de langosta)', priceRange: '$18', tasteRating: 5, photogenicRating: 3, typicalWaitMin: 15,
    recommended: ['Carne de langosta, crème fraîche, eneldo'], addOns: [], dietary: 'Mariscos, lácteos — GS' },
  { id: 'us-lombards-onion-soup', park: 'universal', area: 'San Francisco', day: DAY, venue: "Lombard's Seafood Grille",
    name: 'French Onion Soup (Sopa de cebolla francesa)', priceRange: '$12', tasteRating: 4, photogenicRating: 3, typicalWaitMin: 15,
    recommended: ['Queso gruyere, crutones de baguette'], addOns: [], dietary: 'Lácteos, gluten' },
  { id: 'us-lombards-lobster-roll', park: 'universal', area: 'San Francisco', day: DAY, venue: "Lombard's Seafood Grille",
    name: 'Lobster Roll (Rollo de langosta)', priceRange: '$38', tasteRating: 5, photogenicRating: 5, typicalWaitMin: 20,
    recommended: ['Carne de langosta, mayo Dijon, pan brioche, papitas caseras. Marida con Chalk Hill® Chardonnay'], addOns: [], photoTip: 'El clásico "instagrameable" de Lombard\'s.', dietary: 'Mariscos, gluten' },
  { id: 'us-lombards-burger', park: 'universal', area: 'San Francisco', day: DAY, venue: "Lombard's Seafood Grille",
    name: 'The Burger* (La hamburguesa)', priceRange: '$24', tasteRating: 5, photogenicRating: 4, typicalWaitMin: 20,
    recommended: ['1/2 lb Black Angus, aioli, pepperjack, tocineta de azúcar, pickles caseros, papas fritas. Marida con Cline Cellars® Zinfandel'], addOns: [], dietary: 'Res, gluten, lácteos' },
  { id: 'us-lombards-salmon', park: 'universal', area: 'San Francisco', day: DAY, venue: "Lombard's Seafood Grille",
    name: 'Salmon Beurre Blanc* (Salmón con salsa beurre blanc)', priceRange: '$39', tasteRating: 5, photogenicRating: 4, typicalWaitMin: 20,
    recommended: ['Salmón Verlasso®, arúgula, tocineta, beurre blanc de cítricos. Marida con Santa Margherita® Pinot Grigio'], addOns: [], dietary: 'Pescado, lácteos — GS' },
  { id: 'us-lombards-alfredo', park: 'universal', area: 'San Francisco', day: DAY, venue: "Lombard's Seafood Grille",
    name: 'Chicken Alfredo (Pollo Alfredo)', priceRange: '$28', tasteRating: 4, photogenicRating: 3, typicalWaitMin: 20,
    recommended: ['Pechuga de pollo, fettuccine, salsa Alfredo, Parmesano. Marida con Chalk Hill® Chardonnay'], addOns: [], dietary: 'Gluten, lácteos' },
  { id: 'us-lombards-bang-bang-shrimp', park: 'universal', area: 'San Francisco', day: DAY, venue: "Lombard's Seafood Grille",
    name: 'Bang Bang Shrimp Bowl (Tazón de camarones Bang Bang)', priceRange: '$33', tasteRating: 5, photogenicRating: 5, typicalWaitMin: 20,
    recommended: ['Camarón bang bang, arroz, coleslaw asiático, pepino encurtido. Marida con Maschio Prosecco'], addOns: [], photoTip: 'Buen color y textura para foto de bowl.', dietary: 'Mariscos' },
  { id: 'us-lombards-bistro-tender', park: 'universal', area: 'San Francisco', day: DAY, venue: "Lombard's Seafood Grille",
    name: 'Grilled Bistro Tender* (Filete de bistro a la parrilla)', priceRange: '$42', tasteRating: 5, photogenicRating: 4, typicalWaitMin: 25,
    recommended: ['Teres major, puré de papa, espárragos, demi de ajo negro. Marida con Sebastiani® Cabernet Sauvignon'], addOns: [], dietary: 'Res' },
  { id: 'us-lombards-cioppino', park: 'universal', area: 'San Francisco', day: DAY, venue: "Lombard's Seafood Grille",
    name: 'Cioppino Ocean Bowl (Tazón de mariscos cioppino)', priceRange: '$39', tasteRating: 5, photogenicRating: 5, typicalWaitMin: 25,
    recommended: ['Camarón, vieiras, mejillones, almejas, calamar, tomate, hinojo, pan de masa madre. Marida con Borsao® Rosé'], addOns: [], photoTip: 'El bowl de mariscos más fotogénico del menú.', dietary: 'Mariscos, gluten' },
  { id: 'us-lombards-forager', park: 'universal', area: 'San Francisco', day: DAY, venue: "Lombard's Seafood Grille",
    name: 'California Forager (Plato de vegetales silvestres al estilo California)', priceRange: '$28', tasteRating: 4, photogenicRating: 4, typicalWaitMin: 20,
    recommended: ['Puré de coliflor, hongos, bok choy, zanahorias arcoíris, vinagreta de jengibre. Marida con Blue Moon® Draft'], addOns: [], dietary: 'Vegano' },
  { id: 'us-lombards-lobster-mac', park: 'universal', area: 'San Francisco', day: DAY, venue: "Lombard's Seafood Grille",
    name: 'Lobster Mac & Cheese (side) (Macarrones con queso y langosta, acompañante)', priceRange: '$16', tasteRating: 5, photogenicRating: 3, typicalWaitMin: 15,
    recommended: ['Pasta shell, langosta, salsa de cheddar añejado, migas de masa madre'], addOns: [], dietary: 'Mariscos, gluten, lácteos' },
  { id: 'us-lombards-creamed-spinach', park: 'universal', area: 'San Francisco', day: DAY, venue: "Lombard's Seafood Grille",
    name: 'Creamed Spinach (side) (Espinaca cremosa, acompañante)', priceRange: '$9', tasteRating: 4, photogenicRating: 2, typicalWaitMin: 15,
    recommended: ['Espinaca fresca, bechamel de la casa, ajo, chalotes, Parmesano'], addOns: [], dietary: 'Vegetariano, lácteos, gluten' },
  { id: 'us-lombards-kids-penne', park: 'universal', area: 'San Francisco', day: DAY, venue: "Lombard's Seafood Grille (Menú Niños)",
    name: 'Penne with Marinara Sauce (Penne con salsa marinara)', priceRange: '$13', tasteRating: 3, photogenicRating: 2, typicalWaitMin: 15,
    recommended: ['Incluye 2 sides a elegir'], addOns: [], dietary: 'Vegano, gluten' },
  { id: 'us-lombards-kids-chicken', park: 'universal', area: 'San Francisco', day: DAY, venue: "Lombard's Seafood Grille (Menú Niños)",
    name: 'Grilled Chicken (niños) (Pollo a la parrilla)', priceRange: '$13', tasteRating: 4, photogenicRating: 2, typicalWaitMin: 15,
    recommended: ['Incluye 2 sides a elegir'], addOns: [], dietary: 'GS' },
  { id: 'us-lombards-kids-fingers', park: 'universal', area: 'San Francisco', day: DAY, venue: "Lombard's Seafood Grille (Menú Niños)",
    name: 'Chicken Fingers (niños) (Dedos de pollo)', priceRange: '$13', tasteRating: 4, photogenicRating: 3, typicalWaitMin: 15,
    recommended: ['Incluye 2 sides a elegir'], addOns: [], dietary: 'Gluten' },
  { id: 'us-lombards-kids-burger', park: 'universal', area: 'San Francisco', day: DAY, venue: "Lombard's Seafood Grille (Menú Niños)",
    name: "Lombard's Burger (niños) (La hamburguesa de Lombard)", priceRange: '$13', tasteRating: 4, photogenicRating: 2, typicalWaitMin: 15,
    recommended: ['Pan de ajonjolí, incluye 2 sides a elegir'], addOns: [], dietary: 'Res, gluten' },
  { id: 'us-lombards-choc-cake', park: 'universal', area: 'San Francisco', day: DAY, venue: "Lombard's Seafood Grille (Postres)",
    name: "Lombard's Chocolate Cake (El pastel de chocolate de Lombard)", priceRange: '$12', tasteRating: 5, photogenicRating: 5, typicalWaitMin: 15,
    recommended: ['Triple chocolate, ganache, NUTELLA®, salsa de frambuesa'], addOns: [], photoTip: 'Corte del pastel con ganache goteando — muy fotogénico.', dietary: 'Vegetariano, lácteos, gluten' },
  { id: 'us-lombards-panna-cotta', park: 'universal', area: 'San Francisco', day: DAY, venue: "Lombard's Seafood Grille (Postres)",
    name: 'Coconut Passion Fruit Panna Cotta (Panna cotta de coco y maracuyá)', priceRange: '$8', tasteRating: 4, photogenicRating: 4, typicalWaitMin: 15,
    recommended: ['Panna cotta de coco, gelée de maracuyá, streusel de coco'], addOns: [], dietary: 'Lácteos' },
  { id: 'us-lombards-yuzu-pie', park: 'universal', area: 'San Francisco', day: DAY, venue: "Lombard's Seafood Grille (Postres)",
    name: 'Strawberry Yuzu Pie (Pastel de fresa y yuzu)', priceRange: '$10', tasteRating: 4, photogenicRating: 5, typicalWaitMin: 15,
    recommended: ['Custard de fresa y yuzu, fresas frescas, salsa de frambuesa'], addOns: [], dietary: 'Lácteos, gluten' },
  { id: 'us-lombards-icecream', park: 'universal', area: 'San Francisco', day: DAY, venue: "Lombard's Seafood Grille (Postres)",
    name: "Lombard's Ice Cream / Fruit Sorbet (Helado de Lombard / sorbete de fruta)", priceRange: '$8', tasteRating: 4, photogenicRating: 2, typicalWaitMin: 10,
    recommended: ['Vainilla, chocolate o sorbete de fruta'], addOns: [], dietary: 'GS, vegetariano (sorbete = vegano)' },
  { id: 'us-lombards-fruit-plate', park: 'universal', area: 'San Francisco', day: DAY, venue: "Lombard's Seafood Grille (Postres)",
    name: 'Fruit Plate with Sorbet (Plato de fruta con sorbete)', priceRange: '$10', tasteRating: 4, photogenicRating: 4, typicalWaitMin: 10,
    recommended: ['Sandía, piña, naranja, toronja, cantalupo, melón'], addOns: [], dietary: 'Vegano — GS' },
  { id: 'us-lombards-mocktail', park: 'universal', area: 'San Francisco', day: DAY, venue: "Lombard's Seafood Grille",
    name: 'Pacific Berry Burst Mocktail (Mocktail explosión de bayas del Pacífico)', priceRange: '$11', tasteRating: 4, photogenicRating: 5, typicalWaitMin: 10,
    recommended: ['Fresas, moras, Watermelon Monin®, splash de Sprite® y limonada, con albahaca'], addOns: [], photoTip: 'Color rosado vibrante — muy bueno para foto/story.', dietary: 'Sin alcohol' },
  { id: 'us-lombards-soft-drinks', park: 'universal', area: 'San Francisco', day: DAY, venue: "Lombard's Seafood Grille",
    name: 'Bebidas del menú (refrescos, milkshakes, café, jugos, agua)', priceRange: '$3.75-$8', tasteRating: 3, photogenicRating: 2, typicalWaitMin: 5,
    recommended: ['Fountain soda, frozen drinks, milkshakes, té helado, jugos, leche, cappuccino/espresso/cocoa, agua premium (Perrier, Acqua Panna)'], addOns: [], dietary: 'Varía según bebida' },
  { id: 'us-lombards-cocktails', park: 'universal', area: 'San Francisco', day: DAY, venue: "Lombard's Seafood Grille",
    name: 'Cócteles de firma (solo adultos)', priceRange: '$16-$19', tasteRating: 4, photogenicRating: 4, typicalWaitMin: 10,
    recommended: ['Watermelon Hairpin Mojito, Margarita, Cable Car Cooler, Chinatown Strawberry Chill, Golden Gate Sunset, Waterfront, Pacific Berry Burst, Mocha Martini, Mule, Bloody Mary (clásico/carnívoro/herbívoro), Old Fashioned (clásico/Cadillac/Apple Pie)'], addOns: [], dietary: 'Contiene alcohol — 21+' },
  { id: 'us-lombards-beer', park: 'universal', area: 'San Francisco', day: DAY, venue: "Lombard's Seafood Grille",
    name: 'Cervezas (botella, lata y draft)', priceRange: '$9.75-$13', tasteRating: 3, photogenicRating: 2, typicalWaitMin: 10,
    recommended: ['Budweiser®, Bud Light®, Miller Lite®, Michelob Ultra®, Corona®, Stella Artois®, High Noon®, NÜTRL®, Sam Adams®, Blue Moon®, Clausthaler (sin alcohol)'], addOns: [], dietary: 'Contiene alcohol — 21+ (excepto Clausthaler)' },
  { id: 'us-lombards-wine', park: 'universal', area: 'San Francisco', day: DAY, venue: "Lombard's Seafood Grille",
    name: 'Vinos (blancos, tintos y espumosos)', priceRange: '$11-$75', tasteRating: 4, photogenicRating: 3, typicalWaitMin: 10,
    recommended: ['Blancos: Borsao Rosé, Guenoc Chardonnay, Mohua Sauvignon Blanc, A to Z Riesling, Santa Margherita Pinot Grigio, Chalk Hill Chardonnay. Tintos: Erath Pinot Noir, Murphy-Goode Merlot, Trapiche Malbec, Sebastiani Cabernet, Cline Zinfandel, Paul Buisse Chinon. Espumosos: Maschio Prosecco, G.H. Mumm Brut'], addOns: [], dietary: 'Contiene alcohol — 21+' },

  // ───── Bar 41 on the Pier / Dockside Dining (mismo muelle, San Francisco) ─────
  { id: 'us-bar41-pier39-splash', park: 'universal', area: 'San Francisco', day: DAY, venue: 'Bar 41 on the Pier',
    name: 'Pier 39 Splash (Splash del Muelle 39)', priceRange: '$17', tasteRating: 4, photogenicRating: 4, typicalWaitMin: 10,
    recommended: ['BACARDÍ® Superior, Myers\'s® dark rum, Bols® apricot brandy, jugo de naranja y piña, granadina'], addOns: [], dietary: 'Contiene alcohol — 21+' },
  { id: 'us-bar41-fog-city-spark', park: 'universal', area: 'San Francisco', day: DAY, venue: 'Bar 41 on the Pier',
    name: 'Fog City Spark (Chispa de la ciudad de niebla)', priceRange: '$16-$19', tasteRating: 4, photogenicRating: 3, typicalWaitMin: 10,
    recommended: ['Buffalo Trace® bourbon, jugo de limón, jarabe de maracuyá, ginger beer'], addOns: [], dietary: 'Contiene alcohol — 21+' },
  { id: 'us-bar41-premium-bar', park: 'universal', area: 'San Francisco', day: DAY, venue: 'Bar 41 on the Pier',
    name: 'Premium Bar (mezclado a elegir) (Barra premium para armar tu trago)', priceRange: '$19', tasteRating: 4, photogenicRating: 2, typicalWaitMin: 10,
    recommended: ['Tito\'s®, Captain Morgan Black®, BACARDÍ®, Patrón® Silver, Jack Daniel\'s®, Crown Royal®, Tanqueray®'], addOns: [], dietary: 'Contiene alcohol — 21+' },
  { id: 'us-bar41-soda-beer', park: 'universal', area: 'San Francisco', day: DAY, venue: 'Bar 41 on the Pier',
    name: 'Cerveza enlatada, soda y agua embotellada', priceRange: '$5.29-$6', tasteRating: 3, photogenicRating: 2, typicalWaitMin: 5,
    recommended: ['Bud Light®, Michelob Ultra®, Miller Lite®, Corona®, Stella Artois®, Sierra Nevada® Hazy Little Thing, High Noon®, NÜTRL®, Coca-Cola®, Sprite®'], addOns: [], dietary: 'Varía' },
  { id: 'us-bar41-bruschetta', park: 'universal', area: 'San Francisco', day: DAY, venue: 'Bar 41 on the Pier (Dockside Dining)',
    name: 'Bruschetta Stracciatella (Bruschetta con stracciatella)', priceRange: '$14', tasteRating: 4, photogenicRating: 4, typicalWaitMin: 15,
    recommended: ['Stracciatella casera, pan de masa madre, tomates asados, arúgula, glaseado balsámico'], addOns: [], dietary: 'Vegetariano, gluten, lácteos' },
  { id: 'us-bar41-beef-skewers', park: 'universal', area: 'San Francisco', day: DAY, venue: 'Bar 41 on the Pier (Dockside Dining)',
    name: 'Beef Skewers (Brochetas de res)', priceRange: '$16', tasteRating: 4, photogenicRating: 4, typicalWaitMin: 15,
    recommended: ['Brochetas glaseadas con hoisin, chili crisp, aioli de Sriracha®, cebollín'], addOns: [], dietary: 'Res' },
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

  // ───── Mel's Drive-In — menú completo (traducido al español) ─────
  { id: 'us-mels-burger', park: 'universal', area: 'Hollywood', day: DAY, venue: "Mel's Drive-In",
    name: "Mel's Famous Burger (La hamburguesa famosa de Mel)", priceRange: '$13.99 (plato) / $18.49 (combo con papas y Coca-Cola Freestyle®)', tasteRating: 4, photogenicRating: 4, typicalWaitMin: 15,
    recommended: ['Carne de res, queso americano, pickles, salsa secreta, lechuga y tomate en pan de ajonjolí tostado'], addOns: [], dietary: 'Res, gluten, lácteos — pan sin gluten disponible bajo pedido' },
  { id: 'us-mels-double-burger', park: 'universal', area: 'Hollywood', day: DAY, venue: "Mel's Drive-In",
    name: "Mel's Famous Double (La doble famosa de Mel)", priceRange: '$21.49 (plato) / $25.99 (combo)', tasteRating: 5, photogenicRating: 4, typicalWaitMin: 15,
    recommended: ['Doble carne de res, queso americano, pickles, salsa secreta, lechuga y tomate en pan de ajonjolí'], addOns: [], dietary: 'Res, gluten, lácteos' },
  { id: 'us-mels-chicken-fingers', park: 'universal', area: 'Hollywood', day: DAY, venue: "Mel's Drive-In",
    name: 'Crispy Chicken Fingers (Dedos de pollo crujientes)', priceRange: '$15.49 (plato) / $19.99 (combo)', tasteRating: 4, photogenicRating: 3, typicalWaitMin: 15,
    recommended: ['Fritos y crujientes, con salsa para mojar a elegir'], addOns: [], dietary: 'Gluten — sensible a huevo, pescado, maní, mariscos, ajonjolí, soya, nuez' },
  { id: 'us-mels-buffalo-sandwich', park: 'universal', area: 'Hollywood', day: DAY, venue: "Mel's Drive-In",
    name: 'Sándwich Crispy Buffalo Bacon (Sándwich crujiente de pollo búfalo con tocino)', priceRange: '$15.99 (plato) / $20.49 (combo)', tasteRating: 4, photogenicRating: 4, typicalWaitMin: 15,
    recommended: ['Pechuga de pollo crujiente en salsa Buffalo, tocineta, lechuga, tomate, aderezo ranch de aguacate, pan de ajonjolí'], addOns: [], dietary: 'Gluten, lácteos' },
  { id: 'us-mels-grilled-chicken', park: 'universal', area: 'Hollywood', day: DAY, venue: "Mel's Drive-In",
    name: 'Sándwich de Pollo a la Parrilla', priceRange: '$13.49 (plato) / $17.99 (combo)', tasteRating: 4, photogenicRating: 3, typicalWaitMin: 15,
    recommended: ['Pechuga de pollo a la parrilla, lechuga, tomate y ranch de aguacate en pan de ajonjolí'], addOns: [], dietary: 'Gluten, lácteos' },
  { id: 'us-mels-hotdog', park: 'universal', area: 'Hollywood', day: DAY, venue: "Mel's Drive-In",
    name: 'Hot Dog Chili Cheese Footlong (Perro caliente largo con chili y queso)', priceRange: '$14.49 (plato) / $18.99 (combo)', tasteRating: 4, photogenicRating: 4, typicalWaitMin: 15,
    recommended: ['Hot dog 100% de res, cebolla picada, chili y salsa de queso'], addOns: [], photoTip: 'El tamaño "footlong" luce bien en foto de cerca.', dietary: 'Res, lácteos' },
  { id: 'us-mels-impossible-burger', park: 'universal', area: 'Hollywood', day: DAY, venue: "Mel's Drive-In",
    name: 'Hamburguesa Impossible®', priceRange: '$15.99 (plato) / $20.49 (combo)', tasteRating: 4, photogenicRating: 3, typicalWaitMin: 15,
    recommended: ['Carne de origen vegetal Impossible®, queso americano, aioli de ajo, pickles, lechuga y tomate'], addOns: [], dietary: 'Vegetariano — contiene gluten y lácteos' },
  { id: 'us-mels-onion-rings', park: 'universal', area: 'Hollywood', day: DAY, venue: "Mel's Drive-In (Acompañantes)",
    name: 'Aros de Cebolla', priceRange: '$6.49', tasteRating: 4, photogenicRating: 3, typicalWaitMin: 10,
    recommended: ['Crujientes, buenos para compartir'], addOns: [], dietary: 'Vegetariano, gluten' },
  { id: 'us-mels-fries', park: 'universal', area: 'Hollywood', day: DAY, venue: "Mel's Drive-In (Acompañantes)",
    name: 'Papas Fritas', priceRange: '$5.49', tasteRating: 4, photogenicRating: 2, typicalWaitMin: 10,
    recommended: ['Clásicas, veganas'], addOns: [], dietary: 'Vegano — GS' },
  { id: 'us-mels-chili-fries', park: 'universal', area: 'Hollywood', day: DAY, venue: "Mel's Drive-In (Acompañantes)",
    name: 'Papas Fritas con Chili y Queso', priceRange: '$7.49', tasteRating: 4, photogenicRating: 4, typicalWaitMin: 10,
    recommended: ['Bañadas en chili y salsa de queso'], addOns: [], dietary: 'Res, lácteos' },
  { id: 'us-mels-side-salad', park: 'universal', area: 'Hollywood', day: DAY, venue: "Mel's Drive-In (Acompañantes)",
    name: 'Ensalada Pequeña', priceRange: '$6.99', tasteRating: 3, photogenicRating: 2, typicalWaitMin: 10,
    recommended: ['Opción ligera para acompañar'], addOns: [], dietary: 'Vegano — GS' },
  { id: 'us-mels-bundt-smores', park: 'universal', area: 'Hollywood', day: DAY, venue: "Mel's Drive-In (Postres)",
    name: "Bundt Cake Chocolate S'mores (Pastel bundt de chocolate estilo s'mores)", priceRange: '$9.99', tasteRating: 5, photogenicRating: 5, typicalWaitMin: 10,
    recommended: ['Bizcocho de chocolate, salsa de chocolate, malvaviscos tostados, migas de galleta graham'], addOns: [], photoTip: 'Malvaviscos tostados encima — muy fotogénico.', dietary: 'Gluten, lácteos, huevo, ajonjolí, soya, nuez (elaborado en instalación con posible contacto cruzado)' },
  { id: 'us-mels-bundt-strawberry', park: 'universal', area: 'Hollywood', day: DAY, venue: "Mel's Drive-In (Postres)",
    name: 'Bundt Cake Fresa con Crema (Pastel bundt de fresa con crema)', priceRange: '$9.99', tasteRating: 4, photogenicRating: 4, typicalWaitMin: 10,
    recommended: ['Bizcocho de vainilla, fresas, crema batida'], addOns: [], dietary: 'Vegetariano — gluten, lácteos, huevo, ajonjolí, soya, nuez' },
  { id: 'us-mels-milkshakes', park: 'universal', area: 'Hollywood', day: DAY, venue: "Mel's Drive-In (Postres)",
    name: 'Milkshakes "Sock Hoppin\'" (chocolate, vainilla o fresa) (Batidos "Sock Hoppin\'")', priceRange: '$7.99', tasteRating: 5, photogenicRating: 5, typicalWaitMin: 10,
    recommended: ['Clásicos malteados estilo años 50 — tema del restaurante'], addOns: [], photoTip: 'El ambiente retro de Mel\'s de fondo hace buena foto temática.', dietary: 'Vegetariano — lácteos (chocolate y fresa también sensibles a huevo)' },
  { id: 'us-mels-freestyle-cup', park: 'universal', area: 'Hollywood', day: DAY, venue: "Mel's Drive-In",
    name: 'Vaso Souvenir Coca-Cola Freestyle®', priceRange: '$19.99 (o $9.99 edición Grad 2026) + $12.99 día extra de refill', tasteRating: 3, photogenicRating: 3, typicalWaitMin: 5,
    recommended: ['Más de 100 combinaciones de bebida, refills todo el día (máx. 1 cada 10 min, mismo día de compra, no compartible)'], addOns: [], dietary: 'Varía según bebida elegida' },
  { id: 'us-mels-beverages', park: 'universal', area: 'Hollywood', day: DAY, venue: "Mel's Drive-In",
    name: 'Bebidas (soda individual, jugos, Powerade, leche, café)', priceRange: '$4.29-$6', tasteRating: 3, photogenicRating: 2, typicalWaitMin: 5,
    recommended: ['Vaso individual Coca-Cola Freestyle®, agua premium, jugo Minute Maid (manzana/naranja), Powerade, leche (2% o chocolate), café/té caliente'], addOns: [], dietary: 'Varía según bebida' },
  { id: 'us-mels-beer', park: 'universal', area: 'Hollywood', day: DAY, venue: "Mel's Drive-In",
    name: 'Cerveza enlatada y seltzer', priceRange: '$10.75-$13', tasteRating: 3, photogenicRating: 2, typicalWaitMin: 10,
    recommended: ['Miller Lite, Modelo, Michelob Ultra, High Noon Pineapple Seltzer'], addOns: [], dietary: 'Contiene alcohol — 21+' },
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
