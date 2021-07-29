import React, { useState } from 'react';
import * as Font from 'expo-font';
import styled from 'styled-components/native';
import AppLoading from 'expo-app-loading';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import {
  useFonts,
  NotoSansKR_100Thin,
  NotoSansKR_300Light,
  NotoSansKR_400Regular,
  NotoSansKR_500Medium,
  NotoSansKR_700Bold,
  NotoSansKR_900Black,
} from '@expo-google-fonts/noto-sans-kr';

const Text = styled.Text`
  font-size: 24px;
  font-family: 'NotoSansKR_400Regular';
`;

export default function App(): React.ReactElement {
  const [loading, setLoading] = useState(true);
  const [fontsLoaded] = useFonts({
    NotoSansKR_100Thin,
    NotoSansKR_300Light,
    NotoSansKR_400Regular,
    NotoSansKR_500Medium,
    NotoSansKR_700Bold,
    NotoSansKR_900Black,
  });
  const onFinish = () => setLoading(false);
  const preload = async () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    await Promise.all<void>([...fontPromises]);
  };
  if (loading && !fontsLoaded) {
    return <AppLoading startAsync={preload} onError={alert} onFinish={onFinish} />;
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  );
}
