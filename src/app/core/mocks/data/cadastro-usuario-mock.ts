import { CadastroUsuarioRequest } from "src/app/view/cadastros-gerais/gerenciamento-usuarios/steps/cadastro/cadastro.model"
import { CadastroUsuarioResponse } from "../../models/cadastro-usuario"


export const mockCadastroUsuarioRequest: CadastroUsuarioRequest = {
  email: "teste@email.com",
  senha: "senhateste",
  perfil: {
    codigo: "002"
  }
}

export const mockCadastroUsuarioResponse: CadastroUsuarioResponse = {
  data: {
    email: "teste@email.com",
    senha: "AAx32wpLE2gbWcOfJJg9+st4mGWxk08BaeqI4bVukBNf3TemM22ePksVgOmRk3EGuQ==",
    perfil: {
      codigo: "002",
      descricao: "Operador"
    },
    ativo: true,
    primeiroAcesso: true,
  }
}