import React from 'react';
import { Image } from 'react-native';

import Splash from '@assets/splash.png';

import L from './LoadingScreen.styles';

const LoadingScreen: React.FC = () => (
  <L.Wrapper>
    <Image source={Splash} resizeMode="cover" />
  </L.Wrapper>
);

export default LoadingScreen;
