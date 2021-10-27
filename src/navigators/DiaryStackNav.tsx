import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Diary from '@screens/Diary/Diary';

const Stack = createStackNavigator();

const DiaryStackNav = (): React.ReactElement => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#F2F0F0', shadowColor: '#D9CCC5' },
      headerRightContainerStyle: { paddingRight: 24 },
      headerTintColor: '#D9CCC5',
    }}
  >
    <Stack.Screen name="Diary" component={Diary} />
  </Stack.Navigator>
);

export default DiaryStackNav;
