import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import Input from "../UI/Input";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../UI/CustomButton";
import { signUpAUser, addUserToDatabase } from "../Backend/auth-api";

export default function RegisterForm({ setIsCurLoginState }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  async function handleRegistration() {
    const isPasswordValid = password.length > 6 && password == cnfPassword;
    if (!isPasswordValid) {
      Alert.alert("Invalid Input", "Please check your email & password");
      return;
    }
    try {
      const user = await signUpAUser(email, password);
      console.log("signup Info", user);
      await addUserToDatabase({
        userId: user.localId,
        userName: name,
        email: email,
      });
      setCnfPassword("");
      setEmail("");
      setName("");
      setPassword("");
      Alert.alert("Success", "Successfully Registered !", [
        {
          text: "ok",
          onPress: () => setIsCurLoginState(true),
          style: "destructive",
        },
      ]);
      setIsCurLoginState(true);
    } catch (err) {
      Alert.alert("Signup failed", "an error occured");
    }
  }
  return (
    <View style={styles.loginForm}>
      <Text style={styles.signInText}>Sign In</Text>
      <View style={styles.inputs}>
        <Input
          value={name}
          onChangeText={(e) => {
            setName(e);
          }}
          placeholder="name"
        />
        <Input
          placeholder="email"
          value={email}
          onChangeText={(e) => {
            setEmail(e);
          }}
        />
        <Input
          value={password}
          secureTextEntry={true}
          placeholder="password"
          onChangeText={(e) => {
            setPassword(e);
          }}
        />
        <Input
          secureTextEntry={true}
          value={cnfPassword}
          placeholder="confirm password"
          onChangeText={(e) => {
            setCnfPassword(e);
          }}
        />
      </View>
      <CustomButton onPress={handleRegistration}>continue</CustomButton>
    </View>
  );
}

const styles = StyleSheet.create({
  inputs: {
    width: "100%",
  },
  signInText: {
    fontSize: 18,
  },
  welcomeText: {
    textAlign: "center",
    fontSize: 30,
  },
  loginContainer: {
    flex: 1,
    marginTop: 30,
  },
  loginForm: {
    alignItems: "center",
    backgroundColor: "#e3e3e3",
    borderRadius: 20,
    margin: 20,
    padding: 20,
  },
});
