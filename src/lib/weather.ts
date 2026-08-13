// Weather via OpenWeatherMap free tier. Requires the user's own free API key:
// 1. Sign up at https://openweathermap.org/api (free)
// 2. Create a .env file at the project root with:
//      VITE_OPENWEATHERMAP_KEY=your_key_here
// 3. Restart `npm run dev`
// Without a key, screens fall back to manual weather entry (see db.getManualWeather).

const ORLANDO_LAT = 28.3852;
const ORLANDO_LON = -81.5639;

export interface WeatherNow {
  tempC: number;
  feelsLikeC: number;
  condition: string;
  description: string;
  rainChance: number | null;
  windKph: number;
  isConfigured: true;
}

let cache: { data: WeatherNow; fetchedAt: number } | null = null;
const CACHE_MS = 10 * 60 * 1000; // 10 min

export function isWeatherConfigured(): boolean {
  return Boolean(import.meta.env.VITE_OPENWEATHERMAP_KEY);
}

export async function fetchOrlandoWeather(): Promise<WeatherNow | null> {
  const key = import.meta.env.VITE_OPENWEATHERMAP_KEY as string | undefined;
  if (!key) return null;

  if (cache && Date.now() - cache.fetchedAt < CACHE_MS) return cache.data;

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${ORLANDO_LAT}&lon=${ORLANDO_LON}&appid=${key}&units=metric&lang=es`
    );
    if (!res.ok) return null;
    const json = await res.json();
    const data: WeatherNow = {
      tempC: Math.round(json.main.temp),
      feelsLikeC: Math.round(json.main.feels_like),
      condition: json.weather?.[0]?.main || 'Desconocido',
      description: json.weather?.[0]?.description || '',
      rainChance: json.rain ? Math.round((json.rain['1h'] || 0) * 10) : null,
      windKph: Math.round((json.wind?.speed || 0) * 3.6),
      isConfigured: true,
    };
    cache = { data, fetchedAt: Date.now() };
    return data;
  } catch {
    return null;
  }
}

export function heatAdvisory(tempC: number): string | null {
  if (tempC >= 32) return `Advertencia de calor (${tempC}°C). Toma agua seguido y usa protector solar.`;
  return null;
}

export function rainAdvisory(condition: string): string | null {
  const rainy = ['Rain', 'Thunderstorm', 'Drizzle'];
  if (rainy.includes(condition)) return 'Puede llover pronto — mejor buscar atracciones bajo techo.';
  return null;
}
