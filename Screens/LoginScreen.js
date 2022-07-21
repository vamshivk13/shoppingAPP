import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import Input from "../UI/Input";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUserDetails, signInAUser } from "../Backend/auth-api";
import CustomButton from "../UI/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { globalActions } from "../store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingin, setIsLoggingin] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  async function handleLogin() {
    try {
      setIsLoggingin(true);
      const user = await signInAUser(email, password);
      const curUserId = user.localId;
      const userDetails = await getUserDetails(curUserId);

      AsyncStorage.setItem("token", user.idToken);
      console.log("curUserIId", curUserId);
      AsyncStorage.setItem("curUser", user.localId);
      dispatch(globalActions.setLoggedInUserDetails(userDetails));
      setIsLoggingin(false);
      dispatch(globalActions.setLoginState(!!user.idToken));
    } catch (err) {
      Alert.alert("Authentication Failed", "An error occured");
    }
  }
  return (
    <View style={styles.loginForm}>
      <Text style={styles.signInText}>Sign In</Text>
      <View style={styles.inputs}>
        <Input
          style={{ borderRaduis: 10 }}
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
      </View>
      <View>
        {isLoggingin && (
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>
            logging in...
          </Text>
        )}
        {!isLoggingin && (
          <CustomButton onPress={handleLogin}>continue</CustomButton>
        )}
      </View>
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

  loginForm: {
    alignItems: "center",
    backgroundColor: "#e3e3e3",
    borderRadius: 20,
    margin: 20,
    padding: 20,
  },
});
