import { Autenticacao } from '../autenticacao/autenticacao.model';
import { AbstractResponse } from '../comum/abstract-response';

export interface LoginResponse extends AbstractResponse<Autenticacao> {}
