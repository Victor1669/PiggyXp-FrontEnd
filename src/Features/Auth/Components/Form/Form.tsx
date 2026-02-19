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
import AnimatedInput from "@Auth/Components/AnimatedInput";

import { FieldGlobalStyles, FormGlobalStyles } from "./Form.css";
const { button, forgotPassword, form } = FormGlobalStyles;
const { error, field, fieldsContainer, input, label } = FieldGlobalStyles;

export type FieldProps = {
  nomeCampo: string;
  validation: RegisterOptions;
  inputAutoComplete: TextInputProps["autoComplete"];
};

type FormProps = {
  formFields: FieldProps[];
  buttonText: string;
  onSubmit: (formData: any) => void;
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
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  return (
    <FormProvider {...methods}>
      <View style={form}>
        <View style={fieldsContainer}>
          {formFields.map((field) => (
            <Field
              key={field.nomeCampo}
              nomeCampo={field.nomeCampo}
              validation={field.validation}
              inputAutoComplete={field.inputAutoComplete}
            />
          ))}
        </View>
        {forgotPasswordText ? (
          <Link style={forgotPassword} href={forgotPasswordHREF}>
            {forgotPasswordText}
          </Link>
        ) : (
          <></>
        )}
        <Button
          testId="submit-button"
          style={button}
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
    formState: { errors, isSubmitted, isSubmitSuccessful },
  } = useFormContext();

  const { width } = useWindowDimensions();

  const errorMessage = errors[nomeCampo]?.message;
  const hasError = !!errors[nomeCampo];

  return (
    <View style={[field, { width: width - 40 }]}>
      <Controller
        control={control}
        name={nomeCampo}
        rules={validation}
        render={({ field: { onChange, onBlur, value } }) => (
          <AnimatedInput
            inputStyle={[
              input,
              {
                backgroundColor: !isSubmitted
                  ? "rgba(255, 255, 255, 0.3)"
                  : hasError
                    ? "rgba(255, 46, 46, 0.39)"
                    : "rgba(0, 255, 0, 0.3)",
              },
            ]}
            labelStyle={label}
            testID={nomeCampo}
            label={nomeCampo}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            autoComplete={inputAutoComplete}
          />
        )}
      />

      <Text testID={nomeCampo + "-Error"} style={error}>
        {errorMessage as string}
      </Text>
    </View>
  );
}
