const g = globalThis;
if (!g.__PF_HEAT__) {
  g.__PF_HEAT__ = { events: [], byPath: Object.create(null), byId: Object.create(null) };
}
function bump(map, key, n) {
  if (!key) return;
  map[key] = (map[key] || 0) + (n || 1);
}
function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Cache-Control", "no-store");
}
module.exports = async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") { res.statusCode = 204; return res.end(); }
  const store = g.__PF_HEAT__;
  if (req.method === "GET") {
    const heats = Object.entries(store.byId)
      .map(([id, heat_count]) => ({ id, heat_count, priority_weight: Math.min(10, 1 + Math.log10(1 + heat_count) * 3) }))
      .sort((a, b) => b.heat_count - a.heat_count).slice(0, 50);
    const paths = Object.entries(store.byPath)
      .map(([path, heat_count]) => ({ path, heat_count }))
      .sort((a, b) => b.heat_count - a.heat_count).slice(0, 50);
    res.setHeader("content-type", "application/json");
    return res.end(JSON.stringify({ ok: true, total_events: store.events.length, heats, paths, note: "ephemeral until KV wired" }));
  }
  if (req.method !== "POST") { res.statusCode = 405; return res.end("method"); }
  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch { body = {}; } }
  if (!body || typeof body !== "object") body = {};
  const kind = String(body.kind || "unknown").slice(0, 32);
  const path = String(body.path || "/").slice(0, 200);
  const id = String(body.id || kind).slice(0, 64);
  store.events.push({ t: Number(body.t) || Date.now(), sid: String(body.sid || "").slice(0, 64), kind, path, id, x: typeof body.x === "number" ? Math.round(body.x) : null, y: typeof body.y === "number" ? Math.round(body.y) : null });
  if (store.events.length > 5000) store.events.splice(0, store.events.length - 5000);
  bump(store.byPath, path, 1); bump(store.byId, id, 1); bump(store.byId, "kind:" + kind, 1);
  res.setHeader("content-type", "application/json"); res.statusCode = 202; return res.end(JSON.stringify({ ok: true }));
};
