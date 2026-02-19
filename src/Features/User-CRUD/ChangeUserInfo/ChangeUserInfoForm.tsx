import { Fields } from "@Auth/Schemas/SchemaFields";

import Form from "@Auth/Components/Form/Form";

interface ChangeUserInfoFormProps {
  onSubmit: (data: any) => Promise<void>;
  defaultValues: object;
}

export default function ChangeUserInfoForm({
  onSubmit,
  defaultValues,
}: ChangeUserInfoFormProps) {
  return (
    <Form
      onSubmit={onSubmit}
      buttonText="Salvar"
      formFields={[Fields.Nome, Fields.Email]}
      defaultValues={defaultValues}
    />
  );
}
