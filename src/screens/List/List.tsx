import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import { FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Text } from '@atoms/Default';
import AppLayout from '@components/Applayout/AppLayout';

import DayCard from '@components/DayCard/DayCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IList {
  id: string;
  thisDay: number;
  day: string;
  moon: string;
}

const List = (): React.ReactElement => {
  const navigation = useNavigation();
  const year = dayjs().year();
  const month = dayjs().month() + 1;
  const toDay = dayjs().date();
  const [data, setData] = useState<IList[]>([]);

  const onNavigateMonthPage = () => navigation.navigate('Month');
  const onNavigateDiaryPage = (day: string) => () => navigation.navigate('Diary', { day });

  const MonthTitle = () => (
    <TouchableOpacity onPress={onNavigateMonthPage}>
      <Text>{`${month} 月`}</Text>
    </TouchableOpacity>
  );

  const getMonthData = async (monthData: IList) => {
    const thisData = await AsyncStorage.getItem(monthData.id);
    if (thisData) {
      const parseData = JSON.parse(thisData);
      return new Promise((resolve) => resolve({ ...monthData, ...parseData }));
    }
    return new Promise((resolve) => resolve(monthData));
  };

  const getMonthDates = async (monthDates: IList[]) => {
    const render = (await Promise.all(
      monthDates.map((v) => new Promise((resolve) => resolve(getMonthData(v)))),
    )) as IList[];
    setData(render);
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: MonthTitle,
    });
    const defaultData = [...Array(toDay)].map((_v, i) => {
      const thisDay = toDay - i;
      const id = `${year}-${month}-${thisDay}`.toString();
      return {
        id,
        thisDay,
        day: '',
        moon: '',
      };
    });
    getMonthDates(defaultData);
  }, [month]);

  return data.length ? (
    <AppLayout>
      <SafeAreaView>
        <FlatList
          inverted
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={({ id }) => id}
          renderItem={({ item: { id, ...itemData } }: { item: IList }) => (
            <DayCard key={id} onPress={onNavigateDiaryPage} {...{ id, ...itemData }} />
          )}
        />
      </SafeAreaView>
    </AppLayout>
  ) : (
    <></>
  );
};

export default List;
