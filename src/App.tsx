import React, { useState } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import {
  NotoSansKR_100Thin,
  NotoSansKR_300Light,
  NotoSansKR_400Regular,
  NotoSansKR_500Medium,
  NotoSansKR_700Bold,
  NotoSansKR_900Black,
} from '@expo-google-fonts/noto-sans-kr';

import { WhiteTheme, DarkTheme } from '@styles/theme';

import DiaryStackNav from '@navigators/DiaryStackNav';
import { ThemeProvider } from 'styled-components/native';

export default function App(): React.ReactElement {
  const [loading, setLoading] = useState(true);
  const white = false;

  const onFinish = () => setLoading(false);
  const preload = async () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    await Promise.all<void>([
      ...fontPromises,
      Font.loadAsync({
        NotoSansKR_100Thin,
        NotoSansKR_300Light,
        NotoSansKR_400Regular,
        NotoSansKR_500Medium,
        NotoSansKR_700Bold,
        NotoSansKR_900Black,
      }),
    ]);
  };
  if (loading) {
    return <AppLoading startAsync={preload} onError={alert} onFinish={onFinish} />;
  }
  return (
    <ThemeProvider theme={white ? WhiteTheme : DarkTheme}>
      <NavigationContainer>
        <DiaryStackNav />
      </NavigationContainer>
    </ThemeProvider>
  );
}
