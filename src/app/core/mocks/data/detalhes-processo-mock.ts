import { DetalhesProcessoView } from 'src/app/view/processos-judiciais/consulta-geral/detalhes-processo/detalhes-processo.model';
import { DetalhesProcessoResponse, DetalhesProcesso } from '../../models/detalhes-processo/detalhes-processo-response.model';

export const mockDetalhesProcessoResponseData: DetalhesProcesso = {
    nup: '0000117-36.2022.5.09.0004',
    valorCausa: 'R$ 68620,37',
    vara: '04ª VARA DO TRABALHO DE CURITIBA',
    dataAutuacao: '2022-02-16T02:00:00',
    comarca: 'CURITIBA',
    uf: {
        codigo: '16',
        descricao: 'PARANÁ'
    },
    dataInicial: '2022-02-16T02:00:00',
    partes: {
        partesAtivas: [
            {
                tipo: "",
                nome: "JOANATAN DIAS DO CARMO",
                cpf: "",
                cnpj: ""
            }
        ],
        partesPassivas: [
            {
                tipo: "",
                nome: "SEJEAN SISTEMAS DE SEGURANCA ELETRONICA LTDA - ME",
                cpf: "",
                cnpj: ""
            },
            {
                tipo: "",
                nome: "CLARO S.A.",
                cpf: "",
                cnpj: ""
            }
        ],
        outrasPartes: [
            {
                tipo: "",
                nome: "JOAO CLAIR DE ANDRADE GONCALVES",
                cpf: "",
                cnpj: ""
            }
        ]
    },
    partesReceitaPj: [],
    andamentos: [
        {
            data: '2019-07-26T02:00:00',
            descricao: 'REMESSA PARA 2ª INSTÂNCIA DE AÇÃO TRABALHISTA (ORDINÁRIO)',
            detalhes: 'ENVIADO PARA 2ª INST NO LOTE 2013/ 216'
        },
        {
            data: '2019-07-26T02:00:00',
            descricao: 'PROTOCOLO DE PETIÇÃO DE CONTRARRAZÕES R.A.',
            detalhes: 'NÚMERO DO PROTOCOLO: 60945 VENCIMENTO: 28/08/2013 NOME: NET SÃO PAULO LTDA'
        },
        {
            data: '2019-07-26T02:00:00',
            descricao: 'PUBLICAÇÃO DE INTIMAÇÃO CONTRA-ARRAZOAR R.A.',
            detalhes: 'PARA O(S) RÉU(S) ED.Nº 2646 SOL.Nº 1490'
        },
        {
            data: '2018-07-26T02:00:00',
            descricao: 'PUBLICAÇÃO DE EDITAL',
            detalhes: 'EDITAL 219/2016 PUBLICADO NO DOE Nº 3333, EM 16/08/2016'
        },
        {
            data: '2018-07-26T02:00:00',
            descricao: 'PUBLICAÇÃO DE CONVERSÃO PARA MEIO ELETRÔNICO',
            detalhes: 'PARA O(S) AUTOR(ES) E RÉU(S) ED.Nº 3333 SOL.Nº 4937'
        },
        {
            data: '2018-07-26T02:00:00',
            descricao: 'ARQUIVAMENTO DE AÇÃO TRABALHISTA (ORDINÁRIO)',
            detalhes: 'NRO DA RELAÇÃO: 284/2016 DATA: 11/08/2016 QTDE VOLS.: 2'
        },
        {
            data: '2018-07-26T02:00:00',
            descricao: 'CONVERTIDA A TRAMITAÇÃO DO PROCESSO',
            detalhes: 'DO MEIO FÍSICO PARA O ELETRÔNICO'
        },
        {
            data: '2017-07-26T02:00:00',
            descricao: 'RECEBIMENTO -2ª INST.(SRA/DF) AÇÃO TRABALHISTA (ORDINÁRIO)',
            detalhes: 'ENVIADO PARA 2ª INST NO LOTE 2013/ 216'
        },
        {
            data: '2017-07-26T02:00:00',
            descricao: 'PROTOCOLO DE PETIÇÃO DE RECURSO ADESIVO',
            detalhes: 'NÚMERO DO PROTOCOLO: 5660526 NOME: JOSELINO NEVES DE JESUS'
        },
        {
            data: '2017-07-26T02:00:00',
            descricao: 'PROTOCOLO DE PETIÇÃO DE RECURSO ADESIVO',
            detalhes: 'NÚMERO DO PROTOCOLO: 5660526 NOME: JOSELINO NEVES DE JESUS'
        },
        {
            data: '2017-07-26T02:00:00',
            descricao: 'PROTOCOLO DE PETIÇÃO DE RECURSO ADESIVO',
            detalhes: 'NÚMERO DO PROTOCOLO: 5660526 NOME: JOSELINO NEVES DE JESUS'
        },
        {
            data: '2017-07-26T02:00:00',
            descricao: 'PROTOCOLO DE PETIÇÃO DE RECURSO ADESIVO',
            detalhes: 'NÚMERO DO PROTOCOLO: 5660526 NOME: JOSELINO NEVES DE JESUS'
        }
    ]
};

export const mockDetalhesProcessoResponse: DetalhesProcessoResponse = {
    data: [mockDetalhesProcessoResponseData]
};

export const mockDetalhesProcessoView: DetalhesProcessoView = {
    nup: '0000117-36.2022.5.09.0004',
    valorCausa: 'R$ 68620,37',
    vara: '04ª VARA DO TRABALHO DE CURITIBA',
    dataAutuacao: '16/02/2022',
    comarca: 'CURITIBA',
    uf: 'PARANÁ',
    dataInicial: '16/02/2022',
    ativas: [
        {
            tipo: "",
            nome: "JOANATAN DIAS DO CARMO",
            cpf: "",
            cnpj: ""
        }
    ],
    passivas: [
        {
            tipo: "",
            nome: "SEJEAN SISTEMAS DE SEGURANCA ELETRONICA LTDA - ME",
            cpf: "",
            cnpj: ""
        },
        {
            tipo: "",
            nome: "CLARO S.A.",
            cpf: "",
            cnpj: ""
        }
    ],
    outras: [
        {
            tipo: "",
            nome: "JOAO CLAIR DE ANDRADE GONCALVES",
            cpf: "",
            cnpj: ""
        }
    ],
    partesReceitaPj: [],
    andamentos: [
        {
            data: '26/07/2019',
            descricao: 'REMESSA PARA 2ª INSTÂNCIA DE AÇÃO TRABALHISTA (ORDINÁRIO)',
            detalhe: 'ENVIADO PARA 2ª INST NO LOTE 2013/ 216'
        },
        {
            data: '26/07/2019',
            descricao: 'PROTOCOLO DE PETIÇÃO DE CONTRARRAZÕES R.A.',
            detalhe: 'NÚMERO DO PROTOCOLO: 60945 VENCIMENTO: 28/08/2013 NOME: NET SÃO PAULO LTDA'
        },
        {
            data: '26/07/2019',
            descricao: 'PUBLICAÇÃO DE INTIMAÇÃO CONTRA-ARRAZOAR R.A.',
            detalhe: 'PARA O(S) RÉU(S) ED.Nº 2646 SOL.Nº 1490'
        },
        {
            data: '26/07/2018',
            descricao: 'PUBLICAÇÃO DE EDITAL',
            detalhe: 'EDITAL 219/2016 PUBLICADO NO DOE Nº 3333, EM 16/08/2016'
        },
        {
            data: '26/07/2018',
            descricao: 'PUBLICAÇÃO DE CONVERSÃO PARA MEIO ELETRÔNICO',
            detalhe: 'PARA O(S) AUTOR(ES) E RÉU(S) ED.Nº 3333 SOL.Nº 4937'
        },
        {
            data: '26/07/2018',
            descricao: 'ARQUIVAMENTO DE AÇÃO TRABALHISTA (ORDINÁRIO)',
            detalhe: 'NRO DA RELAÇÃO: 284/2016 DATA: 11/08/2016 QTDE VOLS.: 2'
        },
        {
            data: '26/07/2018',
            descricao: 'CONVERTIDA A TRAMITAÇÃO DO PROCESSO',
            detalhe: 'DO MEIO FÍSICO PARA O ELETRÔNICO'
        },
        {
            data: '26/07/2017',
            descricao: 'RECEBIMENTO -2ª INST.(SRA/DF) AÇÃO TRABALHISTA (ORDINÁRIO)',
            detalhe: 'ENVIADO PARA 2ª INST NO LOTE 2013/ 216'
        },
        {
            data: '26/07/2017',
            descricao: 'PROTOCOLO DE PETIÇÃO DE RECURSO ADESIVO',
            detalhe: 'NÚMERO DO PROTOCOLO: 5660526 NOME: JOSELINO NEVES DE JESUS'
        },
        {
            data: '26/07/2017',
            descricao: 'PROTOCOLO DE PETIÇÃO DE RECURSO ADESIVO',
            detalhe: 'NÚMERO DO PROTOCOLO: 5660526 NOME: JOSELINO NEVES DE JESUS'
        }
    ]
};
