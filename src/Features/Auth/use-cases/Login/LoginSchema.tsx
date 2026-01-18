import { RegisterOptions } from "react-hook-form";

export const LoginSchema: Record<string, RegisterOptions> = {
  Email: {
    required: {
      value: true,
      message: "O email é obrigatório!",
    },
    validate: {
      emailEstaValido: (valor) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor) || "Email inválido",
    },
  },
  Senha: {
    required: {
      value: true,
      message: "A senha é obrigatória!",
    },
    minLength: {
      value: 6,
      message: "A senha deve possuir no mínimo 6 caracteres!",
    },
    validate: {
      possuiCaractereEspecial: (valor) =>
        /[!@#$%&*<>]/.test(valor) ||
        "A senha deve conter ao menos um caractere especial",

      possuiLetraMinusculaOuMaiuscula: (valor) =>
        /(?=.*[a-z])(?=.*[A-Z])/.test(valor) ||
        "A senha deve  conter letras minúsculas e maiúsculas",
    },
  },
};
