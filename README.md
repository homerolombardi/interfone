# 🏢 Porteiro Digital — DoorVi para seu prédio

Sistema de portaria digital com **privacidade total dos moradores**.
Os números de WhatsApp nunca são expostos ao visitante.

---

## 🗂️ Estrutura do projeto

```
doorvi/
├── api/
│   └── call/
│       └── [apt].js       ← Função serverless (números ficam aqui, seguros)
├── public/
│   └── index.html         ← Página do visitante (sem nenhum número)
├── vercel.json            ← Configuração do Vercel
└── README.md
```

---

## ⚙️ Configuração dos moradores

Abra o arquivo `api/call/[apt].js` e edite o objeto `APARTMENTS`:

```js
const APARTMENTS = {
  "201": { whatsapp: "5527900000001" },  // 55 + DDD + número
  "202": { whatsapp: "5527900000002" },
  "301": { whatsapp: "5527900000003" },
  "302": { whatsapp: "5527900000004" },
  "401": { whatsapp: "5527900000005" },
  "402": { whatsapp: "5527900000006" },
};
```

> **Formato:** `55` (Brasil) + DDD (2 dígitos) + número com 9 dígitos  
> **Exemplo:** Vitória-ES, (27) 99999-8888 → `5527999998888`

---

## 🚀 Deploy no Vercel (gratuito)

### Opção A — Via GitHub (recomendado)

1. Crie uma conta gratuita em [vercel.com](https://vercel.com)
2. Suba este projeto para um repositório no GitHub
3. No Vercel: **Add New Project** → selecione o repositório
4. Clique em **Deploy** — pronto!

### Opção B — Via CLI

```bash
npm install -g vercel
cd doorvi/
vercel
```

Siga as instruções no terminal. Em ~1 minuto você terá uma URL como:
`https://seu-predio.vercel.app`

---

## 📱 Gerar o QR Code

Acesse qualquer gerador gratuito, como [qr-code-generator.com](https://qr-code-generator.com), e aponte para a URL do seu projeto.

Imprima e cole na entrada do prédio.

---

## 🔒 Como a privacidade funciona

```
Visitante clica "Apto 401"
        ↓
Browser acessa: /api/call/401?via=whatsapp
        ↓
Servidor busca o número (nunca enviado ao browser)
        ↓
Servidor faz redirect 302 → wa.me/5527...
        ↓
WhatsApp abre no celular do visitante
```

O número **nunca aparece** no HTML, no JavaScript do cliente,
no histórico do navegador ou nas ferramentas de desenvolvedor.

---

## ✏️ Personalização

- **Nome do prédio:** edite a tag `<div class="building-name">` no `index.html`
- **Adicionar apartamentos:** adicione no objeto `APARTMENTS` no `[apt].js`
  e adicione o card correspondente no `index.html`
- **Cor de destaque:** altere a variável `--accent` no CSS do `index.html`
