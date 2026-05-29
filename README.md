# Salya Landing

Site institucional da SALYA (folha de pagamento). Deploy em **salya.ao**.

A aplicação (login e dashboard) está no repositório [SALYA](https://github.com/tIILUNGI/SALYA) — **app.salya.ao**.

## Desenvolvimento

```bash
npm install
npm run dev
```

Abre http://localhost:5173

Em desenvolvimento, os botões apontam para a app em `http://localhost:3000` (ver `.env.development`).

## Produção

```bash
npm run build
```

Publicar a pasta `dist/` no domínio **salya.ao**.

Variável opcional em produção:

```
VITE_APP_URL=https://app.salya.ao
```
