import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { StyleSheet, TextInput, View } from 'react-native';
import { Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown'
import DictionaryAPI from '@/shared/DictionaryAPI';
import { ILangs } from '@/entities/langs.model';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [word, setWord] = useState('')
  const [allLangs, setAllLangs] = useState<ILangs[]>([])
  const [firstLang, setFirstLang] = useState(allLangs.values().find())
  const [secondLang, setSecondLang] = useState('')

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await DictionaryAPI.getLangs()
      if (res) {
        const langsSet = new Set(res.map((lang) => lang.split('-')).flat())
        const parsedLangs = Array.from(langsSet).map((el) => { return { value: el, label: el } })
        setAllLangs(parsedLangs)
      }
    }
    fetchData()
  }, [])

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
            returnKeyType="done" />
          <Dropdown valueField={firstLang} onChange={(e) => { }} labelField={firstLang} data={allLangs} />
          <Dropdown data={allLangs} valueField={secondLang} labelField={secondLang} onChange={(e) => { }} />
            <Text>{JSON.stringify(allLangs)}</Text>
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