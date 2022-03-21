export interface ExportarProcessosRequest {
  razaoSocial: string;
  criterioData?: string;
  dataInicial?: string;
  dataFinal: string;
}