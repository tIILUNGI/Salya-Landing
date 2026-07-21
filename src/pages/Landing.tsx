import React, { useState, useEffect } from 'react';
import { appPath } from '../config/urls';
import { calcularINSS, calcularIRT, calcularINSSPatronal } from '../utils/taxCalculations';

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

  // Estados do Simulador de IRT (Decreto Presidencial & Lei n.º 14/25)
  const [simSalario, setSimSalario] = useState<number>(250000);
  const [simAlimentacao, setSimAlimentacao] = useState<number>(30000);
  const [simTransporte, setSimTransporte] = useState<number>(25000);
  const [simPrestador, setSimPrestador] = useState<boolean>(false);
  const [simParticular, setSimParticular] = useState<boolean>(false);

  const formatMoney = (value: number) => {
    return `${value.toLocaleString('pt-AO', { minimumFractionDigits: 0, maximumFractionDigits: 2 })} Kz`;
  };

  const inssCalculado = simPrestador ? 0 : calcularINSS(simSalario);
  const alimentacaoTrib = Math.max(0, simAlimentacao - 30000);
  const transporteTrib = Math.max(0, simTransporte - 30000);
  const materiaColectavel = Math.max(0, simSalario + alimentacaoTrib + transporteTrib - inssCalculado);

  const irtResult = calcularIRT(materiaColectavel, simPrestador, simParticular, simSalario);
  const irtCalculado = irtResult.valor;
  const faixaAtiva = irtResult.faixa;

  const inssPatronal = calcularINSSPatronal(simSalario, simPrestador);
  const custoTotalEmpresa = simPrestador ? (simSalario + simAlimentacao + simTransporte) : (simSalario + simAlimentacao + simTransporte + inssPatronal);
  const salarioBrutoTotal = simSalario + simAlimentacao + simTransporte;
  const totalDescontos = inssCalculado + irtCalculado;
  const salarioLiquido = salarioBrutoTotal - totalDescontos;

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
              A AGT não perdoa erros na folha. O SALYA elimina o risco: cálculos automáticos conforme a Lei n.º 14/25, recibos em PDF e conformidade fiscal garantida para PMEs, gabinetes e gestores que não têm tempo a perder.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 mt-auto">
              <a
                href={appPath('/registar')}
                className="px-10 py-4 bg-primary text-white text-base font-bold rounded-2xl shadow-xl shadow-primary/30 hover:scale-[1.03] hover:shadow-primary/40 hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
              >
                Testar Grátis
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </a>
              <button
                type="button"
                onClick={() => scrollToSection('simulador')}
                className="px-10 py-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-white text-base font-bold rounded-2xl shadow-soft border border-slate-200/60 dark:border-slate-700 transition-all text-center"
              >
                Simular IRT ao Vivo
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


      {/* ── NOTIFICAÇÕES SIMULADAS (MODERN NOTIFICATION TOASTS) ──────────────── */}
      <section className="py-16 px-6 bg-slate-50/50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-soft hover:border-primary/20 transition-all flex items-start gap-4">
              <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 text-primary group-hover:scale-115 transition-transform">
                <span className="material-symbols-outlined text-2xl">notifications_active</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">SALYA Notificação</span>
                  <span className="text-[10px] text-slate-400">Agora mesmo</span>
                </div>
                <h4 className="text-base font-bold text-slate-800 dark:text-white leading-tight">Massa Salarial Processada</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  <strong>João Manuel</strong> (Programador Sénior) recebeu o recibo de pagamento no e-mail. Salário Líquido calculado: <strong>242.500 Kz</strong> (INSS 3% e IRT retidos conforme nova lei).
                </p>
              </div>
            </div>

            <div className="group bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-soft hover:border-primary/20 transition-all flex items-start gap-4">
              <div className="size-12 bg-indigo-500/10 rounded-xl flex items-center justify-center shrink-0 text-indigo-500 group-hover:scale-115 transition-transform">
                <span className="material-symbols-outlined text-2xl">verified_user</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Guia Oficial AGT</span>
                  <span className="text-[10px] text-slate-400">Há 5 min</span>
                </div>
                <h4 className="text-base font-bold text-slate-800 dark:text-white leading-tight">Mapa de Férias Compliant</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  Férias de Julho aprovadas. A escala do departamento de Finanças foi validada contra conflitos de pessoal. Documento de exportação legal AGT pronto em PDF.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SIMULADOR DE IRT INTERATIVO (LIVE CALCULATION) ──────────────── */}
      <section className="py-24 px-6 bg-white dark:bg-slate-950 scroll-mt-20" id="simulador">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Cálculo ao Vivo</span>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">Simulador de IRT & INSS de Angola</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
              Simule o salário líquido estimado, os descontos legais e o custo total para a empresa com base na nova lei em vigor.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Esquerda: Inputs da simulação */}
            <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-6">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Parâmetros de Cálculo</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="block text-xs font-bold text-slate-500 uppercase">Regime Contratual</label>
                  <div className="flex flex-col gap-3">
                    <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-350 font-medium cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={simPrestador} 
                        onChange={(e) => {
                          setSimPrestador(e.target.checked);
                          if (e.target.checked) setSimParticular(false);
                        }} 
                        className="rounded text-primary focus:ring-primary h-4 w-4" 
                      />
                      Prestador de Serviço (Independente)
                    </label>
                    <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-355 font-medium cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={simParticular} 
                        onChange={(e) => {
                          setSimParticular(e.target.checked);
                          if (e.target.checked) setSimPrestador(false);
                        }} 
                        className="rounded text-primary focus:ring-primary h-4 w-4" 
                      />
                      Trabalho Particular / Doméstico
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="block text-xs font-bold text-slate-500 uppercase">Salário Base (Kz)</label>
                    <span className="text-xs font-bold text-primary font-mono">{formatMoney(simSalario)}</span>
                  </div>
                  <input 
                    type="number" 
                    value={simSalario}
                    onChange={(e) => setSimSalario(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 font-semibold text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary/20 transition-all font-mono"
                  />
                  <input 
                    type="range" 
                    min="50000" 
                    max="1500000" 
                    step="1000" 
                    value={simSalario}
                    onChange={(e) => setSimSalario(Number(e.target.value))}
                    className="w-full accent-primary mt-2" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200/50 dark:border-slate-800">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="block text-xs font-bold text-slate-500 uppercase">Sub. Alimentação</label>
                    <span className="text-xs font-medium text-slate-500 font-mono">{formatMoney(simAlimentacao)}</span>
                  </div>
                  <input 
                    type="number" 
                    value={simAlimentacao}
                    onChange={(e) => setSimAlimentacao(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 font-semibold text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary/20 transition-all font-mono"
                  />
                  <input 
                    type="range" 
                    min="0" 
                    max="100000" 
                    step="5000" 
                    value={simAlimentacao}
                    onChange={(e) => setSimAlimentacao(Number(e.target.value))}
                    className="w-full accent-primary mt-2" 
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="block text-xs font-bold text-slate-500 uppercase">Sub. Transporte</label>
                    <span className="text-xs font-medium text-slate-500 font-mono">{formatMoney(simTransporte)}</span>
                  </div>
                  <input 
                    type="number" 
                    value={simTransporte}
                    onChange={(e) => setSimTransporte(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 font-semibold text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary/20 transition-all font-mono"
                  />
                  <input 
                    type="range" 
                    min="0" 
                    max="100000" 
                    step="5000" 
                    value={simTransporte}
                    onChange={(e) => setSimTransporte(Number(e.target.value))}
                    className="w-full accent-primary mt-2" 
                  />
                </div>
              </div>
            </div>

            {/* Direita: Recibo Simulado Premium */}
            <div className="lg:col-span-5 bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[460px]">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
              
              <div className="space-y-6 relative z-10">
                <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                  <div>
                    <h3 className="font-bold text-sm tracking-widest text-[#a855f7] uppercase">Simulação de Vencimento</h3>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">ESTADO: RASCUNHO REAL</p>
                  </div>
                  <span className="text-[10px] bg-slate-800 text-slate-350 px-2.5 py-1 rounded-md font-bold uppercase tracking-wider">
                    {faixaAtiva}
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Salário Base</span>
                    <span>{formatMoney(simSalario)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Sub. Alimentação</span>
                    <span>{formatMoney(simAlimentacao)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Sub. Transporte</span>
                    <span>{formatMoney(simTransporte)}</span>
                  </div>
                  <div className="border-t border-dashed border-slate-800 my-2 pt-2 flex justify-between font-bold text-sm">
                    <span className="text-slate-300">Total Rendimentos</span>
                    <span>{formatMoney(salarioBrutoTotal)}</span>
                  </div>
                </div>

                <div className="space-y-3 font-mono text-xs pt-2 border-t border-slate-800/50">
                  <h4 className="text-[10px] font-bold text-rose-450 uppercase tracking-widest">Descontos Retidos</h4>
                  <div className="flex justify-between">
                    <span className="text-slate-400">INSS (3% Trabalhador)</span>
                    <span className="text-rose-400">-{formatMoney(inssCalculado)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">IRT</span>
                    <span className="text-rose-400">-{formatMoney(irtCalculado)}</span>
                  </div>
                  {salarioBrutoTotal > 0 && !simPrestador && (
                    <div className="flex justify-between pt-1 border-t border-slate-800/30">
                      <span className="text-slate-405">INSS Patronal (8% Empresa)</span>
                      <span className="text-amber-400 font-bold">+{formatMoney(inssPatronal)}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800 relative z-10">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-bold text-[#25d366] uppercase tracking-wider mb-1">Salário Líquido</p>
                    <p className="text-3xl font-black tracking-tight text-white">{formatMoney(salarioLiquido)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Custo Real Empresa</p>
                    <p className="text-sm font-bold text-slate-200">{formatMoney(custoTotalEmpresa)}</p>
                  </div>
                </div>
                <a 
                  href={appPath('/registar')}
                  className="w-full mt-6 py-3.5 bg-primary hover:bg-primary/95 text-white rounded-xl text-center text-xs font-bold uppercase tracking-widest block transition-all shadow-lg shadow-primary/20"
                >
                  Processar esta Folha Gratuitamente
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-slate-900 overflow-hidden" id="sobre">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <h3 className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">A Plataforma</h3>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
              A Solução de <span className="text-primary italic">Folha de Pagamento</span> Líder em Angola.
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed font-medium">
              O SALYA foi desenhado especificamente para as necessidades das PME&apos;s angolanas, removendo a complexidade técnica e
              burocrática da folha de pagamento.
            </p>

          </div>
          <div className="flex-1 relative w-full lg:w-auto">
            <div className="size-64 bg-primary/20 rounded-full blur-[100px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div className="relative z-10 p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] shadow-2xl space-y-8">
              <div className="flex items-center gap-5 group">
                <div className="size-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-emerald-400">verified</span>
                </div>
                <div>
                  <p className="text-white font-bold tracking-tight">Processamento em Lote</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">Eficiência Operacional</p>
                </div>
              </div>
              <div className="flex items-center gap-5 group">
                <div className="size-12 rounded-2xl bg-violet-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-violet-400">description</span>
                </div>
                <div>
                  <p className="text-white font-bold tracking-tight">Recibos Oficiais</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">Padrão Corporativo</p>
                </div>
              </div>
              <div className="flex items-center gap-5 group">
                <div className="size-12 rounded-2xl bg-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-amber-400">analytics</span>
                </div>
                <div>
                  <p className="text-white font-bold tracking-tight">Dashboards de BI</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">Dados Inteligentes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-24 px-6 bg-white dark:bg-slate-950 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-6">
            <h3 className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Em Ação</h3>
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
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="size-5 brightness-0 invert" />
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
          <div className="text-center mb-20 space-y-4">
            <h3 className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Funcionalidades</h3>
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
          <div className="text-center mb-16 space-y-4">
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Investimento Inteligente</span>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">Planos que acompanham o seu negócio</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">Escolha o plano ideal e garanta conformidade legal absoluta sem necessidade de planilhas complexas.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch pt-4">

            {/* Plano Demo */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-emerald-200/60 dark:border-emerald-900/40 flex flex-col hover:border-emerald-400/40 transition-all shadow-md relative group">
              <div className="mb-6">
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-2">Experimente Grátis</span>
                <h4 className="text-2xl font-black text-slate-800 dark:text-white">Plano Demo</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">Teste todas as funcionalidades essenciais sem compromisso.</p>
              </div>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-black text-emerald-600 dark:text-emerald-400">Gratuito</span>
                <span className="text-sm font-bold text-slate-400 uppercase">/ 24 horas</span>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-6 mb-8 flex-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">O que está incluído:</p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    IRT &amp; INSS Automáticos
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    1 Entidade &amp; 2 Utilizadores
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    Geração de Recibos em PDF
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    Processamento Salarial Individual
                  </li>
                  <li className="flex items-center gap-3 text-sm text-amber-600 dark:text-amber-400 font-medium">
                    <span className="material-symbols-outlined text-amber-500 text-base">schedule</span>
                    Acesso limitado a 24 horas
                  </li>
                </ul>
              </div>

              <a
                href={appPath('/registar?plan=DEMO')}
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white text-center font-bold rounded-2xl transition-all shadow-lg shadow-emerald-500/20"
              >
                Testar Grátis
              </a>
            </div>

            {/* Plano Semestral */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800 flex flex-col hover:border-primary/20 transition-all shadow-md relative group">
              <div className="mb-6">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Para Profissionais</span>
                <h4 className="text-2xl font-black text-slate-800 dark:text-white">Plano Semestral</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">Ideal para gestão doméstica ou micro-empreendedores.</p>
              </div>
              
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-black text-slate-900 dark:text-white">22.800</span>
                <span className="text-sm font-bold text-slate-400 uppercase">Kz / 6 meses</span>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-6 mb-8 flex-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">O que está incluído:</p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    IRT & INSS 100% Automáticos
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    Geração de Recibos em PDF
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    Declarações de Trabalho em 1 clique
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-400 dark:text-slate-655 font-medium line-through">
                    <span className="material-symbols-outlined text-slate-350 dark:text-slate-700 text-base">cancel</span>
                    Multi-utilizadores e Gestão de RH
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-400 dark:text-slate-655 font-medium">
                    <span className="material-symbols-outlined text-amber-500 text-base">warning</span>
                    Limitação: Entidade Particular apenas
                  </li>
                </ul>
              </div>

              <a 
                href={appPath('/registar?plan=SEMESTRAL')} 
                className="w-full py-4 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 text-center font-bold rounded-2xl transition-all border border-slate-100 dark:border-slate-700"
              >
                Começar Agora
              </a>
            </div>

            {/* Plano Anual - RECOMENDADO / POPULAR */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border-2 border-primary flex flex-col relative shadow-xl z-10 lg:-translate-y-4">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-5 py-1.5 rounded-full shadow-md">
                Melhor Valor / Recomendado
              </div>
              
              <div className="mb-6">
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-2">Para PMEs LGT</span>
                <h4 className="text-2xl font-black text-slate-800 dark:text-white">Plano Anual</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">Controlo corporativo e conformidade total LGT com a melhor poupança.</p>
              </div>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-black text-primary">114.000</span>
                <span className="text-sm font-bold text-slate-400 uppercase">Kz / ano</span>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-6 mb-8 flex-1">
                <p className="text-xs font-bold text-primary uppercase tracking-wider mb-4">Recursos Corporativos Completos:</p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-sm text-slate-800 dark:text-slate-300 font-semibold">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    1 Entidade Corporativa / Empresa
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    Processamento Salarial em Lote (Bulk)
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    IRT & INSS com Ficheiros Oficiais
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    Geração e Exportação de Recibos em PDF
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    Gestão Completa de Férias e Faltas
                  </li>
                </ul>
              </div>

              <a 
                href={appPath('/registar?plan=ANUAL')} 
                className="w-full py-4 bg-primary text-white text-center font-bold rounded-2xl hover:bg-primary/95 hover:scale-[1.02] shadow-lg shadow-primary/20 transition-all block"
              >
                Subscrever com Desconto Anual
              </a>
            </div>

            {/* Plano Business / Enterprise */}
            <div className="bg-white dark:bg-slate-900 p-7 rounded-3xl border border-slate-200/60 dark:border-slate-800 flex flex-col hover:border-primary/20 transition-all shadow-md relative group">
              <div className="mb-5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Para Grandes Empresas</span>
                <h4 className="text-2xl font-black text-slate-800 dark:text-white">Plano Business</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">Gestão avançada de múltiplos utilizadores e relatórios de BI personalizados.</p>
              </div>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-black text-slate-900 dark:text-white font-sans">Contactar</span>
              </div>
              <div className="border-t border-slate-100 dark:border-slate-800 pt-5 mb-6 flex-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Totalmente Escalável:</p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    Gestão de Utilizadores Ilimitada
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    Relatórios Avançados de Business Intelligence
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    Múltiplas Entidades / Consolidação Fiscal
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    Suporte VIP Dedicado via WhatsApp e Telefone
                  </li>
                </ul>
              </div>
              <a
                href="https://wa.me/244935793270?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Plano%20Business%20da%20SALYA."
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-xs font-bold">
            <span className="material-symbols-outlined text-sm">support_agent</span>
            Estamos aqui para ajudar
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Dúvidas sobre IRT, INSS ou o plano ideal?
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xl mx-auto">
            A nossa equipa em Luanda conhece a legislação angolana e responde em minutos. Sem robôs, sem filas — fale connosco como humano para humano.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="https://wa.me/244935793270?text=Ol%C3%A1!%20Preciso%20de%20ajuda%20com%20o%20SALYA."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/20 transition-all"
            >
              <span className="material-symbols-outlined">chat</span>
              WhatsApp — 935 793 270
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
             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">© 2026 SALYA.Todos os direitos reservados</p>
           </div>
           <div className="flex items-center gap-6">
             <button
               onClick={onShowTerms}
               className="text-[10px] text-slate-400 hover:text-primary font-bold uppercase tracking-widest transition-colors"
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
          <h3 className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Visão do Sistema</h3>
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
                  <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest rounded-full">
                    Destaque #{idx + 1}
                  </div>
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
