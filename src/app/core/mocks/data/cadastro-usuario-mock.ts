import { CadastroUsuarioRequest } from "src/app/view/cadastros-gerais/gerenciamento-usuarios/steps/cadastro/cadastro.model"
import { ConsultaUsuarioView } from "src/app/view/cadastros-gerais/gerenciamento-usuarios/steps/consulta/consulta.model";
import { AtualizarStatusCadastroUsuario, CadastroUsuarioResponse, ConsultaUsuarioPaginateResponse } from "../../models/gerenciamento-usuarios"


export const mockCadastroUsuarioRequest: CadastroUsuarioRequest = {
  email: "teste@email.com",
  senha: "senhateste",
  perfil: {
    codigo: "002"
  },
  ativo: true,
  redefinirSenha: true
};

export const mockCadastroUsuarioResponse: CadastroUsuarioResponse = {
  data: {
    email: "teste@email.com",
    senha: "AAx32wpLE2gbWcOfJJg9+st4mGWxk08BaeqI4bVukBNf3TemM22ePksVgOmRk3EGuQ==",
    perfil: {
      codigo: "002",
      descricao: "Operador"
    },
    ativo: true,
    primeiroAcesso: true
  }
};

export const mockCadastroUsuarioUpdateStatusRequest: AtualizarStatusCadastroUsuario = {
  id: 1,
  email: "teste@email.com",
  status: true
};

export const mockConsultaUsuarioPaginateResponse: ConsultaUsuarioPaginateResponse = {
  pageNumber: 1,
  pageSize: 3,
  firstPage: "https://localhost:5001/api/usuarios?pageNumber=1&pageSize=3",
  lastPage: "https://localhost:5001/api/usuarios?pageNumber=1&pageSize=3",
  totalPages: 1,
  totalRecords: 1,
  nextPage: null,
  previousPage: null,
  data: [{
    id: 1,
    email: "teste@email.com",
    senha: "AF/MU5+na5PFwIZ4ZnyEZZijZVYpgmK4p262YtAb4XWzm4qRWZWNhTWmO+6AkTLuBg==",
    perfil: {
      codigo: "002",
      descricao: "Operador"
    },
    ativo: true,
    primeiroAcesso: true
  }]
};

export const mockConsultaCadastroEdicao: ConsultaUsuarioView = {
  id: 1,
  email: "teste@email.com",
  perfil: {
    codigo: "001",
    descricao: "Administrador"
  },
  status: {
    ativo: true,
    descricao: "Ativo"
  }
};