import React, { useEffect } from 'react';
import dayjs from 'dayjs';

import { FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Text } from '@atoms/Default';
import AppLayout from '@components/Applayout/AppLayout';

import DayCard from '@components/DayCard/DayCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const List = (): React.ReactElement => {
  const navigation = useNavigation();
  const monthLength = dayjs().daysInMonth();
  const month = dayjs().month();

  const onNavigateMonthPage = () => navigation.navigate('Month');

  const MonthTitle = () => (
    <TouchableOpacity onPress={onNavigateMonthPage}>
      <Text>{`${month} 月`}</Text>
    </TouchableOpacity>
  );

  const getMonthData = async () => {
    const data = await AsyncStorage.getAllKeys();
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: MonthTitle,
    });
    getMonthData();
  }, [month]);

  return (
    <AppLayout>
      <FlatList
        inverted
        data={new Array(monthLength)}
        keyExtractor={(_item, index) => (index + 1).toString()}
        renderItem={({ index }) => <DayCard key={index} day={index + 1} />}
      />
    </AppLayout>
  );
};

export default List;
