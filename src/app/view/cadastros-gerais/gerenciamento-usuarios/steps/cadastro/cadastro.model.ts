export interface CadastroUsuarioRequest {
  email: string,
  senha: string,
  perfil: {
    codigo: string
  }
}