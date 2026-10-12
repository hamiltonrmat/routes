// Proxy TomTom (fonction Vercel) : ajoute la clé TOMTOM_KEY côté serveur.
// Seules les routes utilisées par index.html sont autorisées.
const ALLOWED = [
  /^traffic\/map\/4\/tile\/flow\/relative\/\d{1,2}\/\d+\/\d+\.png$/,
  /^traffic\/map\/4\/tile\/incidents\/s2\/\d{1,2}\/\d+\/\d+\.png$/,
  /^traffic\/services\/5\/incidentDetails$/,
];

module.exports = async (req, res) => {
  const key = process.env.TOMTOM_KEY;
  if (!key) return res.status(500).json({ error: "Variable d'environnement TOMTOM_KEY manquante" });

  const { path = "", ...params } = req.query;
  if (!ALLOWED.some((r) => r.test(path))) return res.status(400).json({ error: "Chemin non autorisé" });

  try {
    const qs = new URLSearchParams({ ...params, key });
    const upstream = await fetch(`https://api.tomtom.com/${path}?${qs}`);
    const isTile = path.endsWith(".png");
    res.status(upstream.status);
    res.setHeader("Content-Type", upstream.headers.get("content-type") || "application/octet-stream");
    // Cache CDN Vercel : limite le nombre d'appels TomTom (quota gratuit)
    res.setHeader("Cache-Control", isTile ? "public, s-maxage=120, stale-while-revalidate=60" : "public, s-maxage=60");
    res.send(Buffer.from(await upstream.arrayBuffer()));
  } catch (e) {
    res.status(502).json({ error: "Erreur TomTom" });
  }
};
