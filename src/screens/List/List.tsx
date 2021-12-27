import React, { useCallback, useEffect, useState } from 'react';
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
  const [year, setYear] = useState(dayjs().year());
  const [month, setMonth] = useState(dayjs().month() + 1);
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

  const onPrevData = useCallback(() => {
    let nextMonth = month - 1;
    let nextYear = year;
    if (month === 1) {
      nextMonth = 12;
      nextYear = year - 1;
      setYear(nextYear);
    }
    setMonth(nextMonth);
    const nextDate = dayjs(`${nextYear}-${nextMonth - 1}`).daysInMonth();
    const nextDateData = [...Array(nextDate)].map((_v, i) => {
      const thisDay = nextDate - i;
      const id = `${nextYear}-${nextMonth}-${thisDay}`.toString();
      return {
        id,
        thisDay,
        day: '',
        moon: '',
      };
    });
    navigation.setOptions({
      headerTitle: MonthTitle,
    });
    getMonthDates([...data, ...nextDateData]);
  }, [data]);

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
  }, []);

  return data.length ? (
    <AppLayout>
      <SafeAreaView>
        <FlatList
          inverted
          data={data}
          onEndReachedThreshold={0.4}
          showsVerticalScrollIndicator={false}
          onEndReached={onPrevData}
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
