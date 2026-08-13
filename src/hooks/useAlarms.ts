import { useEffect } from 'react';
import { db } from '../lib/db';

let audioCtx: AudioContext | null = null;

function beep() {
  try {
    audioCtx ||= new (window.AudioContext || (window as any).webkitAudioContext)();
    const ctx = audioCtx;
    const now = ctx.currentTime;
    [0, 0.35, 0.7].forEach(offset => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.0001, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.3, now + offset + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.3);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now + offset);
      osc.stop(now + offset + 0.3);
    });
  } catch {
    // Web Audio unavailable — silently skip the beep, notification still fires
  }
}

/** Polls reservations every 15s while the app is open and fires a sound + system
 * notification the moment one is due. Real "background" alarms (app closed) would
 * need push notifications from a server — this covers the app-open case. */
export function useAlarms() {
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    const check = () => {
      const now = Date.now();
      const fired = db.getFiredAlarms();
      db.getReservations().forEach(r => {
        if (fired.includes(r.id)) return;
        const due = new Date(r.dateTime).getTime();
        if (due <= now && now - due < 5 * 60_000) {
          db.markAlarmFired(r.id);
          beep();
          const body = [r.description, r.who.length ? `Con: ${r.who.join(', ')}` : ''].filter(Boolean).join(' — ');
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(`⏰ ${r.name}`, { body: body || '¡Es la hora!' });
          }
        }
      });
    };

    check();
    const interval = setInterval(check, 15_000);
    return () => clearInterval(interval);
  }, []);
}
