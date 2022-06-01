export interface HistoricoConsultasRequest {
    usuarioEmail: string | null;
    tipoConsulta: string | null;
    situacaoConsulta: string | null;
    dataInicial: string | null;
    dataFinal: string;
}
