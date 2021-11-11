import React from 'react';
import { View } from 'react-native';

const AppLayout = ({ children }: { children: React.ReactElement }): React.ReactElement => (
  <View>{children}</View>
);

export default AppLayout;
