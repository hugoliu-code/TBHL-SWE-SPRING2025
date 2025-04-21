import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  Platform,
  TextInput,
  Button,
  View,
} from "react-native";
import { Link } from "expo-router";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  AuthError,
  UserCredential,
} from "firebase/auth";
import { auth } from "../../keys/firebase_auth";

export default function TabTwoScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoggedIn, setLogged] = useState("");
  const navigation = useNavigation();
  // var isLoggedIn = false;

  const createUser = async () => {
    try {
      console.log(username + " " + password);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );
      const user = userCredential.user;
      // isLoggedIn = true;
      setLogged(true);
      setSuccessMessage(
        "Success! You're logged in, and ready to Stretch with Stretch Sensei!"
      );
      setErrorMessage("");
    } catch (error) {
      const authError = error as AuthError;

      if (authError.code === "auth/user-not-found") {
        try {
          // Create user if not found
          const signUpResult = await createUserWithEmailAndPassword(
            auth,
            username,
            password
          );
          const url = "http://localhost:5000/create_new_user";
          const payload = {
            UID: username,
            // password: password,
          };

          try {
            const response = await fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
            });

            // console.log(payload);
            console.log(JSON.stringify(payload));
            console.log(response);

            const result = await response.json();
            console.log(result);

            if (response.ok) {
              // isLoggedIn = true;
              setLogged(true);
              setSuccessMessage(
                "Success! You've created a new account, and are ready to Stretch with Stretch Sensei!"
              );
              setErrorMessage("");
            } else {
              setErrorMessage(
                result.message ||
                  "An error occurred, please check the input and try again."
              );
              console.log(result.message);
              setSuccessMessage("");
              setLogged(false);
            }
            return;
          } catch (error) {
            setErrorMessage(
              'Failed to verify user with error "' + error + '".'
            );
            setSuccessMessage("");
            setLogged(false);
          }
        } catch (signUpError) {
          const signUpAuthError = signUpError as AuthError;
          console.error(
            "Sign-up failed:",
            signUpAuthError.code,
            signUpAuthError.message
          );
          setErrorMessage(
            "An error occurred upon Sign Up, please check the input and try again."
          );
        }
        return;
      }
      setErrorMessage(
        "An error occurred! Please check the input and try again. (Username should be in email form) (Password at least 6 characters)"
      );
      setSuccessMessage("");
      setLogged(false);
      console.error("Something went wrong:", error);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Account</ThemedText>
      </ThemedView>

      <ThemedView style={styles.formContainer}>
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Enter username(email)"
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Enter Password"
          style={styles.input}
        />
        <Button title="Sign Up or Login" onPress={createUser} />

        {successMessage ? (
          <ThemedText style={styles.successMessage}>
            {successMessage}
          </ThemedText>
        ) : null}
        {isLoggedIn ? (
          <Button
            title="Enter!"
            onPress={() => navigation.navigate("(tabs)/home", { username })}
          />
        ) : null}

        {errorMessage ? (
          <ThemedText style={styles.errorMessage}>{errorMessage}</ThemedText>
        ) : null}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  formContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 4,
  },
  successMessage: {
    color: "green",
    marginTop: 10,
  },
  errorMessage: {
    color: "red",
    marginTop: 10,
  },
});
