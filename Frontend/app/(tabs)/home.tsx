import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Platform, TextInput, Button, View } from 'react-native';
import { Link } from 'expo-router';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';

export default function Home(username) {
  const [sessions, setSessions] = useState('');
  const [sessionList, setSessionList] = useState<string[]>([]);  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoggedIn, setLogged] = useState('');

    const navigation = useNavigation();
    const route = useRoute();
    const getSessions = async (username: string): Promise<SessionResponse | null>  => {
	// const username = route.params?.username;
	const url = 'http://localhost:5000/get_sessions';
	const payload = {
	    UID: username,
	};


    try {
	const response = await fetch(`http://localhost:5000/get_sessions`, {
	// const response = fetch(`http://localhost:5000/get_sessions?UID=${encodeURIComponent(UID)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log(JSON.stringify(payload));
      console.log(response);

      // const result = await response.json();
      // console.log(result);

	const data: SessionResponse = await response.json();
	return data;
	// const { response: responseType, sessions } = data;
	// console.log("Response:", responseType);
	// console.log("Sessions:", sessions);

	if (sessions.length > 0) {
	    console.log("First:", sessions[0]);
	}


  //     if (response.ok) {
  //       setSuccessMessage('User created successfully!');
  //         setErrorMessage('');
  //     } else {
  //       setErrorMessage(result.message || 'An error occurred, please check the input and try again.');
  // 	console.log(result.message);
  //         setSuccessMessage('');
  // 	  isLoggedIn = false;
  //     }
    } catch (error) {
	return null;
    //   setErrorMessage('Failed to create user with error \"' + error + '\".');
    //   setSuccessMessage('');
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
          setErrorMessage('Failed to fetch sessions.');
        }
      });
    }
  }, [route.params]);

      const handleSessionPress = (sessionName: string) => {
    console.log(`Session ${sessionName} pressed`);
	  // TODO
  };
	  // useEffect(() => {
	  //     // console.log("wheeee");
	  //     // getSessions(username);

	  //     getSessions(username).then((sessionData) => {
	  // 	  const { response, sessions } = sessionData;
	  // 	  console.log("foo");
	  // 	  console.log("Response:", response);
	  // 	  console.log("Sessions:", sessions);
	  // 	  // for (session in sessions) {
	  // 	  //     console.log(session[session]);
	  // 	  // }
	  //     });
	  // });
	  

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
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
          <ThemedText type="title">My Sessions</ThemedText>
      </ThemedView>

        <ThemedView>
        {sessionList.map((session, index) => (
          <Button
            key={index}
            title={session}
            onPress={() => handleSessionPress(session)}
          />
        ))}
        {errorMessage && <ThemedText style={styles.errorMessage}>{errorMessage}</ThemedText>}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  formContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 4,
  },
  successMessage: {
    color: 'green',
    marginTop: 10,
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
});
