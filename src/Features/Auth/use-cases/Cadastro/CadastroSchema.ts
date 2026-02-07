import { RegisterOptions } from "react-hook-form";

import { type FieldProps } from "@Components/Form/Form";

const CadastroValidation: Record<string, RegisterOptions> = {
  Nome: {
    required: {
      value: true,
      message: "O nome é obrigatório",
    },
    minLength: {
      value: 4,
      message: "O nome deve possuir no mínimo 4 caracteres",
    },
  },
  Email: {
    required: {
      value: true,
      message: "O email é obrigatório",
    },
    validate: {
      emailEstaValido: (valor) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor) || "Email inválido",
    },
  },
  Senha: {
    required: {
      value: true,
      message: "A senha é obrigatória",
    },
    minLength: {
      value: 6,
      message: "A senha deve possuir no mínimo 6 caracteres",
    },
    validate: {
      possuiCaractereEspecial: (valor) =>
        /[!@#$%&*<>]/.test(valor) ||
        "A senha deve conter ao menos um caractere especial",

      possuiLetraMinusculaOuMaiuscula: (valor) =>
        /(?=.*[a-z])(?=.*[A-Z])/.test(valor) ||
        "A senha deve conter letras minúsculas e maiúsculas",
    },
  },
};

export const CadastroFields: FieldProps[] = [
  {
    nomeCampo: "Nome",
    validation: CadastroValidation.Nome,
    inputAutoComplete: "given-name",
  },
  {
    nomeCampo: "Email",
    validation: CadastroValidation.Email,
    inputAutoComplete: "email",
  },
  {
    nomeCampo: "Senha",
    validation: CadastroValidation.Senha,
    inputAutoComplete: "password",
  },
];
