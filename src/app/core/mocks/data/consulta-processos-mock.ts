import { ConsultaProcessosResponse } from "../../models/consulta-processos";

export const mockConsultaProcessosResponse: ConsultaProcessosResponse = {
  firstPage: "https://localhost:5001/api/processos-judiciais?pageNumber=1&pageSize=3",
  lastPage: "https://localhost:5001/api/processos-judiciais?pageNumber=4&pageSize=3",
  nextPage: "https://localhost:5001/api/processos-judiciais?pageNumber=2&pageSize=3",
  pageNumber: 1,
  pageSize: 3,
  previousPage: null,
  totalPages: 4,
  totalRecords: 10,
  data: [
    {
      numeroUnicoProtocolo: "1111111-11.1111.1.11.1111",
      dataUltimaAtualizacao: "2018-11-21T02:00:00",
      uf: {
        codigo: "19",
        descricao: "RIO DE JANEIRO"
      },
      sumarioInstancias: [
        {
          nomeInstancia: "TRIBUNAL TESTE",
          partesAtivas : ["NOME TESTE UM"],
          partesPassivas: ["BANCO UM", "BANCO DOIS"],
          primeiraData: "2011-02-23T00:00:00"
        }
      ]
    },
    {
      numeroUnicoProtocolo: "2222222-22.2222.2.22.2222",
      dataUltimaAtualizacao: "2019-11-21T02:00:00",
      uf: {
        codigo: "19",
        descricao: "RIO DE JANEIRO"
      },
      sumarioInstancias: [
        {
          nomeInstancia: "TRIBUNAL TESTE",
          partesAtivas : ["NOME TESTE DOIS"],
          partesPassivas: ["BANCO TRÊS", "BANCO QUATRO"],
          primeiraData: "2011-02-23T00:00:00"
        }
      ]
    },
    {
      numeroUnicoProtocolo: "3333333-33.3333.3.33.3333",
      dataUltimaAtualizacao: "2017-11-21T02:00:00",
      uf: {
        codigo: "19",
        descricao: "RIO DE JANEIRO"
      },
      sumarioInstancias: [
        {
          nomeInstancia: "TRIBUNAL TESTE",
          partesAtivas : ["NOME TESTE TRÊS"],
          partesPassivas: ["BANCO CINCO", "BANCO SEIS"],
          primeiraData: "2011-02-23T00:00:00"
        }
      ]
    }
  ]
};