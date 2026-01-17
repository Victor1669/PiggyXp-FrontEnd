import { StyleSheet } from "react-native";

export { FormGlobalStyles, FieldGlobalStyles };

/*
  AQUI É A ESTILIZAÇÃO GLOBAL DOS FORMUÁRIOS,
*/

const FormGlobalStyles = StyleSheet.create({
  form: {
    width: 380,
    margin: "auto",
    alignItems: "center",
  },
  forgotPassword: {
    color: "#fff",
    width: "100%",
    textAlign: "right",
    textDecorationLine: "underline",
  },
  button: {
    marginVertical: 20,
  },
});

const FieldGlobalStyles = StyleSheet.create({
  field: {
    width: "100%",
    marginTop: 40,
  },
  label: {
    color: "#fff",
    position: "absolute",
    left: 10,
    fontSize: 20,
  },
  input: {
    backgroundColor: "rgb(255,255,255,0.30)",
    borderRadius: 10,
    padding: 15,
    color: "#fff",
  },
  error: {
    color: "#f00",
  },
});
