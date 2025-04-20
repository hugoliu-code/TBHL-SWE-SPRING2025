import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  Platform,
  TextInput,
  Button,
  View,
  Modal,
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

export default function Exercises(username, sessionName) {
  const [sessions, setSessions] = useState([]);
  const [sessionList, setSessionList] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoggedIn, setLogged] = useState("");

  const [exercises, setExercises] = useState([]);
  const [exerciseList, setExerciseList] = useState<string[]>([]);

    const [exerciseNameChoice, setExerciseNameChoice] = useState("");
const [data, setData] = useState<StretchData | null>(null);

    interface Stretch {
  name: string;
  target: string;
  time: number;
}

interface StretchData {
  Stretch_count: number;
  stretches: Stretch[];
}

  const navigation = useNavigation();
  const route = useRoute();
  const getExercises = async (
    username: string,
    session_name: string
  ): Promise<SessionResponse | null> => {
    // const username = route.params?.username;
    const url = "http://localhost:5000/get_exercises";
    const payload = {
      UID: username,
      session_name: session_name,
    };

    try {
      const response = await fetch(`http://localhost:5000/get_exercises`, {
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

  const addExercise = async (
    username: string,
      session_name: string,
      exercise_name: string
  ): Promise<SessionResponse | null> => {
    // const username = route.params?.username;
    const url = "http://localhost:5000/add_exercise";
    const payload = {
      UID: username,
	session_name: session_name,
	exercise_name: exercise_name,
    };

    try {
      const response = await fetch(`http://localhost:5000/add_exercise`, {
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
  const generateStretch = async (
    username: string,
      session_name: string,
  ): Promise<SessionResponse | null> => {
    // const username = route.params?.username;
    const url = "http://localhost:5000/get_stretch_routine";
    const payload = {
      UID: username,
	session_name: session_name,
    };

    try {
	const response = await fetch(`http://localhost:5000/get_stretch_routine`, {
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
    const session_name = route.params?.sessionName;
    if (username) {
      getExercises(username, session_name).then((exerciseData) => {
        if (exerciseData) {
          const { response, exercises } = exerciseData;
          console.log("Response:", response);
          console.log("Sessions:", exercises);
          setExerciseList(exercises);
        } else {
          setErrorMessage("Failed to fetch exercises");
        }
      });
    }
  }, [route.params]);

  const handleAddPress = () => {
    const username = route.params?.username;
    const session_name = route.params?.sessionName;
    const exercise_name = route.params?.exerciseNameChoice;
    console.log(`ADD EXERCISE ${username} pressed`);
    console.log(`ADD EXERCISE ${session_name} pressed`);
    console.log(`ADD EXERCISE ${exercise_name} pressed`);
    console.log(`ADD EXERCISE ${exerciseNameChoice} pressed`);
    // TODO

      addExercise(username, session_name, exerciseNameChoice);
          if (username) {
      getExercises(username, session_name).then((exerciseData) => {
        if (exerciseData) {
          const { response, exercises } = exerciseData;
          console.log("Response:", response);
          console.log("Sessions:", exercises);
          setExerciseList(exercises);
        } else {
          setErrorMessage("Failed to fetch exercises");
        }
      });
    }

 };
  const generateStretchRoutine = () => {
    const username = route.params?.username;
    const session_name = route.params?.sessionName;
    console.log(`GENERATE ${username} pressed`);
    console.log(`GENERATE ${session_name} pressed`);
    // TODO

      // const stretches = generateStretch(username, session_name);
      // console.log(stretches);
      
      if (username) {
      generateStretch(username, session_name).then((stretchData) => {
        if (stretchData) {
          const { response, routine } = stretchData;
          console.log("Response:", response);
          console.log("Stretches:", routine);
          // console.log("Test:", stretchData);
          // setErrorMessage(stretchData);
	    // testparse = JSON.parse(routine);
          console.log("Test:", routine.Stretch_count);
	      // const jsonData: StretchData = await response.json();
        setData(routine);
          // setExerciseList(Array.isArray(routine.stretches));
        } else {
          setErrorMessage("Failed to fetch exercises");
        }
      });
    }
      if (username) {
      getExercises(username, session_name).then((exerciseData) => {
        if (exerciseData) {
          const { response, exercises } = exerciseData;
          console.log("Response:", response);
          console.log("Exercises:", exercises);
          setExerciseList(exercises);
        } else {
          setErrorMessage("Failed to fetch exercises");
        }
      });
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
        <ThemedText type="title">My Exercises</ThemedText>
          <Button key={"ADD CUSTOM EXERCISE"} title={"Add Custom Exercise"} onPress={handleAddPress}/>
          <Button key={"GENERATE STRETCHES"} title={"Generate Stretches"} onPress={generateStretchRoutine}/>
      </ThemedView>
      <ThemedView style={styles.formContainer}>
        <TextInput
          value={exerciseNameChoice}
          onChangeText={setExerciseNameChoice}
          placeholder="Enter custom exercise"
          style={styles.input}
        />
      </ThemedView>
      <ThemedView>
      {data?.stretches.map((stretch, index) => (
          <View key={index}>
	      <Button title={stretch.Name}/>
	  <ThemedText>
	      {stretch.Duration}
	  {stretch.Instructions}
	  </ThemedText>
	      </View>
      ))}
      {Array.isArray(exerciseList) && exerciseList.length > 0 ? (
	    exerciseList.map((exercise, index) => (
		<Button key={index} title={exercise} />
	    ))) : (
	    <ThemedText style={styles.errorMessage}>No exercises available</ThemedText>)}
        {errorMessage && (
          <ThemedText style={styles.errorMessage}>{errorMessage}</ThemedText>
        )}
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
  },
});
