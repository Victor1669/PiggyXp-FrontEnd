import { View, Text, TouchableOpacity } from "react-native";

import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";

import { TextInput } from "react-native-paper";

import { FieldGlobalStyles, FormGlobalStyles } from "./Form.css";
import { FieldProps, FormProps } from "./FormTypes";

export default function Form({
  formFields,
  title,
  buttonText,
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
        <Text style={FormGlobalStyles.title}>{title}</Text>
        <View>
          {formFields.map((field) => (
            <Field
              key={field.nome}
              nome={field.nome}
              validation={field.validation}
            />
          ))}
        </View>
        <TouchableOpacity
          style={FormGlobalStyles.button}
          onPress={methods.handleSubmit(onSubmit)}
        >
          <Text>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </FormProvider>
  );
}

export function Field({ nome, validation }: FieldProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <View>
      <Controller
        control={control}
        name={nome}
        rules={validation}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={FieldGlobalStyles.input}
            label={nome}
            mode="outlined"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
      />

      <Text style={FieldGlobalStyles.error}>
        {errors[nome]?.message as string}
      </Text>
    </View>
  );
}
