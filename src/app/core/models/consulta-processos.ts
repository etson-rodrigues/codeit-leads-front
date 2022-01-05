export interface CadastroUsuarioResponseData {
  numeroUnicoProtocolo: string,
  uf: {
    codigo: string,
    descricao: string
  },
  sumarioInstancias: [
    {
      nomeInstancia: string,
      partesAtivas: string[],
      partesPassivas: string[],
      primeiraData: string
    }
  ],
  dataUltimaAtualizacao: string
}

export interface ConsultaProcessosResponse {
  pageNumber: number,
  pageSize: number,
  firstPage: string,
  lastPage: string,
  totalPages: number,
  totalRecords: number,
  nextPage: string | null,
  previousPage: string | null,
  data: CadastroUsuarioResponseData[]
}