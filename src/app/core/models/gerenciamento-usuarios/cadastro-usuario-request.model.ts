export interface CadastroUsuarioRequest {
    email: string;
    senha: string;
    perfil: {
        codigo: string;
    };
    ativo: boolean;
    redefinirSenha: boolean;
    usuarioDBJus: {
        nome: string;
        senha: string;
        quantidadeCreditos: number;
    }
}
