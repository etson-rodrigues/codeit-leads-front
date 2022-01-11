export interface ConsultaUsuarioView {
  id: number,
  email: string,
  perfil: {
    codigo: string,
    descricao: string
  },
  status: {
    ativo: boolean,
    descricao: string
  }
}