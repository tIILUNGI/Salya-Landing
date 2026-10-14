import { useState, useEffect } from 'react';
import { calcularINSS, calcularIRT, calcularINSSPatronal, roundMoney } from '../utils/taxCalculations';
import { translations, Lang } from '../i18n/translations';

const API_BASE = (() => {
  const h = window.location.hostname;
  const isLocal = h === 'localhost' || h === '127.0.0.1' || h.startsWith('192.168.');
  return isLocal ? `http://${h}:8080/api` : 'https://api.salya.ao/api';
})();

const fmt = (v: number) =>
  Number(v).toLocaleString('pt-AO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const STORAGE_KEY = 'folha_angola_lead';

interface LeadInfo { nome: string; email: string; }
interface D13Result {
  salarioBase: number;
  subsidioAlimentacao?: number;
  subsidioTransporte?: number;
  outrosSubsidios?: number;
  salarioBrutoNormal?: number;
  inssNormal?: number;
  irtNormal?: number;
  salarioLiquidoNormal?: number;
  mesesTrabalhados: number;
  percentagem: number;
  valorBruto: number;
  inss: number;
  isencaoINSS: boolean;
  irt: number;
  valorLiquido: number;
  totalBrutoReceber?: number;
  totalDescontosReceber?: number;
  totalLiquidoReceber?: number;
  nota: string;
}
interface RescisaoResult {
  salarioBase: number; anosAntiguidade: number; mesesRestantes: number;
  detalhes: {
    salarioDiasTrabalhadosMes: number; propDecimoTerceiro: number;
    feriasVencidas: number; subsidioFeriasVencidas: number;
    propFerias: number; subsidioFeriasProp: number; indemnizacao: number;
  };
  descontos: { inssColaborador: number; irtMes: number; irtDecimoTerceiro: number; };
  totalBruto: number; totalDescontos: number; totalLiquido: number; notaIndemnizacao: string;
}

function FormularioRegisto({ onSuccess, lang }: { onSuccess: (lead: LeadInfo) => void; lang: Lang }) {
  const t = translations[lang];
  const [modo, setModo] = useState<'novo' | 'regresso'>('novo');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [consentimento, setConsentimento] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const handleNovo = async () => {
    setErro('');
    if (!nome.trim()) { setErro(t.sim_name_required); return; }
    if (!email.includes('@')) { setErro(t.sim_email_invalid); return; }
    if (!consentimento) { setErro(t.sim_consent_required); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/folha-angola/registar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, consentimento }),
      });
      const data = await res.json();
      if (!res.ok) { setErro(data.error || 'Erro no registo.'); return; }
      const lead = { nome: data.nome, email: data.email };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lead));
      onSuccess(lead);
    } catch { setErro(t.sim_no_connection); }
    finally { setLoading(false); }
  };

  const handleRegresso = async () => {
    setErro('');
    if (!email.includes('@')) { setErro(t.sim_email_invalid); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/folha-angola/verificar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) { setErro(data.error || t.sim_email_not_found); return; }
      const lead = { nome: data.nome, email: data.email };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lead));
      onSuccess(lead);
    } catch { setErro(t.sim_no_connection); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-white">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold tracking-tight">{t.sim_access_title}</h3>
        <p className="text-xs text-slate-400 mt-1">{t.sim_access_desc}</p>
      </div>

      <div className="flex bg-slate-950 p-1 rounded-xl mb-6 border border-slate-800">
        <button
          onClick={() => { setModo('novo'); setErro(''); }}
          className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${modo === 'novo' ? 'bg-primary text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
        >{t.sim_first_access}</button>
        <button
          onClick={() => { setModo('regresso'); setErro(''); }}
          className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${modo === 'regresso' ? 'bg-primary text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
        >{t.sim_returning}</button>
      </div>

      <div className="space-y-4">
        {modo === 'novo' ? (
          <>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">{t.sim_full_name}</label>
              <input value={nome} onChange={e => setNome(e.target.value)}
                placeholder="Ex: João Manuel dos Santos"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm font-medium text-white outline-none focus:border-primary transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">{t.sim_email}</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="o.seu@email.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm font-medium text-white outline-none focus:border-primary transition-colors" />
            </div>
            <label className="flex items-start gap-3 cursor-pointer select-none pt-1">
              <input type="checkbox" checked={consentimento} onChange={e => setConsentimento(e.target.checked)} className="mt-1 accent-primary" />
              <span className="text-xs text-slate-400 leading-relaxed">{t.sim_consent}</span>
            </label>
            {erro && <p className="text-xs font-bold text-rose-400 bg-rose-950/40 border border-rose-900/50 p-3 rounded-xl">{erro}</p>}
            <button onClick={handleNovo} disabled={loading}
              className="w-full py-3.5 bg-primary hover:bg-primary/95 text-white rounded-xl text-xs font-bold uppercase tracking-widest block transition-all shadow-lg shadow-primary/20 disabled:opacity-60">
              {loading ? t.sim_processing : t.sim_unlock}
            </button>
          </>
        ) : (
          <>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">{t.sim_email_reg}</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="o.seu@email.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm font-medium text-white outline-none focus:border-primary transition-colors" />
            </div>
            {erro && <p className="text-xs font-bold text-rose-400 bg-rose-950/40 border border-rose-900/50 p-3 rounded-xl">{erro}</p>}
            <button onClick={handleRegresso} disabled={loading}
              className="w-full py-3.5 bg-primary hover:bg-primary/95 text-white rounded-xl text-xs font-bold uppercase tracking-widest block transition-all shadow-lg shadow-primary/20 disabled:opacity-60">
              {loading ? t.sim_verifying : t.sim_access_btn}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function SimuladorDecimoTerceiro({ lang }: { lang: Lang }) {
  const t = translations[lang];
  const [salario, setSalario] = useState('');
  const [subAlimentacao, setSubAlimentacao] = useState('');
  const [subTransporte, setSubTransporte] = useState('');
  const [outrosSubsidios, setOutrosSubsidios] = useState('');
  const [meses, setMeses] = useState('12');
  const [percentagem, setPercentagem] = useState('50');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<D13Result | null>(null);
  const [erro, setErro] = useState('');
  const [mostrarDetalhesNormal, setMostrarDetalhesNormal] = useState(false);

  const calcular = async () => {
    setErro(''); setResult(null);
    const s = Number(salario.replace(/\D/g, ''));
    const a = Number(subAlimentacao.replace(/\D/g, ''));
    const tr = Number(subTransporte.replace(/\D/g, ''));
    const o = Number(outrosSubsidios.replace(/\D/g, ''));

    if (!s || s <= 0) { setErro(t.d13_invalid_salary); return; }
    setLoading(true);

    const payload = {
      salarioBase: s,
      subsidioAlimentacao: a,
      subsidioTransporte: tr,
      outrosSubsidios: o,
      mesesTrabalhados: Number(meses),
      percentagem: Number(percentagem),
    };

    try {
      const res = await fetch(`${API_BASE}/folha-angola/simular-decimo-terceiro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) { setErro(data.error || 'Erro no cálculo.'); return; }

      const resData: D13Result = {
        ...data,
        subsidioAlimentacao: data.subsidioAlimentacao ?? a,
        subsidioTransporte: data.subsidioTransporte ?? tr,
        outrosSubsidios: data.outrosSubsidios ?? o,
      };

      if (resData.salarioBrutoNormal === undefined) {
        const totalSub = a + tr + o;
        const brutoNormal = s + totalSub;
        const inssNorm = roundMoney(s * 0.03);
        const alimTrib = Math.max(0, a - 30000);
        const transpTrib = Math.max(0, tr - 30000);
        const mcNorm = Math.max(0, s + alimTrib + transpTrib + o - inssNorm);
        const irtNorm = calcularIRT(mcNorm, false, false, s).valor;
        const liqNorm = roundMoney(brutoNormal - inssNorm - irtNorm);

        resData.salarioBrutoNormal = brutoNormal;
        resData.inssNormal = inssNorm;
        resData.irtNormal = irtNorm;
        resData.salarioLiquidoNormal = liqNorm;
        resData.totalBrutoReceber = roundMoney(brutoNormal + data.valorBruto);
        resData.totalDescontosReceber = roundMoney(inssNorm + irtNorm + data.irt);
        resData.totalLiquidoReceber = roundMoney(liqNorm + data.valorLiquido);
      }

      setResult(resData);
    } catch {
      const totalSub = a + tr + o;
      const brutoNormal = s + totalSub;
      const inssNorm = roundMoney(s * 0.03);
      const alimTrib = Math.max(0, a - 30000);
      const transpTrib = Math.max(0, tr - 30000);
      const mcNorm = Math.max(0, s + alimTrib + transpTrib + o - inssNorm);
      const irtNorm = calcularIRT(mcNorm, false, false, s).valor;
      const liqNorm = roundMoney(brutoNormal - inssNorm - irtNorm);

      const m = Number(meses);
      const pct = Number(percentagem);
      const valBruto13 = roundMoney((s * (pct / 100) / 12) * m);
      const irt13 = calcularIRT(valBruto13, false, false, s).valor;
      const valLiq13 = roundMoney(valBruto13 - irt13);

      setResult({
        salarioBase: s,
        subsidioAlimentacao: a,
        subsidioTransporte: tr,
        outrosSubsidios: o,
        salarioBrutoNormal: brutoNormal,
        inssNormal: inssNorm,
        irtNormal: irtNorm,
        salarioLiquidoNormal: liqNorm,
        mesesTrabalhados: m,
        percentagem: pct,
        valorBruto: valBruto13,
        inss: 0,
        isencaoINSS: true,
        irt: irt13,
        valorLiquido: valLiq13,
        totalBrutoReceber: roundMoney(brutoNormal + valBruto13),
        totalDescontosReceber: roundMoney(inssNorm + irtNorm + irt13),
        totalLiquidoReceber: roundMoney(liqNorm + valLiq13),
        nota: t.d13_note,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">{t.d13_base}</label>
          <input value={salario} onChange={e => setSalario(Number(e.target.value.replace(/\D/g,'')).toLocaleString('pt-AO'))}
            placeholder="Ex: 250.000"
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm font-bold text-white outline-none focus:border-primary" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">{t.d13_food}</label>
          <input value={subAlimentacao} onChange={e => setSubAlimentacao(Number(e.target.value.replace(/\D/g,'')).toLocaleString('pt-AO'))}
            placeholder="Ex: 30.000"
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm font-bold text-white outline-none focus:border-primary" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">{t.d13_transport}</label>
          <input value={subTransporte} onChange={e => setSubTransporte(Number(e.target.value.replace(/\D/g,'')).toLocaleString('pt-AO'))}
            placeholder="Ex: 25.000"
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm font-bold text-white outline-none focus:border-primary" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">{t.d13_other}</label>
          <input value={outrosSubsidios} onChange={e => setOutrosSubsidios(Number(e.target.value.replace(/\D/g,'')).toLocaleString('pt-AO'))}
            placeholder="Ex: 0"
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm font-bold text-white outline-none focus:border-primary" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">{t.d13_months}</label>
          <select value={meses} onChange={e => setMeses(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm font-bold text-white outline-none focus:border-primary">
            {Array.from({length: 12}, (_, i) => i + 1).map(m => (
              <option key={m} value={m}>{m} {m === 1 ? t.d13_month_label : t.d13_months_label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">{t.d13_percentage}</label>
          <select value={percentagem} onChange={e => setPercentagem(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm font-bold text-white outline-none focus:border-primary">
            <option value="50">{t.d13_pct_50}</option>
            <option value="75">{t.d13_pct_75}</option>
            <option value="100">{t.d13_pct_100}</option>
          </select>
        </div>
      </div>
      {erro && <p className="text-xs font-bold text-rose-400 bg-rose-950/40 border border-rose-900/50 p-3 rounded-xl">{erro}</p>}
      <button onClick={calcular} disabled={loading}
        className="px-8 py-3 bg-primary hover:bg-primary/95 text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all disabled:opacity-60 shadow-lg shadow-primary/20">
        {loading ? t.d13_calculating : t.d13_calculate}
      </button>

      {result && (
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-xl p-5 text-white shadow-lg flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-100">{t.d13_net}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/20 text-white">
                  {result.mesesTrabalhados}/12m ({result.percentagem}%)
                </span>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-black font-mono tracking-tight">
                  {fmt(result.valorLiquido)} <span className="text-xs font-bold text-emerald-100">Kz</span>
                </h3>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.d13_irt_retained}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/50">{t.d13_inss_exempt}</span>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-black font-mono text-rose-400">
                  -{fmt(result.irt)} <span className="text-xs font-bold text-slate-400">Kz</span>
                </h3>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.d13_month_total}</span>
                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">{t.d13_net_label}</span>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-black font-mono text-white">
                  {fmt(result.totalLiquidoReceber || (result.valorLiquido + (result.salarioLiquidoNormal || 0)))} <span className="text-xs font-bold text-slate-400">Kz</span>
                </h3>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-black uppercase tracking-wider text-slate-200">{t.d13_breakdown}</span>
              <span className="text-[10px] text-slate-400 font-mono">Base: {fmt(result.salarioBase)} Kz</span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-400 py-0.5">
                <span>{t.d13_gross} ({result.percentagem}% {lang === 'pt' ? 'em' : 'in'} {result.mesesTrabalhados}m)</span>
                <span className="text-slate-200 font-bold">+{fmt(result.valorBruto)} Kz</span>
              </div>
              <div className="flex justify-between text-slate-400 py-0.5">
                <span>{t.d13_inss_3}</span>
                <span className="text-emerald-400 font-semibold">{t.d13_inss_exempt_val}</span>
              </div>
              <div className="flex justify-between text-slate-400 py-0.5">
                <span>{t.d13_irt_agt}</span>
                <span className="text-rose-400">-{fmt(result.irt)} Kz</span>
              </div>
              <div className="flex justify-between items-center text-emerald-400 font-bold text-sm pt-2 border-t border-slate-800">
                <span className="text-xs uppercase tracking-wider">{t.d13_net_13}</span>
                <span>{fmt(result.valorLiquido)} Kz</span>
              </div>
            </div>
          </div>

          <div className="pt-1">
            <button
              onClick={() => setMostrarDetalhesNormal(!mostrarDetalhesNormal)}
              className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-base">{mostrarDetalhesNormal ? 'expand_less' : 'expand_more'}</span>
              {mostrarDetalhesNormal ? t.d13_hide_normal : t.d13_show_normal}
            </button>

            {mostrarDetalhesNormal && (
              <div className="mt-3 bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-xs font-mono space-y-2">
                <div className="flex justify-between text-slate-400"><span>{t.d13_gross_normal}</span><span className="text-slate-200">{fmt(result.salarioBrutoNormal || 0)} Kz</span></div>
                <div className="flex justify-between text-slate-400"><span>{t.d13_inss_normal}</span><span className="text-rose-400">-{fmt(result.inssNormal || 0)} Kz</span></div>
                <div className="flex justify-between text-slate-400"><span>{t.d13_irt_normal}</span><span className="text-rose-400">-{fmt(result.irtNormal || 0)} Kz</span></div>
                <div className="flex justify-between text-emerald-400 font-bold pt-2 border-t border-slate-800">
                  <span>{t.d13_net_normal}</span>
                  <span>{fmt(result.salarioLiquidoNormal || 0)} Kz</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function SimuladorRescisao({ lang }: { lang: Lang }) {
  const t = translations[lang];
  const hoje = new Date().toISOString().split('T')[0];
  const [salario, setSalario] = useState('');
  const [dataEntrada, setDataEntrada] = useState('');
  const [dataSaida, setDataSaida] = useState(hoje);
  const [motivo, setMotivo] = useState('CADUCIDADE');
  const [tipoEmpresa, setTipoEmpresa] = useState('GRANDE');
  const [diasFerias, setDiasFerias] = useState('0');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RescisaoResult | null>(null);
  const [erro, setErro] = useState('');

  const calcular = async () => {
    setErro(''); setResult(null);
    const s = Number(salario.replace(/\D/g, ''));
    if (!s || s <= 0) { setErro(t.res_invalid_salary); return; }
    if (!dataEntrada) { setErro(t.res_invalid_date); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/folha-angola/simular-rescisao`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          salarioBase: s, dataEntrada, dataSaida,
          motivoRescisao: motivo, tipoEmpresa,
          diasFeriasVencidas: Number(diasFerias),
        }),
      });
      const data = await res.json();
      if (!res.ok) { setErro(data.error || 'Erro no cálculo.'); return; }
      setResult(data);
    } catch { setErro(t.sim_no_connection); }
    finally { setLoading(false); }
  };

  const linhaDetalhe = (label: string, value: number, destaque = false, isencao = false) => (
    <div className={`flex justify-between items-center py-2.5 border-b border-slate-800/80 last:border-0 ${destaque ? 'font-black text-white' : ''}`}>
      <span className="text-sm text-slate-300">{label}</span>
      {isencao
        ? <span className="text-xs font-bold text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-800">{t.res_exempt}</span>
        : <span className={`text-sm font-bold ${destaque ? 'text-primary' : 'text-slate-200'}`}>{fmt(value)} Kz</span>
      }
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">{t.res_base}</label>
          <input value={salario} onChange={e => setSalario(Number(e.target.value.replace(/\D/g,'')).toLocaleString('pt-AO'))}
            placeholder="Ex: 200.000"
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm font-bold text-white outline-none focus:border-primary" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">{t.res_entry_date}</label>
          <input type="date" value={dataEntrada} onChange={e => setDataEntrada(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm font-bold text-white outline-none focus:border-primary" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">{t.res_exit_date}</label>
          <input type="date" value={dataSaida} onChange={e => setDataSaida(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm font-bold text-white outline-none focus:border-primary" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">{t.res_reason}</label>
          <select value={motivo} onChange={e => setMotivo(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm font-bold text-white outline-none focus:border-primary">
            <option value="CADUCIDADE">{t.res_reason_caducidade}</option>
            <option value="DESPEDIMENTO_SEM_JUSTA_CAUSA">{t.res_reason_despedimento}</option>
            <option value="DEMISSAO_VOLUNTARIA">{t.res_reason_demissao}</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">{t.res_company_size}</label>
          <select value={tipoEmpresa} onChange={e => setTipoEmpresa(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm font-bold text-white outline-none focus:border-primary">
            <option value="GRANDE">{t.res_size_large}</option>
            <option value="MEDIA">{t.res_size_medium}</option>
            <option value="PEQUENA">{t.res_size_small}</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">{t.res_pending_days}</label>
          <input type="number" min="0" max="66" value={diasFerias} onChange={e => setDiasFerias(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm font-bold text-white outline-none focus:border-primary" />
        </div>
      </div>
      {erro && <p className="text-xs font-bold text-rose-400 bg-rose-950/40 border border-rose-900/50 p-3 rounded-xl">{erro}</p>}
      <button onClick={calcular} disabled={loading}
        className="px-8 py-3 bg-primary hover:bg-primary/95 text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all disabled:opacity-60">
        {loading ? t.res_calculating : t.res_calculate}
      </button>

      {result && (
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-white text-xs uppercase tracking-widest">{t.res_map_title}</h4>
            <span className="text-xs font-bold text-slate-300 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full">
              {result.anosAntiguidade} {t.res_seniority} {result.mesesRestantes} {t.res_seniority_months}
            </span>
          </div>

          <div className="bg-slate-900 rounded-xl p-5 border border-slate-800">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">{t.res_components}</p>
            {linhaDetalhe(t.res_worked_days, result.detalhes.salarioDiasTrabalhadosMes)}
            {linhaDetalhe(t.res_prop_13, result.detalhes.propDecimoTerceiro)}
            {linhaDetalhe(t.res_accrued_holiday, result.detalhes.feriasVencidas)}
            {linhaDetalhe(t.res_holiday_sub_50, result.detalhes.subsidioFeriasVencidas)}
            {linhaDetalhe(t.res_prop_holiday, result.detalhes.propFerias)}
            {linhaDetalhe(t.res_prop_holiday_sub, result.detalhes.subsidioFeriasProp)}
            {result.detalhes.indemnizacao > 0 && linhaDetalhe(t.res_indemnity, result.detalhes.indemnizacao)}
            <div className="mt-3 pt-3 border-t border-slate-700 flex justify-between font-black">
              <span className="text-sm text-slate-300">{t.res_total_gross}</span>
              <span className="text-sm text-white">{fmt(result.totalBruto)} Kz</span>
            </div>
          </div>

          <div className="bg-slate-900 rounded-xl p-5 border border-slate-800">
            <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-3">{t.res_deductions_title}</p>
            {linhaDetalhe(t.res_inss_month, result.descontos.inssColaborador)}
            {linhaDetalhe(t.res_irt_month, result.descontos.irtMes)}
            {linhaDetalhe(t.res_irt_13, result.descontos.irtDecimoTerceiro)}
            <div className="mt-3 pt-3 border-t border-slate-700 flex justify-between font-black">
              <span className="text-sm text-amber-400">{t.res_total_deductions}</span>
              <span className="text-sm text-amber-400">{fmt(result.totalDescontos)} Kz</span>
            </div>
          </div>

          <div className="bg-primary rounded-xl p-5 flex justify-between items-center text-white shadow-lg shadow-primary/20">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest opacity-80">{t.res_total_net}</p>
              <p className="text-2xl font-black">{fmt(result.totalLiquido)} Kz</p>
            </div>
          </div>

          {result.notaIndemnizacao && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
              <p className="text-xs text-slate-300 font-medium">{result.notaIndemnizacao}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SimuladorSalarial({ lang }: { lang: Lang }) {
  const t = translations[lang];
  const [simSalario, setSimSalario] = useState<number>(250000);
  const [simAlimentacao, setSimAlimentacao] = useState<number>(30000);
  const [simTransporte, setSimTransporte] = useState<number>(25000);
  const [regimeTrabalho, setRegimeTrabalho] = useState<string>('conta_outrem');

  const fmt2 = (value: number) =>
    `${value.toLocaleString('pt-AO', { minimumFractionDigits: 0, maximumFractionDigits: 2 })} Kz`;

  const isPrestador = regimeTrabalho === 'prestador';
  const isParticular = regimeTrabalho === 'particular';
  const isEstagiario = regimeTrabalho === 'estagiario';

  const salarioBrutoTotal = simSalario + simAlimentacao + simTransporte;

  const inssCalculado = (isPrestador || isEstagiario) ? 0 : calcularINSS(simSalario);
  const alimentacaoTrib = Math.max(0, simAlimentacao - 30000);
  const transporteTrib = Math.max(0, simTransporte - 30000);

  const materiaColectavel = isPrestador
    ? salarioBrutoTotal
    : Math.max(0, simSalario + alimentacaoTrib + transporteTrib - inssCalculado);

  const irtResult = calcularIRT(materiaColectavel, isPrestador, isParticular, simSalario);
  const irtCalculado = irtResult.valor;
  const faixaAtiva = isPrestador ? (lang === 'pt' ? 'Prestador (Taxa Fixa 6,5%)' : 'Provider (Fixed Rate 6.5%)') : irtResult.faixa;
  const inssPatronal = calcularINSSPatronal(simSalario, isPrestador);
  const custoTotalEmpresa = isPrestador
    ? salarioBrutoTotal
    : salarioBrutoTotal + inssPatronal;
  const totalDescontos = inssCalculado + irtCalculado;
  const salarioLiquido = salarioBrutoTotal - totalDescontos;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">{t.sal_regime}</label>
          <select
            value={regimeTrabalho}
            onChange={(e) => setRegimeTrabalho(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 font-semibold text-white outline-none focus:border-primary transition-all text-sm"
          >
            <option value="conta_outrem">{t.sal_regime_outrem}</option>
            <option value="termo_certo">{t.sal_regime_certo}</option>
            <option value="termo_incerto">{t.sal_regime_incerto}</option>
            <option value="eventual">{t.sal_regime_eventual}</option>
            <option value="prestador">{t.sal_regime_prestador}</option>
            <option value="estagiario">{t.sal_regime_estagiario}</option>
            <option value="particular">{t.sal_regime_particular}</option>
          </select>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
              {isPrestador ? t.sal_base_prestador : t.sal_base}
            </label>
            <span className="text-xs font-bold text-primary font-mono">{fmt2(simSalario)}</span>
          </div>
          <input
            type="number"
            value={simSalario}
            onChange={(e) => setSimSalario(Math.max(0, Number(e.target.value)))}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 font-semibold text-white outline-none focus:border-primary transition-all font-mono"
          />
          <input
            type="range" min="50000" max="1500000" step="1000" value={simSalario}
            onChange={(e) => setSimSalario(Number(e.target.value))}
            className="w-full accent-primary mt-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">{t.sal_food}</label>
            <span className="text-xs font-medium text-slate-400 font-mono">{fmt2(simAlimentacao)}</span>
          </div>
          <input
            type="number" value={simAlimentacao}
            onChange={(e) => setSimAlimentacao(Math.max(0, Number(e.target.value)))}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 font-semibold text-white outline-none focus:border-primary transition-all font-mono"
          />
          <input
            type="range" min="0" max="100000" step="5000" value={simAlimentacao}
            onChange={(e) => setSimAlimentacao(Number(e.target.value))}
            className="w-full accent-primary mt-2"
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">{t.sal_transport}</label>
            <span className="text-xs font-medium text-slate-400 font-mono">{fmt2(simTransporte)}</span>
          </div>
          <input
            type="number" value={simTransporte}
            onChange={(e) => setSimTransporte(Math.max(0, Number(e.target.value)))}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 font-semibold text-white outline-none focus:border-primary transition-all font-mono"
          />
          <input
            type="range" min="0" max="100000" step="5000" value={simTransporte}
            onChange={(e) => setSimTransporte(Number(e.target.value))}
            className="w-full accent-primary mt-2"
          />
        </div>
      </div>

      {/* Resultado */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <h4 className="font-bold text-white text-xs uppercase tracking-widest">{t.sal_result_title}</h4>
          <span className="text-[10px] bg-slate-900 text-slate-400 px-2.5 py-1 rounded-md font-bold uppercase tracking-wider border border-slate-800">
            {faixaAtiva}
          </span>
        </div>

        <div className="space-y-2.5 font-mono text-xs">
          <div className="flex justify-between">
            <span className="text-slate-400">{isPrestador ? t.sal_base_prestador_label : t.sal_base_label}</span>
            <span className="text-slate-200">{fmt2(simSalario)}</span>
          </div>
          <div className="flex justify-between"><span className="text-slate-400">{t.sal_food}</span><span className="text-slate-200">{fmt2(simAlimentacao)}</span></div>
          <div className="flex justify-between"><span className="text-slate-400">{t.sal_transport}</span><span className="text-slate-200">{fmt2(simTransporte)}</span></div>
          <div className="flex justify-between font-bold text-sm pt-2 border-t border-dashed border-slate-800">
            <span className="text-slate-300">{t.sal_total_income}</span>
            <span className="text-white">{fmt2(salarioBrutoTotal)}</span>
          </div>
        </div>

        <div className="space-y-2.5 font-mono text-xs pt-3 border-t border-slate-800">
          <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">{t.sal_deductions}</p>
          <div className="flex justify-between">
            <span className="text-slate-400">{t.sal_inss_worker}</span>
            <span className={inssCalculado === 0 ? 'text-emerald-400 font-semibold' : 'text-rose-400'}>
              {inssCalculado === 0 ? t.sal_inss_exempt : `-${fmt2(inssCalculado)}`}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">
              {isPrestador ? t.sal_irt_prestador : t.sal_irt}
            </span>
            <span className="text-rose-400">-{fmt2(irtCalculado)}</span>
          </div>
          {salarioBrutoTotal > 0 && !isPrestador && inssPatronal > 0 && (
            <div className="flex justify-between pt-1 border-t border-slate-800/50">
              <span className="text-slate-400">{t.sal_inss_employer}</span>
              <span className="text-amber-400 font-bold">+{fmt2(inssPatronal)}</span>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-between items-end">
          <div>
            <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1">{t.sal_net_salary}</p>
            <p className="text-2xl font-black tracking-tight text-white">{fmt2(salarioLiquido)}</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{t.sal_company_cost}</p>
            <p className="text-sm font-bold text-slate-300">{fmt2(custoTotalEmpresa)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FolhaAngolaSection({ lang = 'pt' }: { lang?: Lang }) {
  const t = translations[lang];
  const [lead, setLead] = useState<LeadInfo | null>(null);
  const [simuladorAtivo, setSimuladorAtivo] = useState<'salarial' | 'd13' | 'rescisao'>('salarial');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setLead(JSON.parse(saved));
    } catch { localStorage.removeItem(STORAGE_KEY); }
  }, []);

  const sair = () => {
    setLead(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <section id="folha-angola" className="py-16 bg-slate-950 border-y border-slate-800/80 text-white scroll-mt-20 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
            {t.sim_section_title} <span className="text-primary italic">{t.sim_section_title_highlight}</span>
          </h2>
          <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto font-medium">
            {t.sim_section_desc}
          </p>
        </div>

        {!lead ? (
          <FormularioRegisto onSuccess={(l) => setLead(l)} lang={lang} />
        ) : (
          <div id="simuladores-folha-ao" className="bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 overflow-hidden max-w-5xl mx-auto">
            <div className="bg-slate-950 px-8 py-4 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xs">
                  {lead.nome.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{t.sim_accessed_by}</p>
                  <p className="text-xs text-white font-bold">{lead.nome}</p>
                </div>
              </div>
              <button onClick={sair} className="text-xs text-slate-400 hover:text-white transition-colors font-bold">{t.sim_change_email} &rarr;</button>
            </div>

            <div className="flex border-b border-slate-800 bg-slate-950/50">
              <button onClick={() => setSimuladorAtivo('salarial')}
                className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-all ${simuladorAtivo === 'salarial' ? 'text-primary border-b-2 border-primary bg-primary/10' : 'text-slate-400 hover:text-slate-200'}`}>
                {t.sim_tab_salary}
              </button>
              <button onClick={() => setSimuladorAtivo('d13')}
                className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-all ${simuladorAtivo === 'd13' ? 'text-primary border-b-2 border-primary bg-primary/10' : 'text-slate-400 hover:text-slate-200'}`}>
                {t.sim_tab_13}
              </button>
              <button onClick={() => setSimuladorAtivo('rescisao')}
                className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-all ${simuladorAtivo === 'rescisao' ? 'text-primary border-b-2 border-primary bg-primary/10' : 'text-slate-400 hover:text-slate-200'}`}>
                {t.sim_tab_termination}
              </button>
            </div>

            <div className="p-8">
              {simuladorAtivo === 'salarial' && <SimuladorSalarial lang={lang} />}
              {simuladorAtivo === 'd13' && <SimuladorDecimoTerceiro lang={lang} />}
              {simuladorAtivo === 'rescisao' && <SimuladorRescisao lang={lang} />}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
