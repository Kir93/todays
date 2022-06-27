import React, { useCallback, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { ListRenderItem, TouchableOpacity, VirtualizedList } from 'react-native';
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native';

import convertKey from '@utils/convertKey';

import Text from '@atoms/Text';

import RenderCard from '@components/List/RenderCard';
import AppLayout from '@components/AppLayout/AppLayout';

import L from '@components/List/List.styles';

interface IListParts {
  id: string;
  thisDay: number;
}

interface IList extends IListParts {
  day: string;
  moon: string;
}

interface IParams {
  oldToday: string;
}

const List = (): React.ReactElement => {
  const router = useRoute();
  const param = router?.params as IParams;
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [year, setYear] = useState(() => dayjs().year());
  const [month, setMonth] = useState(() => dayjs().month() + 1);
  const [data, setData] = useState<IList[]>([]);

  const toDay = useMemo(() => dayjs().date(), []);

  const onNavigateMonthPage = () => navigation.navigate('Month');
  const onNavigateDiaryPage = (date: string) => () => {
    const [paramYear, paramMonth, paramDay] = date.split('-');
    const oldToday = parseInt(param?.oldToday, 10);
    if (oldToday !== toDay && toDay === parseInt(paramDay, 10))
      navigation.navigate('Diary', { year: paramYear, month: paramMonth, day: paramDay });
    else navigation.push('Diary', { year: paramYear, month: paramMonth, day: paramDay });
  };

  const keyExtractor = ({ id }: IList) => id;

  const getItemCount = () => data?.length;

  const getMonthDates = async (monthDates: IListParts[]) => {
    const getMonthData = async ({ id, thisDay }: IListParts) => {
      const thisMonthData = await AsyncStorage.getItem(id);
      if (thisMonthData) {
        const parseData = JSON.parse(thisMonthData);
        return new Promise((resolve) => resolve({ id, thisDay, ...parseData }));
      }
      return new Promise((resolve) => resolve({ id, thisDay, day: '', moon: '' }));
    };

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

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <TouchableOpacity onPress={onNavigateMonthPage}>
          <Text>{year}年</Text>
        </TouchableOpacity>
      ),
    });
  }, [year]);

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

  return (
    <AppLayout loading={!data.length}>
      <VirtualizedList
        inverted
        removeClippedSubviews
        initialNumToRender={toDay}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<L.ListHeaderPaddingView />}
        {...{ data, keyExtractor, getItem, getItemCount, renderItem, onEndReached }}
      />
    </AppLayout>
  );
};

export default List;
