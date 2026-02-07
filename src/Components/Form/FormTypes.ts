import { RegisterOptions } from "react-hook-form";

type FormProps = {
  formFields: FieldProps[];
  buttonText: string;
  onSubmit: (data: any) => void;
  defaultValues?: object;
  forgotPasswordText?: string;
  forgotPasswordHREF?: string;
};

type FieldProps = {
  nomeCampo: string;
  validation: RegisterOptions;
};

export type { FormProps, FieldProps };
