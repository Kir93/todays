import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Diary from '@screens/Diary/Diary';
import List from '@screens/List/List';
import Month from '@screens/Month/Month';

const Stack = createStackNavigator();

const screenOptions = {
  headerStyle: { backgroundColor: '#F2F0F0', shadowColor: '#D9CCC5' },
  headerBackTitleVisible: false,
  headerLeftContainerStyle: { paddingLeft: 24 },
  headerRightContainerStyle: { paddingRight: 24 },
  headerTintColor: '#736355',
};

const DiaryStackNav = (): React.ReactElement => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen name="Month" component={Month} />
    <Stack.Screen name="List" component={List} />
    <Stack.Screen name="Diary" component={Diary} />
  </Stack.Navigator>
);

export default DiaryStackNav;
