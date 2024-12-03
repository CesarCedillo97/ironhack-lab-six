import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { login } from "../services/AuthService";

const LoginScreen: React.FC = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const response = await login(username, password);
    if (response.success) {
      navigation.replace("Profile");
    } else {
      setError(response.errorMessage ?? "Login failed");
    }
  };

  const validateFields = (text: string, input: "username" | "password") => {
    const regex =
      input === "username"
        ? /^[a-zA-Z0-9]{0,10}$/ // Alfanumérico, máximo 10 caracteres
        : /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{0,20}$/; // Al menos 1 letra, 1 número, máx. 20 caracteres

    input === "username" ? setUsername(text) : setPassword(text);

    // Validar y mostrar errores
    if (!regex.test(text) && text.length > 0) {
      setError(
        input === "username"
          ? "Username must be alphanumeric and have a maximum of 10 characters."
          : "Password must have at least one letter, one number, and a maximum of 20 characters."
      );
    } else {
      setError(""); // Limpiar error si es válido
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={(text) => validateFields(text, "username")}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => validateFields(text, "password")}
      />
      <Button title="Login" onPress={handleLogin} />
      {error ? <Text>{error}</Text> : null}
    </View>
  );
};

export default LoginScreen;
