// Epcot — Aug 29, 2026 (coincide con el Festival de Comida y Vino, 27 ago-21 nov 2026)
// World Showcase ya está cubierto por el reto "Eat & Drink Around the World" (ver COUNTRIES en trip.ts) —
// aquí van las otras 3 neighborhoods: World Celebration, World Discovery, World Nature,
// más las 2 atracciones destacadas dentro de World Showcase (Remy y Frozen).
import type { Attraction, Meal, AreaGuide, HourlyWait } from '../types';

const DAY = '2026-08-29';

function hw(entries: [string, number, number, string?][]): HourlyWait[] {
  return entries.map(([time, minMin, maxMin, note]) => ({ time, minMin, maxMin, note }));
}

// ───────────────────────── WORLD CELEBRATION (hub central) ─────────────────────────

export const CELEBRATION_ATTRACTIONS: Attraction[] = [
  {
    id: 'ep-spaceship-earth', park: 'epcot', area: 'World Celebration', day: DAY,
    name: 'Spaceship Earth', durationMin: 16, typicalWaitMin: 20, heightMinIn: null, intensity: 1,
    photoTip: 'La esfera geodésica es EL ícono de Epcot — mejor foto de noche con las luces encendidas.',
    referenceLinks: [], nearbyCharacters: [],
    bestTime: '11:00 AM-1:00 PM o después de las 7 PM (fila baja porque la gente prioriza los thrill rides)',
    hourlyWait: hw([['11:00 AM', 15, 25], ['1:00 PM', 10, 20], ['4:00 PM', 20, 30], ['8:00 PM', 15, 25]]),
    guide: 'Recorrido lento por la historia de la comunicación humana — ritmo tranquilo, buen descanso con aire acondicionado.',
  },
];

export const CELEBRATION_AREA_GUIDE: AreaGuide = {
  id: 'area-world-celebration', park: 'epcot', name: 'World Celebration', emoji: '🌐',
  bestFor: 'Punto de encuentro central — la esfera es la referencia de todo el parque', walkFrom: 'Entrada principal de Epcot',
  guide: `Spaceship Earth (la esfera) es el ícono del parque y buen punto de encuentro para el grupo de 21. Fila más baja al mediodía porque casi todos están en World Discovery esa hora.`,
};

// ───────────────────────── WORLD DISCOVERY ─────────────────────────

export const DISCOVERY_ATTRACTIONS: Attraction[] = [
  {
    id: 'ep-guardians-cosmic-rewind', park: 'epcot', area: 'World Discovery', day: DAY,
    name: 'Guardians of the Galaxy: Cosmic Rewind', durationMin: 3, typicalWaitMin: 70, heightMinIn: 42, intensity: 4,
    photoTip: 'El pabellón Wonders of Xandar es espectacular por fuera — foto antes de entrar.',
    referenceLinks: [], nearbyCharacters: [],
    bestTime: 'Al abrir el parque (rope drop) o vía Virtual Queue en la app apenas abra',
    hourlyWait: hw([['9:00 AM', 30, 50, 'Usa Virtual Queue en la app'], ['11:00 AM', 70, 110], ['1:00 PM', 90, 140, 'Pico — la más popular del parque'], ['4:00 PM', 60, 95], ['7:00 PM', 35, 60]]),
    guide: 'El primer roller coaster "backwards launch" de Disney — vehículo gira 360° libremente. Usualmente requiere Virtual Queue (se une desde la app apenas abre el parque) en vez de fila física.',
  },
  {
    id: 'ep-test-track', park: 'epcot', area: 'World Discovery', day: DAY,
    name: 'Test Track', durationMin: 5, typicalWaitMin: 55, heightMinIn: 40, intensity: 4,
    photoTip: 'Diseña tu propio auto virtual antes de subir — foto de la pantalla de diseño.',
    referenceLinks: [], nearbyCharacters: [],
    bestTime: '9:00-9:30 AM (apertura)',
    hourlyWait: hw([['9:00 AM', 20, 40], ['11:00 AM', 55, 85], ['1:00 PM', 70, 110, 'Pico'], ['4:00 PM', 50, 80], ['7:00 PM', 30, 55]]),
    guide: 'Simulador de pruebas de manejo a alta velocidad al aire libre — la parte final es la más rápida del recorrido.',
  },
  {
    id: 'ep-mission-space', park: 'epcot', area: 'World Discovery', day: DAY,
    name: 'Mission: SPACE', durationMin: 5, typicalWaitMin: 35, heightMinIn: 44, intensity: 4,
    photoTip: 'Fachada del cohete/planeta — buen fondo fotográfico.', referenceLinks: [], nearbyCharacters: [],
    bestTime: 'Elige la versión "Green" (menos intensa, sin simulación de gravedad) si alguien es sensible al mareo',
    hourlyWait: hw([['10:00 AM', 15, 30], ['1:00 PM', 30, 50], ['5:00 PM', 20, 35]]),
    guide: 'Tiene 2 versiones: "Orange" (intensa, simula fuerza G) y "Green" (suave, sin giro). Pregunta cuál te asignan antes de subir.',
  },
];

export const DISCOVERY_AREA_GUIDE: AreaGuide = {
  id: 'area-world-discovery', park: 'epcot', name: 'World Discovery', emoji: '🚀',
  bestFor: 'Buscadores de emociones — las 3 atracciones más intensas del parque', walkFrom: 'A la derecha de World Celebration',
  guide: `Aquí están los 3 "thrill rides" de Epcot. PRIORIDAD: unirse a la Virtual Queue de Guardians of the Galaxy desde la app apenas abra el parque (usualmente se agota en minutos) — sin eso, es muy difícil montarla. Luego Test Track temprano, Mission: SPACE cuando se pueda.`,
};

// ───────────────────────── WORLD NATURE ─────────────────────────

export const NATURE_ATTRACTIONS: Attraction[] = [
  {
    id: 'ep-soarin', park: 'epcot', area: 'World Nature', day: DAY,
    name: "Soarin' Around the World", durationMin: 5, typicalWaitMin: 45, heightMinIn: 40, intensity: 2,
    photoTip: 'El vuelo simulado sobre paisajes icónicos — no hay foto durante, pero el preshow del globo es buen fondo.',
    referenceLinks: [], nearbyCharacters: [],
    bestTime: '9:00-10:00 AM o después de 6 PM',
    hourlyWait: hw([['9:00 AM', 20, 35], ['12:00 PM', 45, 70], ['2:00 PM', 55, 85, 'Pico'], ['5:00 PM', 35, 55], ['7:00 PM', 20, 35]]),
    guide: 'Vuelo simulado suave con brisa y aromas sincronizados — apto para casi toda la familia, poca intensidad física.',
  },
  {
    id: 'ep-journey-of-water', park: 'epcot', area: 'World Nature', day: DAY,
    name: 'Journey of Water, Inspired by Moana', durationMin: 10, typicalWaitMin: 15, heightMinIn: null, intensity: 1,
    photoTip: 'Los efectos de agua interactivos son muy fotogénicos — puedes mojarte un poco.', referenceLinks: [], nearbyCharacters: ['Moana'],
    bestTime: 'Cualquier hora — sendero interactivo, no hay fila tradicional de atracción',
    hourlyWait: hw([['12:00 PM', 5, 15], ['3:00 PM', 10, 20]]),
    guide: 'Sendero interactivo al aire libre (no es una atracción de vehículo) — refrescante en el calor de agosto.',
  },
];

export const NATURE_MEALS: Meal[] = [
  {
    id: 'ep-sunshine-seasons', park: 'epcot', area: 'World Nature', day: DAY,
    name: 'Sunshine Seasons (The Land)', priceRange: '$12-18', tasteRating: 4, photogenicRating: 3, typicalWaitMin: 15,
    recommended: ['Estaciones variadas: asiático, parrilla, panadería'], addOns: [],
    photoTip: 'Buena opción rápida y variada para grupo grande con gustos distintos.',
  },
];

export const NATURE_AREA_GUIDE: AreaGuide = {
  id: 'area-world-nature', park: 'epcot', name: 'World Nature', emoji: '🌱',
  bestFor: 'Familias, ritmo relajado, buena opción con calor extremo', walkFrom: 'A la izquierda de World Celebration',
  guide: `Soarin' es el imprescindible — suave y apto para casi todos. Journey of Water es un buen refresco a media tarde con el calor de agosto. The Seas with Nemo & Friends (acuario) también está aquí si el grupo quiere un descanso tranquilo.`,
};

// ───────────────────────── WORLD SHOWCASE — ATRACCIONES (además del reto de comida) ─────────────────────────

export const SHOWCASE_ATTRACTIONS: Attraction[] = [
  {
    id: 'ep-remy-ratatouille', park: 'epcot', area: 'World Showcase — Francia', day: DAY,
    name: "Remy's Ratatouille Adventure", durationMin: 5, typicalWaitMin: 45, heightMinIn: null, intensity: 2,
    photoTip: 'Te "encoges" al tamaño de una rata — buen video de reacción a la escala gigante de la cocina.',
    referenceLinks: [], nearbyCharacters: ['Remy'],
    bestTime: '11:00 AM-12:00 PM o después de 7 PM',
    hourlyWait: hw([['11:00 AM', 25, 40], ['1:00 PM', 45, 70, 'Pico'], ['4:00 PM', 35, 55], ['7:00 PM', 20, 35]]),
    guide: 'Dark ride familiar en pabellón de Francia, sin altura mínima — con lentes 3D y efectos de escala.',
  },
  {
    id: 'ep-frozen-ever-after', park: 'epcot', area: 'World Showcase — Noruega', day: DAY,
    name: 'Frozen Ever After', durationMin: 5, typicalWaitMin: 55, heightMinIn: null, intensity: 2,
    photoTip: 'El castillo de hielo de Arendelle al final del recorrido — muy fotogénico.', referenceLinks: [], nearbyCharacters: ['Anna', 'Elsa'],
    bestTime: '11:00 AM (justo al abrir World Showcase) o después de 7 PM',
    hourlyWait: hw([['11:00 AM', 30, 50], ['1:00 PM', 55, 85, 'Pico'], ['4:00 PM', 45, 65], ['7:00 PM', 25, 45]]),
    guide: 'Reabrió en 2026 con animatrónicos actualizados de Anna, Elsa y Kristoff — muy popular con niños, fila constante todo el día.',
  },
];

export const SHOWCASE_AREA_GUIDE: AreaGuide = {
  id: 'area-world-showcase-rides', park: 'epcot', name: 'World Showcase — Atracciones', emoji: '🎠',
  bestFor: 'Complemento al reto de comida — 2 dark rides familiares dentro de Francia y Noruega', walkFrom: 'Dentro de los pabellones de Francia y Noruega',
  guide: `World Showcase abre a las 11 AM (más tarde que el resto del parque) — aprovecha la mañana en World Discovery/Nature y llega a World Showcase justo a esa hora para Remy y Frozen antes de que suba la fila.
Nota: la comida y bebida de los 11 países está en la pestaña "Epcot" del menú inferior (reto Eat & Drink Around the World).`,
};

// ───────────────────────── EXPORT: ALL COMBINED ─────────────────────────

export const EPCOT_ATTRACTIONS: Attraction[] = [
  ...CELEBRATION_ATTRACTIONS, ...DISCOVERY_ATTRACTIONS, ...NATURE_ATTRACTIONS, ...SHOWCASE_ATTRACTIONS,
];

export const EPCOT_EXTRA_MEALS: Meal[] = [...NATURE_MEALS];

export const EPCOT_AREA_GUIDES: AreaGuide[] = [
  CELEBRATION_AREA_GUIDE, DISCOVERY_AREA_GUIDE, NATURE_AREA_GUIDE, SHOWCASE_AREA_GUIDE,
];
