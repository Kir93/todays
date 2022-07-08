import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { ThemeProvider } from 'styled-components/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BackHandler, ToastAndroid } from 'react-native';
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';

import {
  NotoSansKR_400Regular,
  NotoSansKR_500Medium,
  NotoSansKR_700Bold,
} from '@expo-google-fonts/noto-sans-kr';

import Theme from '@styles/theme';
import DiaryStackNav from '@navigators/DiaryStackNav';
import LoadingScreen from '@components/LoadingScreen/LoadingScreen';

export default function App(): React.ReactElement {
  const navigationRef = createNavigationContainerRef();
  const [loading, setLoading] = useState(true);
  const [isExit, setIsExit] = useState(false);

  const preload = async () => {
    try {
      await SplashScreen.preventAutoHideAsync();
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
    } catch (error) {
      alert(error);
    } finally {
      await SplashScreen.hideAsync();
      setLoading(false);
    }
  };

  useEffect(() => {
    const backAction = () => {
      if (navigationRef.current?.canGoBack()) return false;
      const resetTimeout = setTimeout(() => setIsExit(false), 1000);
      if (isExit) {
        BackHandler.exitApp();
        clearTimeout(resetTimeout);
      }
      ToastAndroid.show('한번 더 누르시면 Todays가 종료됩니다! :)', 1000);
      setIsExit(true);
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [isExit]);

  useEffect(() => {
    preload();
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <ThemeProvider theme={Theme}>
      <SafeAreaProvider>
        <NavigationContainer ref={navigationRef}>
          <StatusBar hidden backgroundColor={Theme.backgroundColor} />
          <DiaryStackNav />
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
