import React, { useState, useEffect } from 'react';
import { appPath } from '../config/urls';
import FolhaAngolaSection from '../components/FolhaAngolaSection';
import PwaInstallPrompt from '../components/PwaInstallPrompt';
import { translations, Lang } from '../i18n/translations';

const loginUrl = appPath('/login');

interface LandingProps {
  onShowTerms?: () => void;
}

const HERO_IMAGES = [
  { src: '/loand.png', alt: 'Profissional usando SALYA' },
  { src: '/Arte_1_sem fundo.png', alt: 'SALYA em ação' },
];

// ── SVG Flag Components ────────────────────────────────────────────────────
const AngolaFlag = () => (
  <svg viewBox="0 0 640 480" className="w-6 h-4 rounded-sm shadow-sm" aria-hidden="true">
    <rect width="640" height="240" fill="#cc0000" />
    <rect y="240" width="640" height="240" fill="#000" />
    <g fill="#ffcb00" transform="translate(320,240)">
      <path d="M0-80l18.5 57h60l-48.5 35.2 18.5 57L0-5.6l-48.5 74.8 18.5-57L-78.5-23h60z" />
      <path d="M-95 10a120 120 0 0 0 190 0" fill="none" stroke="#ffcb00" strokeWidth="12" />
      <rect x="-6" y="-30" width="12" height="80" rx="3" />
    </g>
  </svg>
);

const UKFlag = () => (
  <svg viewBox="0 0 640 480" className="w-6 h-4 rounded-sm shadow-sm" aria-hidden="true">
    <rect width="640" height="480" fill="#012169" />
    <path d="M75 0l244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z" fill="#fff" />
    <path d="M424 281l216 159v40L369 281h55zm-184 20l6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z" fill="#C8102E" />
    <path d="M241 0v480h160V0H241zM0 160v160h640V160H0z" fill="#fff" />
    <path d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z" fill="#C8102E" />
  </svg>
);

// ── Language Switcher Component ────────────────────────────────────────────
const LanguageSwitcher: React.FC<{ lang: Lang; onChange: (l: Lang) => void }> = ({ lang, onChange }) => {
  return (
    <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700">
      <button
        type="button"
        onClick={() => onChange('pt')}
        title="Português"
        aria-label="Mudar para Português"
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
          lang === 'pt'
            ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-800 dark:text-white ring-1 ring-primary/30'
            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-600/50'
        }`}
      >
        <AngolaFlag />
        <span className="hidden sm:inline">PT</span>
      </button>
      <button
        type="button"
        onClick={() => onChange('en')}
        title="English"
        aria-label="Switch to English"
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
          lang === 'en'
            ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-800 dark:text-white ring-1 ring-primary/30'
            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-600/50'
        }`}
      >
        <UKFlag />
        <span className="hidden sm:inline">EN</span>
      </button>
    </div>
  );
};

// ── Main Landing Component ─────────────────────────────────────────────────
const Landing: React.FC<LandingProps> = ({ onShowTerms }) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const [billingCycle, setBillingCycle] = useState<'MENSAL' | 'ANUAL'>('MENSAL');

  // Language state — persisted in localStorage
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem('salya_lang') as Lang | null;
    return saved === 'en' ? 'en' : 'pt';
  });

  const t = translations[lang];

  const changeLang = (l: Lang) => {
    setLang(l);
    localStorage.setItem('salya_lang', l);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 font-app selection:bg-primary/10 selection:text-primary">
      <PwaInstallPrompt />

      {/* ── HEADER ─────────────────────────────────────────────────────── */}
      <header className="border-b border-slate-100 dark:border-slate-800 sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group">
            <img src="/logo.png" alt="Salya Logo" className="h-10 w-auto" />
          </a>
          <div className="flex items-center gap-4 md:gap-6">
            <nav className="hidden lg:flex items-center gap-8">
              <button type="button" onClick={() => scrollToSection('sobre')}
                className="text-sm font-semibold text-slate-500 hover:text-primary transition-colors">
                {t.nav_about}
              </button>
              <button type="button" onClick={() => scrollToSection('funcionalidades')}
                className="text-sm font-semibold text-slate-500 hover:text-primary transition-colors">
                {t.nav_features}
              </button>
              <button type="button" onClick={() => scrollToSection('voucher')}
                className="text-sm font-black text-purple-600 hover:text-purple-800 transition-colors flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base text-yellow-500">confirmation_number</span>
                {t.nav_voucher}
              </button>
            </nav>

            {/* Language Switcher */}
            <LanguageSwitcher lang={lang} onChange={changeLang} />

            <a href={loginUrl}
              className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl shadow-soft hover:shadow-lg hover:bg-primary/90 transition-all">
              {t.nav_login}
            </a>
          </div>
        </div>
      </header>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-stretch min-h-[520px] md:min-h-[620px] relative z-10 gap-8">
          <div className="flex-1 flex flex-col py-12 md:py-16 space-y-7 z-10 order-2 lg:order-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
              {t.hero_eyebrow}
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-slate-900 dark:text-white leading-[1.08] tracking-tight max-w-xl">
              <span className="text-primary">{t.hero_title_1}</span> {t.hero_title_2}
            </h2>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-lg font-medium leading-relaxed">
              {t.hero_body}
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 mt-auto">
              <a href={appPath('/registar?plan=DEMO')}
                className="px-10 py-4 bg-primary text-white text-base font-bold rounded-2xl shadow-xl shadow-primary/30 hover:scale-[1.03] hover:shadow-primary/40 hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                {t.hero_cta_primary}
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </a>
              <button type="button" onClick={() => scrollToSection('folha-angola')}
                className="px-10 py-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-white text-base font-bold rounded-2xl shadow-soft border border-slate-200/60 dark:border-slate-700 transition-all text-center">
                {t.hero_cta_secondary}
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-end relative min-h-[380px] lg:min-h-[560px] order-1 lg:order-2 w-full">
            <div className="relative w-full flex items-center justify-center min-h-[320px] lg:min-h-[500px]">
              {HERO_IMAGES.map((img, idx) => (
                <img key={img.src} src={img.src} alt={img.alt}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-0 w-auto max-w-[85%] lg:max-w-none object-contain object-bottom transition-opacity duration-1000 h-full"
                  style={{ mixBlendMode: 'multiply', opacity: idx === heroIndex ? 1 : 0, pointerEvents: idx === heroIndex ? 'auto' : 'none' }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="w-full bg-white dark:bg-slate-950">
        <div className="w-full h-6 bg-gradient-to-b from-white to-slate-50/50 dark:from-slate-950 dark:to-slate-900/30" />
        <svg className="w-full h-5 md:h-8 text-slate-50/50 dark:text-slate-900/30" preserveAspectRatio="none" viewBox="0 0 1440 54" fill="currentColor">
          <path d="M0 54V0C0 0 422 54 720 54C1018 54 1440 0 1440 0V54H0Z" />
        </svg>
      </div>

      {/* ── FOLHA ANGOLA (SIMULADOR SALARIAL) ────────────────────────── */}
      <FolhaAngolaSection lang={lang} />

      {/* ── ABOUT ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-slate-900 overflow-hidden" id="sobre">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
              {t.about_title_1} <span className="text-primary italic">{t.about_title_highlight}</span> {t.about_title_2}
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed font-medium">{t.about_body}</p>
          </div>
          <div className="flex-1 relative w-full lg:w-auto">
            <div className="size-64 bg-primary/20 rounded-full blur-[100px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div className="relative z-10 p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] shadow-2xl space-y-8">
              {[
                { img: '/processamento em lote.png', label: t.about_feat1 },
                { img: '/recibos oficiais.png', label: t.about_feat2 },
                { img: '/Dashboards de BI.png', label: t.about_feat3 },
              ].map(feat => (
                <div key={feat.label} className="flex items-center gap-5 group">
                  <div className="size-12 rounded-2xl bg-white shadow-md flex items-center justify-center group-hover:scale-110 transition-transform">
                    <img src={feat.img} alt={feat.label} className="w-6 h-6 object-contain" />
                  </div>
                  <p className="text-white font-bold tracking-tight text-lg">{feat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VIDEO SECTION ─────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white dark:bg-slate-950 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-5">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
              {t.video_title_1} <span className="text-primary">SALYA</span> {t.video_title_2}
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">{t.video_body}</p>
            <a href="https://whatsapp.com/channel/0029Vaf9xXCJkK74kDKpi80T" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#25D366] text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all">
              <img src="/WhatsApp.png" alt="WhatsApp" className="size-5 object-contain" />
              {t.video_cta}
            </a>
          </div>
          <div className="flex-1 w-full group relative">
            <div className="absolute -inset-4 bg-primary/10 rounded-[2.5rem] blur-2xl group-hover:bg-primary/20 transition-all" />
            <div onClick={() => setIsVideoModalOpen(true)}
              className="relative rounded-[2rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-slate-900 aspect-video flex items-center justify-center cursor-pointer">
              <div className="absolute inset-0 z-20 flex items-center justify-center group/btn">
                <div className="size-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover/btn:scale-110 group-hover:bg-primary transition-all">
                  <span className="material-symbols-outlined text-white text-5xl">play_circle</span>
                </div>
              </div>
              <video poster="/Arte 3.png" autoPlay muted loop playsInline preload="auto"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity">
                <source src="/mov.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* ── CAROUSEL ──────────────────────────────────────────────────── */}
      <Carousel lang={lang} />

      {/* ── FEATURES ──────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white dark:bg-slate-900" id="funcionalidades">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 space-y-3">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">{t.features_title}</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium text-base">{t.features_body}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {t.features_items.map((func, index) => (
              <div key={index}
                className="group flex flex-col justify-between p-2 bg-slate-50 dark:bg-slate-800/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 hover:border-primary/30 transition-all overflow-hidden shadow-soft hover:shadow-2xl hover:-translate-y-1">
                <div className="relative h-64 overflow-hidden rounded-[2.2rem] bg-slate-100 dark:bg-slate-900">
                  <img src={['/Colaborador.png', '/Folha de Pagamento.png', '/Recibos.jpeg', '/Relatorios.png'][index]}
                    alt={func.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                </div>
                <div className="px-6 py-6 space-y-3 flex-1 flex flex-col justify-between">
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug">{func.titulo}</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">{func.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLANS ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900/50 scroll-mt-20" id="planos">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">{t.plans_title}</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">{t.plans_subtitle}</p>
          </div>

          {/* Billing cycle toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span onClick={() => setBillingCycle('MENSAL')}
              className={`text-sm font-bold cursor-pointer transition-colors ${billingCycle === 'MENSAL' ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
              {t.plans_monthly}
            </span>
            <button type="button" onClick={() => setBillingCycle(billingCycle === 'MENSAL' ? 'ANUAL' : 'MENSAL')}
              className="relative w-14 h-8 bg-slate-200 dark:bg-slate-700 rounded-full p-1 transition-colors outline-none"
              title="Toggle billing cycle">
              <div className={`w-6 h-6 bg-emerald-500 rounded-full shadow-md transform transition-transform ${billingCycle === 'ANUAL' ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
            <span onClick={() => setBillingCycle('ANUAL')}
              className={`text-sm font-bold cursor-pointer transition-colors ${billingCycle === 'ANUAL' ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
              {t.plans_annual}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch pt-4">

            {/* Demo */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-emerald-200/60 dark:border-emerald-900/40 flex flex-col hover:border-emerald-400/40 transition-all shadow-md relative group">
              <div className="mb-6">
                <h4 className="text-2xl font-black text-slate-800 dark:text-white">{t.plan_demo_name}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">{t.plan_demo_desc}</p>
              </div>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-black text-emerald-600 dark:text-emerald-400">{t.plan_demo_price}</span>
                <span className="text-sm font-bold text-slate-400 uppercase">{t.plan_demo_period}</span>
              </div>
              <div className="border-t border-slate-100 dark:border-slate-800 pt-6 mb-8 flex-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">{t.plans_included}</p>
                <ul className="space-y-4">
                  {[t.feat_full_access, t.feat_1_entity, t.feat_2_users, t.feat_unlimited_colabs, t.feat_unlimited_receipts, t.feat_irt_inss, t.feat_decl_reports].map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                      <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
              <a href={appPath('/registar?plan=DEMO')} className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white text-center font-bold rounded-2xl transition-all shadow-lg shadow-emerald-500/20">
                {t.plan_demo_cta}
              </a>
            </div>

            {/* Micro */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800 flex flex-col hover:border-primary/20 transition-all shadow-md relative group">
              <div className="mb-6">
                <h4 className="text-2xl font-black text-slate-800 dark:text-white">{t.plan_micro_name}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">{t.plan_micro_desc}</p>
              </div>
              <div className="flex flex-col mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900 dark:text-white">{billingCycle === 'MENSAL' ? '5.700' : '68.400'}</span>
                  <span className="text-sm font-bold text-slate-400 uppercase">KZ / {billingCycle === 'MENSAL' ? t.plans_month : t.plans_year}</span>
                </div>
              </div>
              <div className="border-t border-slate-100 dark:border-slate-800 pt-6 mb-8 flex-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">{t.plans_included}</p>
                <ul className="space-y-4">
                  {[t.feat_1_entity, t.feat_1_user, t.feat_10_colabs, t.feat_unlimited_receipts, t.feat_irt_inss, t.feat_decl_reports].map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                      <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
              <a href={appPath(`/registar?plan=SEMESTRAL&cycle=${billingCycle}`)}
                className="w-full py-4 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 text-center font-bold rounded-2xl transition-all border border-slate-100 dark:border-slate-700">
                {t.plan_micro_cta}
              </a>
            </div>

            {/* Professional — RECOMMENDED */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border-2 border-primary flex flex-col relative shadow-xl z-10 lg:-translate-y-4">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-5 py-1.5 rounded-full shadow-md">
                {t.plans_recommended}
              </div>
              <div className="mb-6">
                <h4 className="text-2xl font-black text-slate-800 dark:text-white">{t.plan_pro_name}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">{t.plan_pro_desc}</p>
              </div>
              <div className="flex flex-col mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-primary">{billingCycle === 'MENSAL' ? '10.830' : '129.960'}</span>
                  <span className="text-sm font-bold text-slate-400 uppercase">KZ / {billingCycle === 'MENSAL' ? t.plans_month : t.plans_year}</span>
                </div>
              </div>
              <div className="border-t border-slate-100 dark:border-slate-800 pt-6 mb-8 flex-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">{t.plans_included}</p>
                <ul className="space-y-4">
                  {[t.feat_1_entity, t.feat_2_users, t.feat_100_colabs, t.feat_unlimited_receipts, t.feat_irt_inss, t.feat_biometry, t.feat_decl_ferias, t.feat_advanced_reports].map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                      <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
              <a href={appPath(`/registar?plan=ANUAL&cycle=${billingCycle}`)}
                className="w-full py-4 bg-primary text-white text-center font-bold rounded-2xl hover:bg-primary/95 hover:scale-[1.02] shadow-lg shadow-primary/20 transition-all block">
                {t.plan_pro_cta}
              </a>
            </div>

            {/* Corporate */}
            <div className="bg-white dark:bg-slate-900 p-7 rounded-3xl border border-slate-200/60 dark:border-slate-800 flex flex-col hover:border-primary/20 transition-all shadow-md relative group">
              <div className="mb-5">
                <h4 className="text-2xl font-black text-slate-800 dark:text-white">{t.plan_corp_name}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">{t.plan_corp_desc}</p>
              </div>
              <div className="flex items-baseline gap-1 mb-8 flex-wrap">
                <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">{t.plan_corp_price}</span>
                <span className="text-xs sm:text-sm font-bold text-slate-400 uppercase">{t.plan_corp_period}</span>
              </div>
              <div className="border-t border-slate-100 dark:border-slate-800 pt-5 mb-6 flex-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">{t.plans_included}</p>
                <ul className="space-y-3">
                  {[t.feat_plus_entity, t.feat_plus_users, t.feat_plus_colabs, t.feat_unlimited_receipts2, t.feat_irt_inss, t.feat_decl_work, t.feat_ferias, t.feat_relatorio, t.feat_sim_13, t.feat_sim_rescisao].map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                      <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
              <a href="https://wa.me/244935793270?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Plano%20Corporativo%20da%20SALYA."
                target="_blank" rel="noopener noreferrer"
                className="w-full py-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-300 text-center font-bold rounded-2xl transition-all border border-slate-200/50 dark:border-slate-700 text-sm">
                {t.plan_corp_cta}
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ── VOUCHER SALYA60D ───────────────────────────────────────────── */}
      <section id="voucher" className="py-24 px-6 bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 overflow-hidden relative">
        <div className="absolute -top-32 -right-32 size-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 size-[400px] bg-indigo-600/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/15 px-5 py-2 rounded-full">
              <span className="material-symbols-outlined text-yellow-400 text-lg">workspace_premium</span>
              <span className="text-[11px] font-black tracking-widest uppercase text-purple-200">{t.voucher_badge}</span>
            </div>
          </div>

          <div className="text-center mb-14 space-y-5">
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight">
              {t.voucher_title1}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-yellow-300"> {t.voucher_title2}</span>
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
              {t.voucher_body.split('SALYA60D').map((part, i, arr) => (
                <span key={i}>{part}{i < arr.length - 1 && <strong className="text-white">SALYA60D</strong>}</span>
              ))}
            </p>
          </div>

          {/* Ticket */}
          <div className="max-w-2xl mx-auto mb-10 sm:mb-14 px-2 sm:px-0">
            <div className="relative bg-gradient-to-r from-purple-700/80 to-indigo-800/80 backdrop-blur-xl border border-white/15 rounded-2xl sm:rounded-[2.5rem] p-5 sm:p-8 shadow-2xl overflow-hidden min-w-0 w-full">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 size-6 sm:size-8 bg-slate-950 rounded-full" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 size-6 sm:size-8 bg-slate-950 rounded-full" />
              <div className="flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6 min-w-0">
                <div className="text-center sm:text-left space-y-1.5 sm:space-y-2 min-w-0">
                  <p className="text-[10px] font-black tracking-widest text-purple-300 uppercase">{t.voucher_code_label}</p>
                  <div className="text-3xl sm:text-4xl font-black tracking-wider text-white font-mono break-all">SALYA60D</div>
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 text-purple-200 text-xs sm:text-sm font-semibold">
                    <span className="material-symbols-outlined text-sm sm:text-base shrink-0">calendar_month</span>
                    <span className="break-words">{t.voucher_code_desc}</span>
                  </div>
                </div>
                <div className="size-16 sm:size-20 rounded-2xl sm:rounded-3xl bg-white/15 backdrop-blur border border-white/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-3xl sm:text-5xl text-yellow-300">redeem</span>
                </div>
              </div>
            </div>
          </div>

          {/* Two paths */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto px-2 sm:px-0">
            <a href={appPath('/login')}
              className="group p-5 sm:p-7 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 hover:border-purple-400/40 rounded-2xl sm:rounded-[1.75rem] transition-all text-center space-y-3 sm:space-y-4 block">
              <div className="size-12 sm:size-14 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl sm:text-3xl text-purple-300">login</span>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-white mb-1">{t.voucher_has_account}</h3>
                <p className="text-xs sm:text-sm text-slate-400 font-medium">
                  {t.voucher_has_account_desc} <span className="text-purple-300 font-bold">{t.voucher_has_account_where}</span>.
                </p>
              </div>
              <div className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs sm:text-sm transition-all">
                <span>{t.voucher_login_cta}</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </div>
            </a>

            <a href={appPath('/registar?voucher=SALYA60D')}
              className="group p-5 sm:p-7 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 hover:border-yellow-400/40 rounded-2xl sm:rounded-[1.75rem] transition-all text-center space-y-3 sm:space-y-4 block">
              <div className="size-12 sm:size-14 rounded-2xl bg-yellow-500/20 border border-yellow-400/30 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl sm:text-3xl text-yellow-300">person_add</span>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-white mb-1">{t.voucher_new_account}</h3>
                <p className="text-xs sm:text-sm text-slate-400 font-medium">
                  {t.voucher_new_account_desc} <span className="text-yellow-300 font-bold">{t.voucher_new_account_when}</span> {t.voucher_new_account_where}
                </p>
              </div>
              <div className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-slate-900 font-bold rounded-xl text-xs sm:text-sm transition-all shadow-lg shadow-yellow-500/20">
                <span>{t.voucher_new_cta}</span>
                <span className="material-symbols-outlined text-base">star</span>
              </div>
            </a>
          </div>

          <p className="text-center text-[11px] sm:text-xs text-slate-500 mt-6 sm:mt-8 font-medium">{t.voucher_disclaimer}</p>
        </div>
      </section>

      {/* ── SUPPORT ───────────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/50 dark:to-slate-950">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a href="https://wa.me/244935793270?text=Ol%C3%A1!%20Preciso%20de%20ajuda%20com%20o%20SALYA."
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/20 transition-all">
              <img src="/WhatsApp.png" alt="WhatsApp" className="size-5 object-contain" />
              WhatsApp: 935 793 270
            </a>
            <a href="mailto:geral@ilungi.co.ao"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-2xl hover:border-primary/30 transition-all">
              <span className="material-symbols-outlined">mail</span>
              geral@ilungi.co.ao
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────── */}
      <footer className="py-8 px-6 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-row items-center gap-4">
            <img src="/logo.png" alt="Salya Logo" className="h-6 w-auto" />
            <p className="text-xs text-slate-500 font-medium tracking-wide">{t.footer_rights}</p>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={onShowTerms} className="text-xs text-slate-500 hover:text-primary font-medium tracking-wide transition-colors">
              {t.footer_terms}
            </button>
          </div>
        </div>
      </footer>

      {/* ── VIDEO MODAL ───────────────────────────────────────────────── */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-xl p-4 md:p-10">
          <button onClick={() => setIsVideoModalOpen(false)}
            className="absolute top-6 right-6 size-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all z-[110]">
            <span className="material-symbols-outlined">close</span>
          </button>
          <div className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black">
            <video autoPlay controls preload="auto" playsInline className="w-full h-full object-contain">
              <source src="/mov.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

// ── Carousel ──────────────────────────────────────────────────────────────
const Carousel: React.FC<{ lang: Lang }> = ({ lang }) => {
  const t = translations[lang];
  const images = [
    { src: '/Arte 1 - 1x1.jpg.jpeg', ...t.carousel_items[0] },
    { src: '/Arte 2 - 1x1b.jpg.jpeg', ...t.carousel_items[1] },
    { src: '/Arte 3.png',             ...t.carousel_items[2] },
    { src: '/Arte 4.png',             ...t.carousel_items[3] },
    { src: '/Arte 5.jpeg',            ...t.carousel_items[4] },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  return (
    <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900/30 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">{t.carousel_title}</h2>
        </div>

        <div className="relative group">
          <div className="relative overflow-hidden rounded-[3rem] shadow-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 aspect-video md:aspect-[21/9]">
            {images.map((img, idx) => (
              <div key={idx}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out flex flex-col md:flex-row items-center ${idx === activeIndex ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'}`}>
                <div className="flex-1 h-full w-full overflow-hidden bg-slate-900">
                  <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 p-8 md:p-12 space-y-6 bg-white dark:bg-slate-900 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h4 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-tight">{img.title}</h4>
                    <p className="text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{img.description}</p>
                  </div>
                  <div className="pt-4 flex items-center gap-3">
                    {images.map((_, dotIdx) => (
                      <button key={dotIdx} onClick={() => setActiveIndex(dotIdx)}
                        title={`${lang === 'pt' ? 'Ir para' : 'Go to'} ${dotIdx + 1}`}
                        aria-label={`${lang === 'pt' ? 'Ir para' : 'Go to'} ${dotIdx + 1}`}
                        className={`h-3 rounded-full transition-all cursor-pointer ${dotIdx === activeIndex ? 'bg-primary w-8' : 'bg-slate-200 dark:bg-slate-700 w-3 hover:bg-primary/50'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button onClick={() => setActiveIndex(prev => (prev - 1 + images.length) % images.length)}
            title={lang === 'pt' ? 'Slide Anterior' : 'Previous Slide'}
            aria-label={lang === 'pt' ? 'Ir para o slide anterior' : 'Go to previous slide'}
            className="absolute left-4 top-1/2 -translate-y-1/2 size-12 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-full shadow-lg border border-slate-200 dark:border-slate-700 items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-all hidden md:flex z-30 cursor-pointer">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button onClick={() => setActiveIndex(prev => (prev + 1) % images.length)}
            title={lang === 'pt' ? 'Próximo Slide' : 'Next Slide'}
            aria-label={lang === 'pt' ? 'Ir para o próximo slide' : 'Go to next slide'}
            className="absolute right-4 top-1/2 -translate-y-1/2 size-12 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-full shadow-lg border border-slate-200 dark:border-slate-700 items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-all hidden md:flex z-30 cursor-pointer">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Landing;
