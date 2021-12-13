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
  const toDay = dayjs().date();
  const defaultData = [...Array(toDay)].map((_v, i) => toDay - i);

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
        data={defaultData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => `${month}-${item}`}
        renderItem={({ item }) => <DayCard key={item} day={item} />}
      />
    </AppLayout>
  );
};

export default List;
