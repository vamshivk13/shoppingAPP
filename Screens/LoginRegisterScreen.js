import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import LoginScreen from "./LoginScreen";
import CustomButton from "../UI/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import RegisterForm from "../components/RegisterForm";

export default function LoginRegisterScreen() {
  const [isCurLoginState, setIsCurLoginState] = useState(true);
  return (
    <SafeAreaView style={styles.loginContainer}>
      <View>
        <Text style={styles.welcomeText}>Welcome</Text>
      </View>
      <View>
        <Pressable
          onPress={() => {
            setIsCurLoginState(false);
          }}
        >
          <View style={styles.loginState}>
            <Ionicons
              name={isCurLoginState ? "ellipse-outline" : "ellipse"}
              color="orange"
              size={24}
            ></Ionicons>
            <Text>Sign Up</Text>
          </View>
        </Pressable>
        {!isCurLoginState && (
          <RegisterForm setIsCurLoginState={setIsCurLoginState} />
        )}
        <Pressable
          onPress={() => {
            setIsCurLoginState(true);
          }}
        >
          <View style={styles.loginState}>
            <Ionicons
              name={!isCurLoginState ? "ellipse-outline" : "ellipse"}
              color="orange"
              size={24}
            ></Ionicons>
            <Text>Sign In</Text>
          </View>
        </Pressable>
        {isCurLoginState && <LoginScreen></LoginScreen>}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loginState: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  inputs: {
    width: "100%",
  },
  loginContainer: {
    flex: 1,
    marginTop: 30,
  },
  welcomeText: {
    textAlign: "center",
    fontSize: 30,
  },
});
