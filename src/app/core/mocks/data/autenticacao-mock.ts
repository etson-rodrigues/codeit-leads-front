import { LoginRequest } from '../../models/login/login-request.model';
import { LoginResponse } from '../../models/login/login-response.model';
import { LogoutResponse } from '../../models/logout/logout-response.model';

export const mockUserLogin: LoginRequest = {
    email: 'teste@email.com',
    senha: 'senhateste'
};

export const mockLoginResponse: LoginResponse = {
    data: {
        id: 1,
        email: 'teste@email.com',
        accessToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlQHRlc3RlLmNvbSIsIm5iZiI6MTYzNzg0NDc3NywiZXhwIjoxNjM3ODUxOTc3LCJpYXQiOjE2Mzc4NDQ3Nzd9.GOrx8lhhi8gty2M4N_fShDQc-ZxFtSeONIjaNAHbLQw',
        redefinirSenha: false,
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
                        descricao: 'Cadastro de Usuários'
                    }
                }
            ]
        }
    }
};

export const mockLoginResponseRedefinirSenha: LoginResponse = {
    data: {
        ...mockLoginResponse.data,
        redefinirSenha: true
    }
};

export const mockLogoutResponse: LogoutResponse = {
    data: {
        email: 'teste@email.com'
    }
};
