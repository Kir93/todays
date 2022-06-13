import React, { useCallback, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { ListRenderItem, TouchableOpacity, VirtualizedList } from 'react-native';

import convertKey from '@utils/convertKey';

import Text from '@atoms/Text';

import RenderCard from '@components/List/RenderCard';
import AppLayout from '@components/AppLayout/AppLayout';

import A from '@components/AppLayout/AppLayout.styles';

interface IListParts {
  id: string;
  thisDay: number;
}

interface IList extends IListParts {
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

  const keyExtractor = ({ id }: IList) => id;

  const getItemCount = useCallback(() => data?.length, [data?.length]);

  const getMonthData = async ({ id, thisDay }: IListParts) => {
    const thisMonthData = await AsyncStorage.getItem(id);
    if (thisMonthData) {
      const parseData = JSON.parse(thisMonthData);
      return new Promise((resolve) => resolve({ id, thisDay, ...parseData }));
    }
    return new Promise((resolve) => resolve({ id, thisDay, day: '', moon: '' }));
  };

  const getMonthDates = async (monthDates: IListParts[]) => {
    const render = (await Promise.all(
      monthDates.map((v) => new Promise((resolve) => resolve(getMonthData(v)))),
    )) as IList[];
    setData((prev) => [...prev, ...render]);
  };

  const getItem = useCallback((items, index) => items[index], []);

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
    const nextDateData = [...Array(nextDate)].map((_, i) => {
      const id = convertKey({
        year: nextYear.toString(),
        month: nextMonth.toString(),
        day: (nextDate - i).toString(),
      });
      return {
        id,
        thisDay: nextDate - i,
      };
    });

    getMonthDates(nextDateData);
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
    const defaultData = [...Array(toDay)].map((_, i) => ({
      id: convertKey({
        year: year.toString(),
        month: month.toString(),
        day: (toDay - i).toString(),
      }),
      thisDay: toDay - i,
    }));
    getMonthDates(defaultData);
  }, []);

  const renderItem: ListRenderItem<IList> = ({ item: { id, ...itemData } }) => (
    <RenderCard key={id} {...{ id, itemData, onNavigateDiaryPage }} />
  );

  if (!data.length)
    return (
      <A.LoadingWrapper>
        <Text>Loading...</Text>
      </A.LoadingWrapper>
    );

  return (
    <AppLayout>
      <VirtualizedList
        inverted
        removeClippedSubviews
        initialNumToRender={toDay}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        {...{ data, keyExtractor, getItem, getItemCount, renderItem, onEndReached }}
      />
    </AppLayout>
  );
};

export default List;
