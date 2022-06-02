import React, { useCallback, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, VirtualizedList } from 'react-native';

import convertKey from '@hooks/convertKey';

import Text from '@atoms/Text';

import AppLayout from '@components/AppLayout/AppLayout';
import RenderCard from '@components/List/RenderCard';

interface IList {
  id: string;
  thisDay: number;
  day: string;
  moon: string;
}

const List = (): React.ReactElement => {
  const toDay = dayjs().date();
  const navigation = useNavigation();
  const [year, setYear] = useState(dayjs().year());
  const [month, setMonth] = useState(dayjs().month() + 1);
  const [data, setData] = useState<IList[]>([]);

  const onNavigateMonthPage = () => navigation.navigate('Month');
  const onNavigateDiaryPage = (day: string) => () => navigation.navigate('Diary', { day });

  const keyExtractor = useCallback(({ id }) => id, []);

  const getItemCount = useCallback(() => data.length, [data.length]);

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

  const getItem = useCallback((items, index) => items[index], []);

  const onEndReached = useCallback(() => {
    const beforeData = data;
    let nextMonth = month - 1;
    let nextYear = year;
    if (month === 1) {
      nextMonth = 12;
      nextYear = year - 1;
      setYear(nextYear);
    }
    setMonth(nextMonth);
    const nextDate = dayjs(`${nextYear}-${nextMonth - 1}`).daysInMonth();
    const nextDateData = [...Array(nextDate)].map((_, i) => {
      const id = convertKey({
        year: nextYear.toString(),
        month: nextMonth.toString(),
        day: (nextDate - i).toString(),
      });
      return {
        id,
        thisDay: nextDate - i,
        day: '',
        moon: '',
      };
    });

    getMonthDates([...beforeData, ...nextDateData]);
  }, [data]);
  const MonthTitle = useMemo(
    () => (
      <TouchableOpacity onPress={onNavigateMonthPage}>
        <Text>{year}年</Text>
      </TouchableOpacity>
    ),
    [year, onNavigateMonthPage],
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: MonthTitle,
    });
  }, [MonthTitle]);

  useEffect(() => {
    if (data?.length) return;
    const defaultData = [...Array(toDay)].map((_, i) => {
      const id = convertKey({
        year: year.toString(),
        month: month.toString(),
        day: (toDay - i).toString(),
      });

      return {
        id,
        thisDay: toDay - i,
        day: '',
        moon: '',
      };
    });
    getMonthDates(defaultData);
  }, []);

  const renderItem = ({ item: { id, ...itemData } }: { item: IList }) => (
    <RenderCard key={id} {...{ id, itemData, onNavigateDiaryPage }} />
  );

  if (!data.length) return <Text>Loading...</Text>;

  return (
    <AppLayout>
      <VirtualizedList
        inverted
        removeClippedSubviews
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        initialNumToRender={toDay}
        {...{ data, keyExtractor, getItem, getItemCount, renderItem, onEndReached }}
      />
    </AppLayout>
  );
};

export default List;
