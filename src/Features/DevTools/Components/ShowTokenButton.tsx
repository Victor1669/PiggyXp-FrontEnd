import React from "react";

import { useAuth } from "Features/Auth/Contexts/useAuth";

import Button from "Components/Button";

export default function ShowTokenButton() {
  const { userToken } = useAuth();

  async function handleShowToken() {
    const token = await userToken.get();
    console.log(token);
  }
  return <Button onPress={handleShowToken}>Mostrar Token</Button>;
}
