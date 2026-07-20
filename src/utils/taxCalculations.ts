const taxasIRT = [
  { faixa: '1º Escalão', excesso: 0, taxa: 0, parcelaFixa: 0 },
  { faixa: '2º Escalão', excesso: 150000, taxa: 16, parcelaFixa: 12500 },
  { faixa: '3º Escalão', excesso: 200000, taxa: 18, parcelaFixa: 31250 },
  { faixa: '4º Escalão', excesso: 300000, taxa: 19, parcelaFixa: 49250 },
  { faixa: '5º Escalão', excesso: 500000, taxa: 20, parcelaFixa: 87250 },
  { faixa: '6º Escalão', excesso: 1000000, taxa: 21, parcelaFixa: 187250 },
  { faixa: '7º Escalão', excesso: 1500000, taxa: 22, parcelaFixa: 292250 },
  { faixa: '8º Escalão', excesso: 2000000, taxa: 23, parcelaFixa: 402250 },
  { faixa: '9º Escalão', excesso: 2500000, taxa: 24, parcelaFixa: 517250 },
  { faixa: '10º Escalão', excesso: 5000000, taxa: 24.5, parcelaFixa: 1117250 },
  { faixa: '11º Escalão', excesso: 10000000, taxa: 25, parcelaFixa: 2342250 },
];

export const roundMoney = (value: number): number => Number(value.toFixed(2));

export const calcularINSS = (salarioBase: number, isPrestador = false, taxa = 0.03): number =>
  isPrestador ? 0 : roundMoney(salarioBase * taxa);

export const calcularIRT = (
  mc: number,
  isPrestador = false,
  isParticular = false,
  salarioBase?: number
): { valor: number; faixa: string } => {
  if (mc <= 0) return { valor: 0, faixa: '1º Escalão' };

  if (isParticular && mc <= 100000) {
    return { valor: 0, faixa: 'Isento (Particular/Doméstico)' };
  }

  if (isPrestador) {
    return { valor: roundMoney(mc * 0.065), faixa: 'Prestador (Taxa Fixa 6,5%)' };
  }

  if (salarioBase !== undefined && salarioBase <= 150000) {
    return { valor: 0, faixa: 'Isento' };
  }

  const f = [...taxasIRT].reverse().find((b) => mc > b.excesso) ?? taxasIRT[0];
  const irt = Math.max(0, roundMoney(f.parcelaFixa + (mc - f.excesso) * (f.taxa / 100)));
  return { valor: irt, faixa: f.faixa };
};

export const calcularINSSPatronal = (salarioBase: number, isPrestador = false, taxa = 0.08): number =>
  isPrestador ? 0 : roundMoney(salarioBase * taxa);
