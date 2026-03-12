// ============================================================
// PORTEIRO DIGITAL — Função Serverless (Vercel Edge)
// Arquivo: /api/call/[apt].js
//
// ✅ Os números dos moradores ficam APENAS aqui, no servidor.
//    O visitante NUNCA tem acesso a eles.
// ============================================================

// 🔐 CADASTRO DOS MORADORES
// Cada apartamento pode ter vários moradores.
// Formato: 55 + DDD + número (ex: 5527999998888)
const APARTMENTS = {
  "201": [
    { nome: "Morador 201-A", whatsapp: "5527900000001" },
    { nome: "Morador 201-B", whatsapp: "5527900000002" },
  ],
  "202": [
    { nome: "Morador 202-A", whatsapp: "5527900000003" },
  ],
  "301": [
    { nome: "Morador 301-A", whatsapp: "5527900000004" },
    { nome: "Morador 301-B", whatsapp: "5527900000005" },
  ],
  "302": [
    { nome: "Morador 302-A", whatsapp: "5527981630123" },
  ],
  "401": [
    { nome: "Morador 401-A", whatsapp: "5527992384699" },
    { nome: "Morador 401-B", whatsapp: "5527900000007" },
  ],
  "402": [
    { nome: "Morador 402-A", whatsapp: "5527995212421" },
  ],
};

export default function handler(req, res) {
  const { via = "whatsapp" } = req.query;

  // Extrai o apartamento e o índice do morador da URL: /api/call/401/0
  const parts = req.url.split("?")[0].split("/").filter(Boolean);
  // parts: ["api", "call", "401", "0"]
  const apt = parts[2];
  const idx = parseInt(parts[3] ?? "0", 10);

  const residents = APARTMENTS[apt];
  if (!residents || residents.length === 0) {
    return res.status(404).json({ error: "Apartamento não encontrado.", apt });
  }

  const resident = residents[idx];
  if (!resident) {
    return res.status(404).json({ error: "Morador não encontrado.", apt, idx });
  }

  let destination;
  if (via === "whatsapp") {
    destination = `https://wa.me/${resident.whatsapp}`;
  } else if (via === "tel") {
    destination = `tel:+${resident.whatsapp}`;
  } else {
    return res.status(400).json({ error: "Canal inválido." });
  }

  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Referrer-Policy", "no-referrer");
  return res.redirect(302, destination);
}
