import { LoginRequest } from "src/app/view/login/login.model"
import { LoginResponse } from "../../models/autenticacao"

export const mockUserLogin: LoginRequest = {
  email: "teste@email.com",
  senha: "senhateste"
}

export const mockLoginResponse: LoginResponse = {
  data: {
    email: "teste@email.com",
    accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlQHRlc3RlLmNvbSIsIm5iZiI6MTYzNzg0NDc3NywiZXhwIjoxNjM3ODUxOTc3LCJpYXQiOjE2Mzc4NDQ3Nzd9.GOrx8lhhi8gty2M4N_fShDQc-ZxFtSeONIjaNAHbLQw",
    profile: {
      access: ['cadastro-usuario', 'consulta-processos'],
      type: "Administrador"
    }
  }
}