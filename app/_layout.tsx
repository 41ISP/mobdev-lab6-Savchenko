import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { StyleSheet, TextInput, View } from 'react-native';
import { Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [word, setWord] = useState('')
  const [firstLang, setFirstLang] = useState('')
  const [secondLang, setSecondLang] = useState('')
  
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={styles.mainContainer}>
           <View style={styles.searchContainer}>
            <Text style={styles.h1Container}>Dictionary API</Text>
            <TextInput style={styles.inputContainer}
            placeholder="Enter the word"
            value={word}
            onChangeText={setWord}
            returnKeyType="done"/>
            <Dropdown data={}/>
            </View> 
        </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
        
  },
  searchContainer: {

  },
  inputContainer: {

  },
  h1Container: {
    fontSize: 25,
  }
})