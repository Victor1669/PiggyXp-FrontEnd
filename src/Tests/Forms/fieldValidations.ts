// Helpers/fieldValidations.ts

export const fieldValidations = {
  Nome: [
    { value: "", error: "O nome é obrigatório" },
    { value: "tes", error: "O nome deve possuir no mínimo 4 caracteres" },
  ],
  Email: [
    { value: "", error: "O email é obrigatório" },
    { value: "test", error: "Email inválido" },
    { value: "test.com", error: "Email inválido" },
    { value: "@gmail.com", error: "Email inválido" },
    { value: "test@gmail.com", error: "" },
  ],
  Senha: [
    { value: "", error: "A senha é obrigatória" },
    { value: "teste", error: "A senha deve possuir no mínimo 6 caracteres" },
    {
      value: "testeteste",
      error: "A senha deve conter ao menos um caractere especial",
    },
    {
      value: "testeteste@.",
      error: "A senha deve conter letras minúsculas e maiúsculas",
    },
  ],
} as const;

export type FieldName = keyof typeof fieldValidations;
