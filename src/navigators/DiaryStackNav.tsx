import React from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';

import Diary from '@screens/Diary';
import List from '@screens/List';
import Month from '@screens/Month';

export type DiaryStackNavParamList = {
  Diary: { year: string; month: string; day: string } | undefined;
  List: { oldToday: string };
  Month: undefined;
};

const Stack = createStackNavigator();

const screenOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: '#F2F0F0',
    shadowColor: '#D9CCC5',
  },
  headerBackTitleVisible: false,
  headerLeftContainerStyle: { paddingLeft: 24 },
  headerRightContainerStyle: { paddingRight: 24 },
  headerTintColor: '#736355',
  headerTitleAlign: 'center',
};

const DiaryStackNav = (): React.ReactElement => (
  <Stack.Navigator screenOptions={screenOptions} initialRouteName="Diary">
    <Stack.Screen name="Diary" component={Diary} />
    <Stack.Screen name="List" component={List} />
    <Stack.Screen name="Month" component={Month} />
  </Stack.Navigator>
);

export default DiaryStackNav;
