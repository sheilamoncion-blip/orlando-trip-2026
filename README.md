# Orlando Trip 2026 — Planificador Familiar

PWA para el viaje de la familia a Universal + Disney, 22–30 de agosto de 2026.
21 adultos, cumpleaños de Carlos Manuel (23 ago, 45 años) y Sheila (25 ago, 37 años).

## Qué funciona ya (sin ninguna cuenta externa)

- Dashboard con cuenta regresiva, alertas de cumpleaños, checklist diario
- Itinerario completo de los 4 días de parque + 5 días libres
- Detalle de cada día: atracciones, comidas, shows, personajes — con calificaciones, notas y comentarios
- Reto "Eat & Drink Around the World" de Epcot — 11 países, progreso y gasto
- Ideas de TikTok con checklist (filmado/editado/publicado)
- Tablero de inspiración (fotos de referencia + fotos propias)
- Tienda de personalización Disney con los regalos de cumpleaños
- Mapa con OpenStreetMap (gratis, sin cuenta de Google Cloud)
- Tiempos de espera en vivo vía la API pública de ThemeParks.wiki (sin API key)
- PWA instalable, funciona offline (service worker cachea la app)

Todo se guarda en `localStorage` — cada persona ve **su propio dispositivo**, hasta que conectes Supabase (ver abajo).

## Lo que necesitas hacer tú (no lo puedo hacer por ti)

### 1. Clima en vivo (opcional, gratis)
1. Crea una cuenta gratis en https://openweathermap.org/api
2. Copia tu API key
3. Crea un archivo `.env` en la raíz del proyecto (copia `.env.example`) y pon:
   ```
   VITE_OPENWEATHERMAP_KEY=tu_key_aqui
   ```
4. Reinicia `npm run dev`

Sin esto, la pantalla de Alertas simplemente no muestra clima en vivo — todo lo demás funciona igual.

### 2. Sincronización en tiempo real entre los 20 (Fase 2, opcional)
Ahora mismo los comentarios y el checklist son locales a cada teléfono. Para que sean compartidos en vivo entre toda la familia:
1. Crea una cuenta gratis en https://supabase.com
2. Crea un proyecto nuevo (tier gratis alcanza de sobra para esto)
3. Pásame la **Project URL** y la **anon public key** (Settings → API)
4. Con eso conecto `lib/db.ts` a Supabase Realtime en vez de localStorage

### 3. Ubicación en vivo de los 20 familiares
Requiere el mismo backend de Supabase del punto anterior (cada teléfono comparte su posición GPS a un canal en tiempo real, con su propio consentimiento). Por ahora, la pantalla de Familia tiene un "compartir mi estado" manual (texto) como alternativa sin backend.

## Correr localmente

```bash
npm install
npm run dev
```

## Desplegar (gratis) para compartir el link con la familia

1. Sube este proyecto a un repo de GitHub (`git init`, `git add .`, `git commit`, crea el repo en GitHub, `git push`)
2. Ve a https://vercel.com, crea una cuenta gratis (con tu GitHub)
3. "Add New Project" → selecciona el repo → Vercel detecta Vite automáticamente → Deploy
4. Si configuraste el clima, agrega `VITE_OPENWEATHERMAP_KEY` en Vercel → Project Settings → Environment Variables
5. Te da un link tipo `orlando-trip-2026.vercel.app` — ese es el que compartes por WhatsApp
6. Para el código QR: pega el link en https://www.qr-code-generator.com (gratis) y descarga la imagen

Cada vez que hagas `git push`, Vercel vuelve a desplegar automáticamente.

## Estructura

- `src/data/trip.ts` — toda la información de atracciones, comidas, shows, personajes, países de Epcot, ideas de TikTok, tienda y cumpleaños
- `src/lib/db.ts` — persistencia local (comentarios, checklist, notas)
- `src/lib/weather.ts`, `src/lib/waitTimes.ts` — APIs externas
- `src/screens/` — una pantalla por sección de la app
