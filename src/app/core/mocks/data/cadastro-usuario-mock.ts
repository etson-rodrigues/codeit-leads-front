import { ConsultaUsuarioView } from 'src/app/view/cadastros-gerais/gerenciamento-usuarios/steps/consulta/consulta.model';
import { AlteracaoUsuarioRequest } from '../../models/gerenciamento-usuarios/alteracao-usuario-request.model';
import { CadastroUsuarioRequest } from '../../models/gerenciamento-usuarios/cadastro-usuario-request.model';
import { CadastroUsuarioResponse } from '../../models/gerenciamento-usuarios/cadastro-usuario-response.model';
import { ConsultaUsuarioResponse } from '../../models/gerenciamento-usuarios/consulta-usuario-response.model';

export const mockCadastroUsuarioRequest: CadastroUsuarioRequest = {
    email: 'teste@email.com',
    senha: 'senhateste',
    perfil: {
        codigo: '002'
    },
    ativo: true,
    redefinirSenha: true,
    usuarioDBJus: {
        nome: "userDBJus_teste",
        senha: "senhaDBJus_teste",
        quantidadeCreditos: 10
    }
};

export const mockCadastroUsuarioResponse: CadastroUsuarioResponse = {
    data: {
        id: 1,
        email: 'teste@email.com',
        perfil: {
            id: 2,
            codigo: '002',
            descricao: 'Operador'
        },
        ativo: true,
        redefinirSenha: true,
        usuarioDBJus: {
            nome: "userDBJus_teste",
            senha: "senhaDBJus_teste",
            quantidadeCreditos: 10
        }
    }
};

export const mockCadastroUsuarioUpdateStatusRequest: AlteracaoUsuarioRequest = {
    id: 1,
    ativo: true
};

export const mockConsultaUsuarioPaginateResponse: ConsultaUsuarioResponse = {
    pageNumber: 1,
    pageSize: 3,
    firstPage: 'https://localhost:5001/api/usuarios?pageNumber=1&pageSize=3',
    lastPage: 'https://localhost:5001/api/usuarios?pageNumber=1&pageSize=3',
    totalPages: 1,
    totalRecords: 1,
    nextPage: null,
    previousPage: null,
    data: [
        {
            id: 1,
            email: 'teste@email.com',
            perfil: {
                codigo: '002',
                descricao: 'Operador',
                acoesSeguranca: [
                    {
                        acaoSeguranca: {
                            codigo: '001',
                            descricao: 'Consulta de Processos'
                        }
                    }
                ]
            },
            ativo: true,
            redefinirSenha: true,
            usuarioDBJus: {
                nome: "userDBJus_teste",
                senha: "senhaDBJus_teste",
                quantidadeCreditos: 10
            }
        }
    ]
};

export const mockConsultaCadastroEdicao: ConsultaUsuarioView = {
    id: 1,
    email: 'teste@email.com',
    senha: "senhateste",
    perfil: {
        codigo: '001',
        descricao: 'Administrador'
    },
    status: {
        ativo: true,
        descricao: 'Ativo'
    },
    usuarioDBJus: {
        nome: "userDBJus_teste",
        senha: "senhaDBJus_teste",
        quantidadeCreditos: 10
    }
};

export const mockConsultaUsuarioAcaoSegurancaCadastro: ConsultaUsuarioResponse = {
    ...mockConsultaUsuarioPaginateResponse,
    data: [
        {
            id: 1,
            email: 'admin@email.com',
            perfil: {
                codigo: '001',
                descricao: 'Administrador',
                acoesSeguranca: [
                    {
                        acaoSeguranca: {
                            codigo: '001',
                            descricao: 'Consulta de Processos'
                        }
                    },
                    {
                        acaoSeguranca: {
                            codigo: '002',
                            descricao: 'Cadastro de Usuarios'
                        }
                    }
                ]
            },
            ativo: true,
            redefinirSenha: false,
            usuarioDBJus: {
                nome: "userDBJus_teste",
                senha: "senhaDBJus_teste",
                quantidadeCreditos: 10
            }
        }
    ]
};

export const mockConsultaUsuarioAcaoSegurancaProcesso: ConsultaUsuarioResponse = {
    ...mockConsultaUsuarioPaginateResponse,
    data: [
        {
            id: 1,
            email: 'operador@email.com',
            perfil: {
                codigo: '002',
                descricao: 'Operador',
                acoesSeguranca: [
                    {
                        acaoSeguranca: {
                            codigo: '001',
                            descricao: 'Consulta de Processos'
                        }
                    }
                ]
            },
            ativo: true,
            redefinirSenha: false,
            usuarioDBJus: {
                nome: "userDBJus_teste",
                senha: "senhaDBJus_teste",
                quantidadeCreditos: 10
            }
        }
    ]
};
