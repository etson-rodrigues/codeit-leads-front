import { formatarData } from './formatarData';
import { formatarMoeda } from './formatarMoeda';

describe('Utils', () => {
  it('[CIT-5519] deve retornar a data formatada para formato pt-BR', () => {
    let data = new Date("2021-10-19T16:32:08.3295863");

    let dataFormatada = formatarData(data.toString());
    expect(dataFormatada).toEqual('19/10/2021');
  });

  it('[CIT-5596] deve retornar a data formatada para formato en-US', () => {
    let data = new Date("2021-10-19T16:32:08.3295863");

    let dataFormatada = formatarData(data.toString(), true);
    expect(dataFormatada).toEqual('2021-10-19');
  });

  it('[CIT-5596] deve retornar valor formatado para moeda brasileira a partir de um número inteiro', () => {
    let valor = 1000;
    let expectedMoedaFormatada = valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    let moedaFormatada = formatarMoeda(1000);

    expect(moedaFormatada).toBe(expectedMoedaFormatada);
  });
});
