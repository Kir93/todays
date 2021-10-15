import React, { useState } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Ionicons } from '@expo/vector-icons';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import {
  NotoSansKR_400Regular,
  NotoSansKR_500Medium,
  NotoSansKR_700Bold,
} from '@expo-google-fonts/noto-sans-kr';

import Theme from '@styles/theme';

import DiaryStackNav from '@navigators/DiaryStackNav';

export default function App(): React.ReactElement {
  const [loading, setLoading] = useState(true);

  const onFinish = () => setLoading(false);
  const preload = async () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    await Promise.all<void>([
      ...fontPromises,
      Font.loadAsync({
        NotoSansKR_400Regular,
        NotoSansKR_500Medium,
        NotoSansKR_700Bold,
      }),
    ]);
  };
  if (loading) {
    return <AppLoading startAsync={preload} onError={alert} onFinish={onFinish} />;
  }
  return (
    <ThemeProvider theme={Theme}>
      <NavigationContainer>
        <DiaryStackNav />
      </NavigationContainer>
    </ThemeProvider>
  );
}
