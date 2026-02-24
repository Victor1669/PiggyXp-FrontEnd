import { useRouter } from "expo-router";
import { useState } from "react";

import { useAuth } from "@Auth/Contexts/useAuth";
import { useShowLoadingScreen } from "Contexts/useShowLoadingScreen";
import { useInternetConnection } from "Contexts/useInternetConnection";
import { DeleteUserService } from "@Auth/Services/DeleteUser";

import { toastMessage } from "Utils/toast";

import Button from "@Components/Button";
import { Modal, Pressable, Text, View } from "react-native";

export default function DeleteUserButton() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const router = useRouter();

  const { user, userToken, logout } = useAuth();
  const { setShowLoadingScreen } = useShowLoadingScreen();
  const { getIsConnected } = useInternetConnection();

  async function handleDeleteAccount() {
    if (!getIsConnected()) return;
    setShowLoadingScreen(true);

    const token = await userToken.get();
    const { data, status } = await DeleteUserService(user.id, token);

    if (status < 300) {
      await logout();
      toastMessage({ type: "success", text: data.message });
      router.replace("/Cadastro");
    } else if (data === "jwt expired") {
      toastMessage({ type: "info", text: "Token expirado, refaça o login!" });
      router.replace("/Login");
    }

    setShowLoadingScreen(false);
  }

  return (
    <>
      <Button
        fontColor="#fff"
        shadowColor="rgb(139, 0, 0)"
        style={{ backgroundColor: "rgb(255, 57, 57)" }}
        onPress={() => setShowDeleteModal(true)}
      >
        Apagar conta
      </Button>
      {showDeleteModal && (
        <DeleteUserModal
          setShowDeleteModal={setShowDeleteModal}
          handleDeleteAccount={handleDeleteAccount}
        />
      )}
    </>
  );
}

function DeleteUserModal({
  setShowDeleteModal,
  handleDeleteAccount,
}: {
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteAccount: () => Promise<void>;
}) {
  return (
    <Modal transparent>
      <View
        style={{
          backgroundColor: "rgba(0,0,0, 0.85)",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pressable
          onPress={() => setShowDeleteModal(false)}
          style={{
            backgroundColor: "red",
            paddingHorizontal: 10,
            position: "absolute",
            top: 0,
            left: 0,
            marginLeft: 20,
            marginTop: 50,
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 32,
            }}
          >
            X
          </Text>
        </Pressable>
        <Text
          style={{
            color: "#fff",
            fontSize: 24,
            width: "70%",
            textAlign: "justify",
            marginBottom: 30,
          }}
        >
          Certeza de que você quer deletar sua conta?
        </Text>
        <Button
          fontColor="#fff"
          shadowColor="rgb(139, 0, 0)"
          style={{ backgroundColor: "rgb(255, 57, 57)" }}
          onPress={() => {
            setShowDeleteModal(false);
            handleDeleteAccount();
          }}
        >
          Apagar
        </Button>
      </View>
    </Modal>
  );
}
