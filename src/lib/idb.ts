/** Minimal IndexedDB key-value wrapper, used for photo/image data that's too big for
 * localStorage's ~5-10MB quota. IndexedDB quota is tied to available disk space (typically
 * hundreds of MB to several GB), so this is the permanent fix for "se quedó sin espacio"
 * errors on photo uploads. Falls back to migrating any existing localStorage value for the
 * same key the first time it's read, then removes it from localStorage to free that quota. */

const DB_NAME = 'otp_media_db';
const STORE = 'kv';
let dbPromise: Promise<IDBDatabase> | null = null;

function openDB(): Promise<IDBDatabase> {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = () => { req.result.createObjectStore(STORE); };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }
  return dbPromise;
}

async function idbGetRaw<T>(key: string): Promise<T | undefined> {
  const db = await openDB();
  return new Promise((resolve) => {
    const req = db.transaction(STORE, 'readonly').objectStore(STORE).get(key);
    req.onsuccess = () => resolve(req.result as T | undefined);
    req.onerror = () => resolve(undefined);
  });
}

export async function idbSet(key: string, value: unknown): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).put(value, key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function idbGet<T>(key: string, fallback: T): Promise<T> {
  try {
    const existing = await idbGetRaw<T>(key);
    if (existing !== undefined) return existing;
    const raw = localStorage.getItem(key);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as T;
        await idbSet(key, parsed);
        localStorage.removeItem(key);
        return parsed;
      } catch { /* corrupt legacy value, ignore */ }
    }
    return fallback;
  } catch {
    return fallback;
  }
}

/** Enumerates every key/value currently in IndexedDB — used for full data export/backup. */
export async function idbGetAllEntries(): Promise<Record<string, unknown>> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const store = db.transaction(STORE, 'readonly').objectStore(STORE);
      const keysReq = store.getAllKeys();
      const valuesReq = store.getAll();
      let keys: IDBValidKey[] = [];
      let values: unknown[] = [];
      let done = 0;
      const finish = () => {
        done++;
        if (done === 2) {
          const out: Record<string, unknown> = {};
          keys.forEach((k, i) => { out[String(k)] = values[i]; });
          resolve(out);
        }
      };
      keysReq.onsuccess = () => { keys = keysReq.result; finish(); };
      keysReq.onerror = () => finish();
      valuesReq.onsuccess = () => { values = valuesReq.result; finish(); };
      valuesReq.onerror = () => finish();
    });
  } catch {
    return {};
  }
}

export async function idbClearAll(): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).clear();
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch { /* noop */ }
}
