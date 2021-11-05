export function formatarMoeda(moeda: number) {
  return moeda.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}