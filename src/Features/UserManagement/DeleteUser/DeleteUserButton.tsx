import Button from "@Components/Button";

import { useAuth } from "@UseAuth";

export default function DeleteUserButton() {
  const { user } = useAuth();

  function handleDeleteAccount() {
    console.log(user);
  }

  return <Button onPress={handleDeleteAccount}>Apagar conta</Button>;
}
