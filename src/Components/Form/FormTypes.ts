import { RegisterOptions } from "react-hook-form";

type FormProps = {
  formFields: FieldProps[];
  title: string;
  buttonText: string;
  onSubmit: (data: any) => void;
  defaultValues: object;
};

type FieldProps = {
  nome: string;
  validation: RegisterOptions;
};

export type { FormProps, FieldProps };
