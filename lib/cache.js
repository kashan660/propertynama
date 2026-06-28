/**
 * Tiny in-memory TTL cache for the public read paths. Cuts repeated queries
 * to a remote database (e.g. Hostinger MySQL) where each round-trip is costly.
 *
 * Scope is a single process: on serverless it lives per warm instance and the
 * TTL bounds staleness across instances; admin writes call clear() so edits
 * show immediately on the instance that served them.
 */
const store = new Map(); // key -> { exp, val }

async function cached(key, ttlMs, fn) {
  const hit = store.get(key);
  const now = Date.now();
  if (hit && hit.exp > now) return hit.val;
  const val = await fn();
  store.set(key, { exp: now + ttlMs, val });
  return val;
}

function clear() {
  store.clear();
}

module.exports = { cached, clear };
