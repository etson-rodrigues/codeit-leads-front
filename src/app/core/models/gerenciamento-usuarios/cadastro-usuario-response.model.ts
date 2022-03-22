import { Autenticacao } from '../autenticacao/autenticacao.model';
import { AbstractResponse } from '../comum/abstract-response';

interface CadastroUsuarioResponseData extends Omit<Autenticacao, 'perfil' | 'accessToken'> {
    ativo: boolean;
    perfil: {
        id: number;
        codigo: string;
        descricao: string;
    };
}

export interface CadastroUsuarioResponse extends AbstractResponse<CadastroUsuarioResponseData> {}
