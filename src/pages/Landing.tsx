import React, { useState, useEffect } from 'react';
import { appPath } from '../config/urls';
import FolhaAngolaSection from '../components/FolhaAngolaSection';

const loginUrl = appPath('/login');

interface LandingProps {
  onShowTerms?: () => void;
}

const HERO_IMAGES = [
  { src: '/loand.png', alt: 'Profissional usando SALYA' },
  { src: '/Arte_1_sem fundo.png', alt: 'SALYA em ação' },
];

const Landing: React.FC<LandingProps> = ({ onShowTerms }) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const [billingCycle, setBillingCycle] = useState<'MENSAL' | 'ANUAL'>('MENSAL');

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const funcionalidades = [
    {
      titulo: 'Gestão de Colaboradores',
      descricao:
        'Controle completo sobre dados pessoais, contratuais e histórico profissional da sua equipa em um ambiente centralizado.',
      imagem: '/Colaborador.png',
    },
    {
      titulo: 'Folha de Pagamento Profissional',
      descricao:
        'Cálculos automatizados de IRT e INSS em conformidade total com a legislação angolana e o Decreto Presidencial.',
      imagem: '/Processamento.png',
    },
    {
      titulo: 'Geração de Recibos em PDF',
      descricao:
        'Emita recibos de vencimento detalhados e profissionais com apenas um clique, prontos para partilha digital segura.',
      imagem: '/Recibos .jpeg',
    },
    {
      titulo: 'Relatórios & Business Intelligence',
      descricao:
        'Aceda a métricas precisas sobre a sua folha de pagamento e exporte relatórios mensais fundamentais para a sua gestão.',
      imagem: '/Relatorios.png',
    },
  ];

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 font-app selection:bg-primary/10 selection:text-primary">
      <header className="border-b border-slate-100 dark:border-slate-800 sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group">
            <img src="/logo.png" alt="Salya Logo" className="h-10 w-auto" />
          </a>
          <div className="flex items-center gap-8">
            <nav className="hidden lg:flex items-center gap-8">
              <button
                type="button"
                onClick={() => scrollToSection('sobre')}
                className="text-sm font-semibold text-slate-500 hover:text-primary transition-colors"
              >
                Sobre
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('funcionalidades')}
                className="text-sm font-semibold text-slate-500 hover:text-primary transition-colors"
              >
                Funcionalidades
              </button>
            </nav>
            <div className="flex items-center gap-3">
              <a
                href={loginUrl}
                className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl shadow-soft hover:shadow-lg hover:bg-primary/90 transition-all"
              >
                Entrar
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-stretch min-h-[520px] md:min-h-[620px] relative z-10 gap-8">

          {/* Left — text content (PAS Formula) */}
          <div className="flex-1 flex flex-col py-12 md:py-16 space-y-7 z-10 order-2 lg:order-1">

            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
              Folha de pagamento angolana, sem planilhas
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-slate-900 dark:text-white leading-[1.08] tracking-tight max-w-xl">
              <span className="text-primary">Processar salários</span> no Excel é um risco que a sua empresa não precisa de correr.
            </h2>

            <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-lg font-medium leading-relaxed">
              O Estado não perdoa erros na folha. E o{' '}
              <span className="text-primary font-bold">Salya</span>{' '}
              elimina esse risco: cálculos automáticos conforme a lei, recibos em PDF e conformidade regulatória garantida para gestores que não têm tempo a perder.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 mt-auto">
              <a
                href={appPath('/registar?plan=DEMO')}
                className="px-10 py-4 bg-primary text-white text-base font-bold rounded-2xl shadow-xl shadow-primary/30 hover:scale-[1.03] hover:shadow-primary/40 hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
              >
                Testar Grátis
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </a>
              <button
                type="button"
                onClick={() => scrollToSection('folha-angola')}
                className="px-10 py-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-white text-base font-bold rounded-2xl shadow-soft border border-slate-200/60 dark:border-slate-700 transition-all text-center"
              >
                Simular Processamento
              </button>
            </div>

          </div>

          {/* Right — hero image + selo AGT */}
          <div className="flex-1 flex flex-col items-center justify-end relative min-h-[380px] lg:min-h-[560px] order-1 lg:order-2 w-full">
            <div className="relative w-full flex items-center justify-center min-h-[320px] lg:min-h-[500px]">
              {HERO_IMAGES.map((img, idx) => (
                <img
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-0 w-auto max-w-[85%] lg:max-w-none object-contain object-bottom transition-opacity duration-1000 h-full"
                  style={{
                    mixBlendMode: 'multiply',
                    opacity: idx === heroIndex ? 1 : 0,
                    pointerEvents: idx === heroIndex ? 'auto' : 'none',
                  }}
                />
              ))}
            </div>

          </div>
        </div>
      </section>

      <div className="w-full bg-white dark:bg-slate-950">
        <div className="w-full h-6 bg-gradient-to-b from-white to-slate-50/50 dark:from-slate-950 dark:to-slate-900/30" />
        <svg
          className="w-full h-5 md:h-8 text-slate-50/50 dark:text-slate-900/30"
          preserveAspectRatio="none"
          viewBox="0 0 1440 54"
          fill="currentColor"
        >
          <path d="M0 54V0C0 0 422 54 720 54C1018 54 1440 0 1440 0V54H0Z" />
        </svg>
      </div>

      {/* ── FOLHA ANGOLA (SIMULADOR SALARIAL, 13.º MÊS E RESCISÃO) ──────────────── */}
      <FolhaAngolaSection />

      <section className="py-24 px-6 bg-slate-900 overflow-hidden" id="sobre">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
              A Solução de <span className="text-primary italic">Folha de Pagamento</span> Líder em Angola.
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed font-medium">
              O SALYA foi desenhado especificamente para as necessidades das PME&apos;s angolanas, removendo a complexidade técnica e burocrocática da folha de pagamento.
            </p>
          </div>
          <div className="flex-1 relative w-full lg:w-auto">
            <div className="size-64 bg-primary/20 rounded-full blur-[100px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div className="relative z-10 p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] shadow-2xl space-y-8">
              <div className="flex items-center gap-5 group">
                <div className="size-12 rounded-2xl bg-white shadow-md flex items-center justify-center group-hover:scale-110 transition-transform">
                  <img src="/processamento em lote.png" alt="Processamento em Lote" className="w-6 h-6 object-contain" />
                </div>
                <div>
                  <p className="text-white font-bold tracking-tight text-lg">Processamento em Lote</p>
                </div>
              </div>
              <div className="flex items-center gap-5 group">
                <div className="size-12 rounded-2xl bg-white shadow-md flex items-center justify-center group-hover:scale-110 transition-transform">
                  <img src="/recibos oficiais.png" alt="Recibos Oficiais" className="w-6 h-6 object-contain" />
                </div>
                <div>
                  <p className="text-white font-bold tracking-tight text-lg">Recibos Oficiais</p>
                </div>
              </div>
              <div className="flex items-center gap-5 group">
                <div className="size-12 rounded-2xl bg-white shadow-md flex items-center justify-center group-hover:scale-110 transition-transform">
                  <img src="/Dashboards de BI.png" alt="Dashboards de BI" className="w-6 h-6 object-contain" />
                </div>
                <div>
                  <p className="text-white font-bold tracking-tight text-lg">Dashboards de BI</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-24 px-6 bg-white dark:bg-slate-950 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-5">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
              Veja como o <span className="text-primary">SALYA</span> pode transformar o seu negócio.
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
              Acompanhe nosso canal no WhatsApp para dicas, atualizações e suporte exclusivo para a sua jornada de gestão.
            </p>
            <a 
              href="https://whatsapp.com/channel/0029Vaf9xXCJkK74kDKpi80T"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#25D366] text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all"
            >
              <img src="/WhatsApp.png" alt="WhatsApp" className="size-5 object-contain" />
              Seguir Canal Oficial
            </a>
          </div>
          <div className="flex-1 w-full group relative">
            <div className="absolute -inset-4 bg-primary/10 rounded-[2.5rem] blur-2xl group-hover:bg-primary/20 transition-all" />
            <div 
              onClick={() => setIsVideoModalOpen(true)}
              className="relative rounded-[2rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-slate-900 aspect-video flex items-center justify-center cursor-pointer"
            >
              <div className="absolute inset-0 z-20 flex items-center justify-center group/btn">
                <div className="size-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover/btn:scale-110 group-hover/btn:bg-white/30 transition-all">
                  <span className="material-symbols-outlined text-white text-5xl">play_circle</span>
                </div>
              </div>
              <video 
                src="/mov.mp4" 
                autoPlay 
                muted 
                loop 
                playsInline
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <Carousel />

      <section className="py-24 px-6 bg-white dark:bg-slate-900" id="funcionalidades">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">Potencialize a sua Gestão</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {funcionalidades.map((func, index) => (
              <div
                key={index}
                className="group flex flex-col gap-8 p-1 bg-slate-50 dark:bg-slate-800/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 hover:border-primary/20 transition-all overflow-hidden shadow-soft"
              >
                <div className="relative h-72 overflow-hidden rounded-[2.2rem]">
                  <img
                    src={func.imagem}
                    alt={func.titulo}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 text-transparent" />
                </div>
                <div className="px-8 pb-10 space-y-4">
                  <h4 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{func.titulo}</h4>
                  <p className="text-slate-500 leading-relaxed font-medium">{func.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900/50 scroll-mt-20" id="planos">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">Planos que acompanham o seu negócio</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Escolha a modalidade de pagamento que melhor se adapta às suas necessidades</p>
          </div>

          {/* Seletor Mensal / Anual */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span 
              onClick={() => setBillingCycle('MENSAL')} 
              className={`text-sm font-bold cursor-pointer transition-colors ${billingCycle === 'MENSAL' ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}
            >
              Pagamento Mensal
            </span>
            <button
              type="button"
              onClick={() => setBillingCycle(billingCycle === 'MENSAL' ? 'ANUAL' : 'MENSAL')}
              className="relative w-14 h-8 bg-slate-200 dark:bg-slate-700 rounded-full p-1 transition-colors outline-none"
              title="Alternar entre Pagamento Mensal e Anual"
            >
              <div className={`w-6 h-6 bg-emerald-500 rounded-full shadow-md transform transition-transform ${billingCycle === 'ANUAL' ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
            <span 
              onClick={() => setBillingCycle('ANUAL')} 
              className={`text-sm font-bold cursor-pointer transition-colors ${billingCycle === 'ANUAL' ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}
            >
              Pagamento Anual
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch pt-4">

            {/* Plano Demo */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-emerald-200/60 dark:border-emerald-900/40 flex flex-col hover:border-emerald-400/40 transition-all shadow-md relative group">
              <div className="mb-6">
                <h4 className="text-2xl font-black text-slate-800 dark:text-white">Demo</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">7 dias de acesso total ao sistema sem compromisso</p>
              </div>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-black text-emerald-600 dark:text-emerald-400">GRATUITO</span>
                <span className="text-sm font-bold text-slate-400 uppercase">/ 7 dias</span>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-6 mb-8 flex-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">O que está incluído:</p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    Acesso total ao sistema
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    1 entidade (empresa ou particular)
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    2 utilizadores
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    Colaboradores ilimitados
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    Emissão ilimitada de recibos
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    IRT &amp; INSS Automatizados
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    Declaração de trabalho &amp; Relatórios
                  </li>
                </ul>
              </div>

              <a
                href={appPath('/registar?plan=DEMO')}
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white text-center font-bold rounded-2xl transition-all shadow-lg shadow-emerald-500/20"
              >
                Testar Grátis 7 Dias
              </a>
            </div>

            {/* Plano Micro Empresa */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800 flex flex-col hover:border-primary/20 transition-all shadow-md relative group">
              <div className="mb-6">
                <h4 className="text-2xl font-black text-slate-800 dark:text-white">Micro Empresa</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">Ideal para micro empresas e famílias com trabalhadores domésticos</p>
              </div>

              <div className="flex flex-col mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900 dark:text-white">
                    {billingCycle === 'MENSAL' ? '5.700' : '68.400'}
                  </span>
                  <span className="text-sm font-bold text-slate-400 uppercase">
                    KZ / {billingCycle === 'MENSAL' ? 'mês' : 'ano'}
                  </span>
                </div>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-6 mb-8 flex-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">O que está incluído:</p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    1 entidade
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    1 utilizador
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    10 colaboradores
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    Emissão ilimitada de recibos
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    IRT &amp; INSS Automatizados
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    Declaração de trabalho &amp; Relatórios
                  </li>
                </ul>
              </div>

              <a
                href={appPath(`/registar?plan=SEMESTRAL&cycle=${billingCycle}`)}
                className="w-full py-4 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 text-center font-bold rounded-2xl transition-all border border-slate-100 dark:border-slate-700"
              >
                Começar Agora
              </a>
            </div>

            {/* Plano Profissional - RECOMENDADO */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border-2 border-primary flex flex-col relative shadow-xl z-10 lg:-translate-y-4">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-5 py-1.5 rounded-full shadow-md">
                Recomendado
              </div>

              <div className="mb-6">
                <h4 className="text-2xl font-black text-slate-800 dark:text-white">Plano Profissional</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">Ideal para pequenas e médias empresas</p>
              </div>

              <div className="flex flex-col mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-primary">
                    {billingCycle === 'MENSAL' ? '10.830' : '129.960'}
                  </span>
                  <span className="text-sm font-bold text-slate-400 uppercase">
                    KZ / {billingCycle === 'MENSAL' ? 'mês' : 'ano'}
                  </span>
                </div>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-6 mb-8 flex-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">O que está incluído:</p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    1 entidade (empresa ou particular)
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    2 utilizadores
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    100 colaboradores
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    Emissão ilimitada de recibos
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    IRT &amp; INSS Automatizados
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    Acesso a Biometria &amp; Assiduidade
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    Declaração de trabalho &amp; Férias
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    Relatórios avançados
                  </li>
                </ul>
              </div>

              <a
                href={appPath(`/registar?plan=ANUAL&cycle=${billingCycle}`)}
                className="w-full py-4 bg-primary text-white text-center font-bold rounded-2xl hover:bg-primary/95 hover:scale-[1.02] shadow-lg shadow-primary/20 transition-all block"
              >
                Assinar Agora
              </a>
            </div>

            {/* Plano Corporativo */}
            <div className="bg-white dark:bg-slate-900 p-7 rounded-3xl border border-slate-200/60 dark:border-slate-800 flex flex-col hover:border-primary/20 transition-all shadow-md relative group">
              <div className="mb-5">
                <h4 className="text-2xl font-black text-slate-800 dark:text-white">Plano Corporativo</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">Ideal para médias, grandes empresas e consultores que precisam de escalabilidade</p>
              </div>
              <div className="flex items-baseline gap-1 mb-8 flex-wrap">
                <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">SOB CONSULTA</span>
                <span className="text-xs sm:text-sm font-bold text-slate-400 uppercase">/ 12 meses</span>
              </div>
              <div className="border-t border-slate-100 dark:border-slate-800 pt-5 mb-6 flex-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">O que está incluído:</p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    +1 entidade (empresa ou particular)
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    +2 utilizadores
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    +100 colaboradores
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    Emissão de ilimitada de recibos
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    IRT &amp; INSS Automatizados
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    Declaração de trabalho
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    Gestão de férias
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    Relatório
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    Simulador de 13º
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    Simulador de rescisão de contratos
                  </li>
                </ul>
              </div>
              <a
                href="https://wa.me/244935793270?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Plano%20Corporativo%20da%20SALYA."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-300 text-center font-bold rounded-2xl transition-all border border-slate-200/50 dark:border-slate-700 text-sm"
              >
                Falar com Consultor
              </a>
            </div>
            
          </div>
        </div>
      </section>

      {/* Secção de Suporte Humanizado */}
      <section className="py-16 px-6 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/50 dark:to-slate-950">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="https://wa.me/244935793270?text=Ol%C3%A1!%20Preciso%20de%20ajuda%20com%20o%20SALYA."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/20 transition-all"
            >
              <img src="/WhatsApp.png" alt="WhatsApp" className="size-5 object-contain" />
              WhatsApp: 935 793 270
            </a>
            <a
              href="mailto:solucoes@ilungi.ao"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-2xl hover:border-primary/30 transition-all"
            >
              <span className="material-symbols-outlined">mail</span>
              solucoes@ilungi.ao
            </a>
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex flex-row items-center gap-4">
             <img src="/logo.png" alt="Salya Logo" className="h-6 w-auto" />
             <p className="text-xs text-slate-500 font-medium tracking-wide">© 2026 SALYA. Todos os direitos reservados</p>
           </div>
           <div className="flex items-center gap-6">
             <button
               onClick={onShowTerms}
               className="text-xs text-slate-500 hover:text-primary font-medium tracking-wide transition-colors"
             >
               Termos de Uso e Política de Privacidade
             </button>
           </div>
         </div>
       </footer>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-xl p-4 md:p-10">
          <button 
            onClick={() => setIsVideoModalOpen(false)}
            className="absolute top-6 right-6 size-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all z-[110]"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          
          <div className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black">
            <video 
              src="/mov.mp4" 
              autoPlay 
              controls 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

const Carousel: React.FC = () => {
  const images = [
    {
      src: '/Arte 1 - 1x1.jpg.jpeg',
      title: 'Simplicidade & Eficiência',
      description: 'Tenha o controle total da sua folha de pagamento em poucos cliques. Design intuitivo focado na produtividade do seu RH.'
    },
    {
      src: '/Arte 2 - 1x1b.jpg.jpeg',
      title: 'Cálculos Inteligentes',
      description: 'Automatização precisa de IRT e INSS conforme a lei angolana. Reduza erros e economize tempo valioso todos os meses.'
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900/30 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">Experiência Digital Superior</h2>
        </div>

        <div className="relative group">
          <div className="relative overflow-hidden rounded-[3rem] shadow-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 aspect-video md:aspect-[21/9]">
            {images.map((img, idx) => (
              <div 
                key={idx}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out flex flex-col md:flex-row items-center ${
                  idx === activeIndex ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'
                }`}
              >
                <div className="flex-1 h-full w-full">
                  <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 p-8 md:p-12 space-y-6 bg-white dark:bg-slate-900">
                  <h4 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight">
                    {img.title}
                  </h4>
                  <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    {img.description}
                  </p>
                  <div className="pt-4 flex gap-4">
                    <button onClick={() => setActiveIndex(0)} title="Slide 1" aria-label="Ir para o slide 1" className={`size-3 rounded-full transition-all ${activeIndex === 0 ? 'bg-primary w-8' : 'bg-slate-200 dark:bg-slate-700'}`} />
                    <button onClick={() => setActiveIndex(1)} title="Slide 2" aria-label="Ir para o slide 2" className={`size-3 rounded-full transition-all ${activeIndex === 1 ? 'bg-primary w-8' : 'bg-slate-200 dark:bg-slate-700'}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => setActiveIndex((prev) => (prev - 1 + images.length) % images.length)}
            title="Slide Anterior"
            aria-label="Ir para o slide anterior"
            className="absolute left-4 top-1/2 -translate-y-1/2 size-12 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-full shadow-lg border border-slate-200 dark:border-slate-700 items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-all hidden md:flex z-30"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button 
            onClick={() => setActiveIndex((prev) => (prev + 1) % images.length)}
            title="Próximo Slide"
            aria-label="Ir para o próximo slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 size-12 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-full shadow-lg border border-slate-200 dark:border-slate-700 items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-all hidden md:flex z-30"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Landing;
