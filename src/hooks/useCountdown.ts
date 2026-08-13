import { useEffect, useState } from 'react';

export function useNow(intervalMs = 60_000): Date {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}

export function useCountdown(targetDateIso: string) {
  const now = useNow(1000 * 30);
  const target = new Date(`${targetDateIso}T00:00:00`);
  const diffMs = target.getTime() - now.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const started = diffMs <= 0;
  return { days: Math.max(days, 0), hours: Math.max(hours, 0), started };
}

export function todayKey(date: Date = new Date()): string {
  return date.toISOString().split('T')[0];
}
