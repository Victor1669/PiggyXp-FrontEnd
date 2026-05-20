import Button from "Components/Button";
import { ModalType, useStatus } from "Contexts/StatusContext";
import { View } from "react-native";

export default function ShowModals() {
  return (
    <View>
      <ModalButton type="loading">Carregamento</ModalButton>
      <ModalButton type="confirmExit">Confirmar Sair Fase</ModalButton>
      <ModalButton type="gameOver">Fim de Jogo</ModalButton>
      <ModalButton type="noInternet">Sem Internet</ModalButton>
    </View>
  );
}

function ModalButton({
  children,
  type,
}: {
  children: string;
  type: ModalType;
}) {
  const { hideStatus, showStatus } = useStatus();

  return (
    <Button
      style={{ marginBottom: 15 }}
      onPress={() => {
        showStatus(type);

        setTimeout(() => {
          hideStatus();
        }, 2000);
      }}
    >
      {children}
    </Button>
  );
}
