import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Ionicons } from '@expo/vector-icons';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {
  NotoSansKR_400Regular,
  NotoSansKR_500Medium,
  NotoSansKR_700Bold,
} from '@expo-google-fonts/noto-sans-kr';

import Theme from '@styles/theme';
import DiaryStackNav from '@navigators/DiaryStackNav';
import { Alert, BackHandler } from 'react-native';

export default function App(): React.ReactElement {
  const [loading, setLoading] = useState(true);

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
      Alert.alert('Todays를 종료하시겠습니까?', '오늘도 즐거운 하루 되세요 :)', [
        {
          text: '취소',
          onPress: () => null,
          style: 'cancel',
        },
        { text: '네', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    preload();
  }, []);

  if (loading) return <></>;

  return (
    <ThemeProvider theme={Theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <DiaryStackNav />
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
