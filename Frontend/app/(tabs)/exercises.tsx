import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, Button, View, Image } from "react-native";
import { Stack } from "expo-router";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRoute, RouteProp } from "@react-navigation/native";

type RouteParams = {
  username: string;
  sessionName: string;
};
export interface Stretch {
  Name: string;
  Duration: string;
  Instructions: number;
}

export interface StretchData {
  Stretch_count: number;
  stretches: Stretch[];
}

export interface ExercisesResponse {
  response: string;
  exercises: string[];
}

export interface AddExerciseResponse {
  response: string;
}

export interface GenerateResponse {
  response: string;
  routine: StretchData;
}

export default function Exercises() {
  const [errorMessage, setErrorMessage] = useState("");
  const [exerciseList, setExerciseList] = useState<string[]>([]);
  const [exerciseNameChoice, setExerciseNameChoice] = useState("");
  const [data, setData] = useState<StretchData | null>(null);
  const [GeneratingResponse, setGeneratingResponse] = useState("");
  const [isViewingStretches, setViewingStretches] = useState(false);

  const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();

  const getExercises = async (
    username: string,
    session_name: string
  ): Promise<ExercisesResponse | null> => {
    const url = "http://localhost:5000/get_exercises";
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

      const data: ExercisesResponse = await response.json();
      return data;
    } catch (error) {
      return null;
    }
  };

  const addExercise = async (
    username: string,
    session_name: string,
    exercise_name: string
  ): Promise<AddExerciseResponse | null> => {
    // const username = route.params?.username;
    const url = "http://localhost:5000/add_exercise";
    const payload = {
      UID: username,
      session_name: session_name,
      exercise_name: exercise_name,
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

      const data: AddExerciseResponse = await response.json();
      return data;
    } catch (error) {
      return null;
    }
  };
  const generateStretch = async (
    username: string,
    session_name: string
  ): Promise<GenerateResponse | null> => {
    // const username = route.params?.username;
    const url = "http://localhost:5000/get_stretch_routine";
    const payload = {
      UID: username,
      session_name: session_name,
    };
    setGeneratingResponse("GENERATING STRETCH ROUTINE");
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

      const data: GenerateResponse = await response.json();
      setGeneratingResponse("");
      return data;
    } catch (error) {
      setGeneratingResponse("");
      return null;
    }
  };

  useEffect(() => {
    //Fetch exercises upon opening
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

  const backToExercises = () => {
    setViewingStretches(false);
  };

  const handleAddPress = () => {
    // Add Exercise, and reload the list of exercises
    const username = route.params?.username;
    const session_name = route.params?.sessionName;

    console.log(`ADD EXERCISE ${username} pressed`);
    console.log(`ADD EXERCISE ${session_name} pressed`);
    console.log(`ADD EXERCISE ${exerciseNameChoice} pressed`);

    addExercise(username, session_name, exerciseNameChoice);
    setExerciseNameChoice("");
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
    // Generate a stretch routine given the exercises
    const username = route.params?.username;
    const session_name = route.params?.sessionName;
    console.log(`GENERATE ${username} pressed`);
    console.log(`GENERATE ${session_name} pressed`);

    if (username && session_name) {
      //Generate stretch routine and set variable
      setViewingStretches(true);
      generateStretch(username, session_name).then((stretchData) => {
        if (stretchData) {
          const { response, routine } = stretchData;
          console.log("Response:", response);
          console.log("Stretches:", routine);
          console.log("Test:", routine.Stretch_count);
          setData(routine);
        } else {
          setErrorMessage("Failed to fetch exercises");
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
            source={require("../../assets/images/Stretching2.jpg")} // or wherever your image is
            style={{ width: "100%", height: 300 }}
          />
        }
      >
        {!isViewingStretches && (
          <View>
            <ThemedView style={styles.titleContainer}>
              <ThemedText type="title">My Exercises</ThemedText>
              <Button
                key={"ADD CUSTOM EXERCISE"}
                title={"Add Custom Exercise"}
                onPress={handleAddPress}
              />
              <Button
                key={"GENERATE STRETCHES"}
                title={"Generate Stretches"}
                onPress={generateStretchRoutine}
              />
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
              {Array.isArray(exerciseList) && exerciseList.length > 0 ? (
                exerciseList.map((exercise, index) => (
                  <Button key={index} title={exercise} />
                ))
              ) : (
                <ThemedText style={styles.errorMessage}>
                  No exercises available
                </ThemedText>
              )}
              {errorMessage && (
                <ThemedText style={styles.errorMessage}>
                  {errorMessage}
                </ThemedText>
              )}
            </ThemedView>
          </View>
        )}
        {isViewingStretches && (
          <View>
            <Button
              key={"BACK TO EXERCISES"}
              title={"Back to Exercises"}
              onPress={backToExercises}
            />
            {GeneratingResponse == "" && (
              <ThemedView>
                <ThemedText type="title">My Stretches</ThemedText>
                {data?.stretches.map((stretch, index) => (
                  <View key={index}>
                    <Button title={stretch.Name} color="red" />
                    <ThemedText>
                      {"Time: "}
                      {stretch.Duration}
                      {"\n"}
                      {"Instructions: "}
                      {stretch.Instructions}
                    </ThemedText>
                  </View>
                ))}
              </ThemedView>
            )}
            {GeneratingResponse != "" && (
              <ThemedView>
                <ThemedText type="title">Generating Response</ThemedText>
              </ThemedView>
            )}
          </View>
        )}
      </ParallaxScrollView>
      <>
        <Stack.Screen options={{ title: "Back to Sessions" }} />
      </>
    </>
  );
}

Exercises.options = {
  headerBackTitle: "Go Back", // custom back label just for this screen
};

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
