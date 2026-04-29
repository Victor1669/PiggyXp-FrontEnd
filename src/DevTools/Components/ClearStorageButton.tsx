import Button from "Components/Button";
import { useAuth } from "Features/Auth/Contexts/useAuth";

export default function ClearStorageButton() {
  const { logout } = useAuth();

  function handleClearStorage() {
    logout();
  }

  return <Button onPress={handleClearStorage}>Limpar storage</Button>;
}
