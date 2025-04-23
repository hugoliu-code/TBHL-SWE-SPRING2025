import React, { useState, useEffect } from "react";
import { Stack, router } from "expo-router";
import { StyleSheet, Button, TextInput, Image } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRoute, RouteProp } from "@react-navigation/native";

export interface SessionResponse {
  sessions: string[];
  response: string;
}

export interface AddSessionResponse {
  response: string;
}

type RouteParams = {
  username: string;
};
export default function Home() {
  const [sessionList, setSessionList] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [sessionNameChoice, setSessionNameChoice] = useState("");
  const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();

  const username = route.params?.username;
  const getSessions = async (
    username: string
  ): Promise<SessionResponse | null> => {
    const url = "http://localhost:5000/get_sessions";
    const payload = {
      UID: username,
    };

    try {
      const response = await fetch(`http://localhost:5000/get_sessions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log(JSON.stringify(payload));
      console.log(response);

      const data: SessionResponse = await response.json();
      return data;
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    const username = route.params?.username;
    if (username) {
      getSessions(username).then((sessionData) => {
        if (sessionData) {
          const { response, sessions } = sessionData;
          console.log("Response:", response);
          console.log("Sessions:", sessions);
          setSessionList(sessions);
        } else {
          setErrorMessage("Failed to fetch sessions.");
        }
      });
    }
  }, [route.params]);

  const handleSessionPress = (sessionName: string) => {
    console.log(`Session ${sessionName} pressed`);

    router.push({
      pathname: "/(tabs)/exercises",
      params: {
        username,
        sessionName,
      },
    });
  };

  const addSession = async (
    username: string,
    session_name: string
  ): Promise<AddSessionResponse | null> => {
    // const username = route.params?.username;
    const url = "http://localhost:5000/create_session";
    const payload = {
      UID: username,
      session_name: session_name,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log(JSON.stringify(payload));
      console.log(response);

      const data: AddSessionResponse = await response.json();
      return data;
    } catch (error) {
      return null;
    }
  };

  const handleAddPress = () => {
    // Add Session, and reload the list of Sessions
    const username = route.params?.username;

    //Add Session
    addSession(username, sessionNameChoice);
    //Reset Val
    setSessionNameChoice("");

    if (username) {
      getSessions(username).then((sessionData) => {
        if (sessionData) {
          const { response, sessions } = sessionData;
          console.log("Response:", response);
          console.log("Sessions:", sessions);
          setSessionList(sessions);
        } else {
          setErrorMessage("Failed to fetch sessions.");
        }
      });
    }
  };
  return (
    <>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
        headerImage={
          <Image
            source={require("../../assets/images/Dumbbell.jpg")} // or wherever your image is
            style={{ width: "100%", height: 300 }}
          />
        }
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Current Sessions</ThemedText>
        </ThemedView>

        <ThemedView>
          {sessionList.map((session, index) => (
            <Button
              key={index}
              title={session}
              onPress={() => handleSessionPress(session)}
            />
          ))}
          {errorMessage && (
            <ThemedText style={styles.errorMessage}>{errorMessage}</ThemedText>
          )}
        </ThemedView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">New Session</ThemedText>
          <Button key={"ADD"} title={"Add"} onPress={handleAddPress} />
        </ThemedView>
        <ThemedView style={styles.formContainer}>
          <TextInput
            value={sessionNameChoice}
            onChangeText={setSessionNameChoice}
            placeholder="New Session Name"
            style={styles.input}
          />
        </ThemedView>
      </ParallaxScrollView>

      <>
        <Stack.Screen options={{ title: "Logout" }} />
      </>
    </>
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
