import { TRIP_DAYS } from '../data/trip';
import type { TripDay } from '../types';

export function getTripDay(dateKey: string): TripDay | null {
  return TRIP_DAYS.find(d => d.date === dateKey) || null;
}

export function getNextParkDay(fromDateKey: string): TripDay | null {
  return TRIP_DAYS.find(d => d.date >= fromDateKey && d.park) || null;
}

export function getNextDay(fromDateKey: string): TripDay | null {
  return TRIP_DAYS.find(d => d.date >= fromDateKey) || null;
}

export function isBeforeTrip(dateKey: string): boolean {
  return dateKey < TRIP_DAYS[0].date;
}

export function isAfterTrip(dateKey: string): boolean {
  return dateKey > TRIP_DAYS[TRIP_DAYS.length - 1].date;
}
