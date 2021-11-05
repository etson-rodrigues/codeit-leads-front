import { ErrorResponse } from "src/app/shared/components/message-tracker/message-tracker.component";

export const mockError: ErrorResponse = {
  status: 500,
  title: 'Erro de teste',
  errors: {
    "ValidationsErrors": [
      "Deve ser informada uma renda mensal válida, maior que 0 (zero)."
    ]
  }
}

export const mockError1: ErrorResponse = {
  status: 500,
  title: 'Erro de teste 1',
  errors: {
    "ValidationsErrors": [
      "Campo obrigatório"
    ]
  }
}

export const mockError2: ErrorResponse = {
  status: 500,
  title: 'Erro de teste 2',
  errors: {
    "ValidationsErrors": [
      "Valor minimo 4"
    ]
  }
}