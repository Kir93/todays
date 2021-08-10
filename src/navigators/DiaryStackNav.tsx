import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Diary from '@screens/Diary';

const Stack = createStackNavigator();

const DiaryStackNav = (): React.ReactElement => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#222', shadowColor: '#555' },
      headerTintColor: '#fff',
    }}
  >
    <Stack.Screen name="Diary" component={Diary} />
  </Stack.Navigator>
);

export default DiaryStackNav;
