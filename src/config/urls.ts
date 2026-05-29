/** URL da aplicação (login, registo, dashboard) — app.salya.ao em produção */
export const APP_URL = (import.meta.env.VITE_APP_URL || 'https://app.salya.ao').replace(/\/$/, '');

export const appPath = (path: string) => `${APP_URL}${path.startsWith('/') ? path : `/${path}`}`;
