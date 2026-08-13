// Live wait times via the free, public ThemeParks.wiki API (no API key needed).
// Docs: https://api.themeparks.wiki/
// We resolve park entity IDs dynamically from /destinations so we never hardcode
// possibly-stale UUIDs, then pull /entity/{id}/live and fuzzy-match ride names.

import type { ParkId } from '../types';

const API = 'https://api.themeparks.wiki/v1';

const PARK_NAME_HINTS: Record<ParkId, string[]> = {
  universal: ['universal studios florida', 'universal studios'],
  islands: ['islands of adventure'],
  epic: ['epic universe'],
  'magic-kingdom': ['magic kingdom'],
  epcot: ['epcot'],
};

interface DestinationEntity {
  id: string;
  name: string;
  children?: DestinationEntity[];
}

let destinationsCache: DestinationEntity[] | null = null;
let entityIdCache: Partial<Record<ParkId, string>> = {};
const liveCache = new Map<string, { data: any; fetchedAt: number }>();
const CACHE_MS = 5 * 60 * 1000; // 5 min

async function loadDestinations(): Promise<DestinationEntity[]> {
  if (destinationsCache) return destinationsCache;
  const res = await fetch(`${API}/destinations`);
  const json = await res.json();
  destinationsCache = json.destinations || [];
  return destinationsCache!;
}

function flattenParks(destinations: DestinationEntity[]): DestinationEntity[] {
  const parks: DestinationEntity[] = [];
  for (const dest of destinations) {
    if (dest.children) parks.push(...dest.children);
  }
  return parks;
}

async function resolveEntityId(park: ParkId): Promise<string | null> {
  if (entityIdCache[park]) return entityIdCache[park]!;
  try {
    const destinations = await loadDestinations();
    const parks = flattenParks(destinations);
    const hints = PARK_NAME_HINTS[park];
    const match = parks.find(p => hints.some(h => p.name.toLowerCase().includes(h)));
    if (match) {
      entityIdCache[park] = match.id;
      return match.id;
    }
  } catch {
    // network unavailable / API down — caller falls back to manual wait times
  }
  return null;
}

export interface LiveRideStatus {
  name: string;
  status: string; // OPERATING, DOWN, CLOSED, REFURBISHMENT
  waitMinutes: number | null;
}

export async function fetchLiveWaitTimes(park: ParkId): Promise<LiveRideStatus[] | null> {
  const entityId = await resolveEntityId(park);
  if (!entityId) return null;

  const cached = liveCache.get(entityId);
  if (cached && Date.now() - cached.fetchedAt < CACHE_MS) return cached.data;

  try {
    const res = await fetch(`${API}/entity/${entityId}/live`);
    if (!res.ok) return null;
    const json = await res.json();
    const rides: LiveRideStatus[] = (json.liveData || [])
      .filter((e: any) => e.entityType === 'ATTRACTION')
      .map((e: any) => ({
        name: e.name,
        status: e.status,
        waitMinutes: e.queue?.STANDBY?.waitTime ?? null,
      }));
    liveCache.set(entityId, { data: rides, fetchedAt: Date.now() });
    return rides;
  } catch {
    return null;
  }
}

function normalize(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

export function matchLiveWait(rides: LiveRideStatus[], attractionName: string): LiveRideStatus | null {
  const target = normalize(attractionName);
  const targetWords = target.split(' ').filter(w => w.length > 3);
  let best: LiveRideStatus | null = null;
  let bestScore = 0;
  for (const ride of rides) {
    const rideName = normalize(ride.name);
    const score = targetWords.filter(w => rideName.includes(w)).length;
    if (score > bestScore) { bestScore = score; best = ride; }
  }
  return bestScore > 0 ? best : null;
}
