import { RegisterOptions } from "react-hook-form";

import { FieldProps } from "@Components/Form/Form";

const FieldsValidation: Record<string, RegisterOptions> = {
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

enum Option {
  "Nome" = "Nome",
  "Email" = "Email",
  "Senha" = "Senha",
}

export const Fields: Record<Option, FieldProps> = {
  Nome: {
    nomeCampo: "Nome",
    validation: FieldsValidation.Nome,
    inputAutoComplete: "name",
  },
  Email: {
    nomeCampo: "Email",
    validation: FieldsValidation.Email,
    inputAutoComplete: "email",
  },
  Senha: {
    nomeCampo: "Senha",
    validation: FieldsValidation.Senha,
    inputAutoComplete: "current-password",
  },
};
