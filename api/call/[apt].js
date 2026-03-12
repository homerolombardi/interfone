// ============================================================
// PORTEIRO DIGITAL — Função Serverless (Vercel Edge)
// Arquivo: /api/call/[apt].js
//
// ✅ Os números dos moradores ficam APENAS aqui, no servidor.
//    O visitante NUNCA tem acesso a eles.
// ============================================================

// 🔐 CADASTRO DOS MORADORES
// Substitua pelos números reais no formato: 55 + DDD + número
// Exemplo: 5527999998888  (Brasil, ES, número com 9 dígitos)
export default function handler(req, res) {
  const { apt, via = "whatsapp" } = req.query;

  const debug = {
    apt,
    via,
    query: req.query,
    url: req.url,
  };

  const APARTMENTS = {
    "201": { whatsapp: "5527900000001" },
    "202": { whatsapp: "5527900000002" },
    "301": { whatsapp: "5527900000003" },
    "302": { whatsapp: "5527981630123" },
    "401": { whatsapp: "5527992384699" },
    "402": { whatsapp: "5527995212421" },
  };

  const resident = APARTMENTS[apt];
  if (!resident) {
    return res.status(404).json({ error: "Apartamento não encontrado.", debug });
  }

  let destination;
  if (via === "whatsapp") {
    destination = `https://wa.me/${resident.whatsapp}`;
  } else if (via === "tel") {
    destination = `tel:+${resident.whatsapp}`;
  } else {
    return res.status(400).json({ error: "Canal inválido.", debug });
  }

  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Referrer-Policy", "no-referrer");
  return res.redirect(302, destination);
}
