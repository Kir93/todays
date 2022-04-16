import React, { useCallback, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';
import { FlatList, TouchableOpacity, SafeAreaView } from 'react-native';

import { Text } from '@atoms/Default';
import AppLayout from '@components/Applayout/AppLayout';

import DayCard from '@components/DayCard/DayCard';
import ListHeader from '@components/ListHeader/ListHeader';

interface IList {
  id: string;
  thisDay: number;
  day: string;
  moon: string;
}

const List = (): React.ReactElement => {
  const navigation = useNavigation();
  const toDay = dayjs().date();
  const [year, setYear] = useState(dayjs().year());
  const [month, setMonth] = useState(dayjs().month() + 1);
  const [data, setData] = useState<IList[]>([]);

  const onNavigateMonthPage = () => navigation.navigate('Month');
  const onNavigateDiaryPage = (day: string) => () => navigation.navigate('Diary', { day });

  const MonthTitle = useMemo(
    () => (
      <TouchableOpacity onPress={onNavigateMonthPage}>
        <Text>{month}月</Text>
      </TouchableOpacity>
    ),
    [month, onNavigateMonthPage],
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

  const onEndReached = useCallback(() => {
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
      const id = `${nextYear}-${
        nextMonth.toString().slice(-2).length < 2
          ? 0 + nextMonth.toString().slice(-2)
          : nextMonth.toString().slice(-2)
      }-${
        thisDay.toString().slice(-2).length < 2
          ? 0 + thisDay.toString().slice(-2)
          : thisDay.toString().slice(-2)
      }`.toString();
      return {
        id,
        thisDay,
        day: '',
        moon: '',
      };
    });
    getMonthDates([...data, ...nextDateData]);
  }, [data]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: MonthTitle,
    });
  }, [month]);

  useEffect(() => {
    if (data.length) return;
    const defaultData = [...Array(toDay)].map((_v, i) => {
      const thisDay = toDay - i;
      const id = `${year}-${
        month.toString().slice(-2).length < 2
          ? 0 + month.toString().slice(-2)
          : month.toString().slice(-2)
      }-${
        thisDay.toString().slice(-2).length < 2
          ? 0 + thisDay.toString().slice(-2)
          : thisDay.toString().slice(-2)
      }`.toString();
      return {
        id,
        thisDay,
        day: '',
        moon: '',
      };
    });
    getMonthDates(defaultData);
  }, []);

  const keyExtractor = ({ id }: IList) => id;

  const renderItem = ({ item: { id, ...itemData } }: { item: IList }) => (
    <React.Fragment key={id}>
      <DayCard onPress={onNavigateDiaryPage} {...{ id, ...itemData }} />
      {id.split('-')[2] === '01' ? <ListHeader>{id.split('-')[1]}월</ListHeader> : <></>}
    </React.Fragment>
  );

  return data.length ? (
    <AppLayout>
      <SafeAreaView>
        <FlatList
          inverted
          onEndReachedThreshold={0.4}
          showsVerticalScrollIndicator={false}
          {...{ data, keyExtractor, onEndReached, renderItem }}
        />
      </SafeAreaView>
    </AppLayout>
  ) : (
    <></>
  );
};

export default List;
