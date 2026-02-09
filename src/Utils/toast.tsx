import Toast, { BaseToast, ToastType } from "react-native-toast-message";

interface toastMessageProps {
  type: ToastType;
  text: string;
}

export function ToastContainer() {
  return (
    <Toast
      position="top"
      swipeable={true}
      config={{
        customSuccess: (props) => (
          <BaseToast {...props} text1Style={{ color: "#f00", fontSize: 30 }} />
        ),
      }}
    />
  );
}

/**
 * Função para chamar mensagens toast de forma simples
 */
export function toastMessage({ type, text }: toastMessageProps) {
  Toast.show({
    /**
     * Pode escolher as opções padrão, ou criar uma personalizada no arquivo toast.jsx
     */
    type,
    text1: text,
  });
}
