export interface ConsultaUsuarioView {
    id: number;
    email: string;
    senha: string;
    perfil: {
        codigo: string;
        descricao: string;
    };
    status: {
        ativo: boolean;
        descricao: string;
    };
    usuarioDBJus: {
        nome: string;
        senha: string;
        quantidadeCreditos: number;
    }
}
