import React, { useState } from 'react';
import { StyleSheet, Image, Platform, TextInput, Button, View } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabTwoScreen() {
  const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const createUser = async () => {
  const url = 'http://localhost:5000/create_new_user';
    const payload = {
	UID: username,
      // password: password,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // console.log(payload);
      console.log(JSON.stringify(payload));
      console.log(response);

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        setSuccessMessage('User created successfully!');
        setErrorMessage('');
      } else {
        setErrorMessage(result.message || 'An error occurred, please check the input and try again.');
	console.log(result.message);
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Failed to create user with error \"' + error + '\".');
      setSuccessMessage('');
    }
  };
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
        <ThemedText type="title">Account</ThemedText>
      </ThemedView>

      <ThemedView style={styles.formContainer}>
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Enter username"
          style={styles.input}
        />
        <Button title="Create User" onPress={createUser} />
        
        {successMessage ? <ThemedText style={styles.successMessage}>{successMessage}</ThemedText> : null}
        {errorMessage ? <ThemedText style={styles.errorMessage}>{errorMessage}</ThemedText> : null}
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
