import { CadastroUsuarioResponse } from '../../models/gerenciamento-usuarios/cadastro-usuario-response.model';

export const mockUserRedefinirSenhaResponse: CadastroUsuarioResponse = {
    data: {
        id: 1,
        email: 'teste@email.com',
        ativo: true,
        redefinirSenha: false,
        perfil: {
            id: 2,
            codigo: '002',
            descricao: 'Operador'
        },
        usuarioDBJus: {
            nome: "userDBJus_teste",
            senha: "senhaDBJus_teste",
            quantidadeCreditos: 10
        }
    }
};
