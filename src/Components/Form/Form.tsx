import { View, Text } from "react-native";
import { Link } from "expo-router";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";

import Button from "../Button/Button";
import Input from "../AnimatedInput";

import { FieldProps, FormProps } from "./FormTypes";
import { FieldGlobalStyles, FormGlobalStyles } from "./Form.css";

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
          style={FormGlobalStyles.button}
          onPress={methods.handleSubmit(onSubmit)}
        >
          {buttonText}
        </Button>
      </View>
    </FormProvider>
  );
}

export function Field({ nomeCampo, validation }: FieldProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <View style={FieldGlobalStyles.field}>
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
          />
        )}
      />

      <Text testID={nomeCampo + "-Error"} style={FieldGlobalStyles.error}>
        {errors[nomeCampo]?.message as string}
      </Text>
    </View>
  );
}
