import { View, Text, useWindowDimensions, TextInputProps } from "react-native";
import { Link } from "expo-router";
import {
  Controller,
  FormProvider,
  RegisterOptions,
  useForm,
  useFormContext,
} from "react-hook-form";

import Button from "@Components/Button";
import Input from "@Components/AnimatedInput";

import { FieldGlobalStyles, FormGlobalStyles } from "./Form.css";

export type FieldProps = {
  nomeCampo: string;
  validation: RegisterOptions;
  inputAutoComplete: TextInputProps["autoComplete"];
};

type FormProps = {
  formFields: FieldProps[];
  buttonText: string;
  onSubmit: (data: any) => void;
  defaultValues?: object;
  forgotPasswordText?: string;
  forgotPasswordHREF?: string;
};

export default function Form({
  formFields,
  buttonText,
  forgotPasswordText,
  forgotPasswordHREF = "",
  onSubmit,
  // É UM OBJETO CUJAS CHAVES POSSUEM O MESMO NOME QUE O CAMPO
  defaultValues,
}: FormProps) {
  const methods = useForm({
    defaultValues,
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  return (
    <FormProvider {...methods}>
      <View style={FormGlobalStyles.form}>
        {formFields.map((field) => (
          <Field
            key={field.nomeCampo}
            nomeCampo={field.nomeCampo}
            validation={field.validation}
            inputAutoComplete={field.inputAutoComplete}
          />
        ))}
        {forgotPasswordText ? (
          <Link
            style={FormGlobalStyles.forgotPassword}
            href={forgotPasswordHREF}
          >
            {forgotPasswordText}
          </Link>
        ) : (
          <></>
        )}
        <Button
          testId="submit-button"
          style={FormGlobalStyles.button}
          onPress={methods.handleSubmit(onSubmit)}
        >
          {buttonText}
        </Button>
      </View>
    </FormProvider>
  );
}

export function Field({
  nomeCampo,
  validation,
  inputAutoComplete,
}: FieldProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { width } = useWindowDimensions();

  return (
    <View style={[FieldGlobalStyles.field, { width: width - 40 }]}>
      <Controller
        control={control}
        name={nomeCampo}
        rules={validation}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            inputStyle={FieldGlobalStyles.input}
            labelStyle={FieldGlobalStyles.label}
            testID={nomeCampo}
            label={nomeCampo}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            autoComplete={inputAutoComplete}
          />
        )}
      />

      <Text testID={nomeCampo + "-Error"} style={FieldGlobalStyles.error}>
        {errors[nomeCampo]?.message as string}
      </Text>
    </View>
  );
}
