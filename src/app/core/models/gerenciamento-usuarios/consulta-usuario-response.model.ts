import { Autenticacao } from '../autenticacao/autenticacao.model';
import { Paginate } from '../comum/paginate.model';

export interface ConsultaUsuarioResponseData extends Omit<Autenticacao, 'accessToken'> {
    ativo: boolean;
}

export interface ConsultaUsuarioResponse extends Paginate {
    data: ConsultaUsuarioResponseData[];
}
