interface AcaoSeguranca {
    acaoSeguranca: {
        codigo: string;
        descricao: string;
    };
}

export interface Autenticacao {
    id: number;
    email: string;
    redefinirSenha: boolean;
    perfil: {
        codigo: string;
        descricao: string;
        acoesSeguranca: AcaoSeguranca[];
    };
    accessToken: string;
}
