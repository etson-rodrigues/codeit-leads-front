import { formatarDataParaRequest, formatarDataPtBr } from './formatar-data';
import { formatarMoeda } from './formatarMoeda';

describe('Utils', () => {
  it('[CIT-5519] deve retornar a data formatada para formato pt-BR', () => {
    let data = new Date("2021-10-19T16:32:08.3295863");

    let dataFormatada = formatarDataPtBr(data.toString());
    expect(dataFormatada).toEqual('19/10/2021');
  });

  it('[CIT-5596][CIT-CIT-5881] deve retornar a data formatada para formato yyyy-MM-dd', () => {
    let data = "01/03/2022";

    let dataFormatada = formatarDataParaRequest(data);
    expect(dataFormatada).toEqual('2022-03-01');
  });

  it('[CIT-5596] deve retornar valor formatado para moeda brasileira a partir de um número inteiro', () => {
    let valor = 1000;
    let expectedMoedaFormatada = valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    let moedaFormatada = formatarMoeda(1000);

    expect(moedaFormatada).toBe(expectedMoedaFormatada);
  });
});
