import React, { useCallback, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LocaleConfig } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import { DateData } from 'react-native-calendars/src/types';

import monthLocaleData from '@utils/monthLocaleData';

import AppLayout from '@components/Applayout/AppLayout';
import { MonthCalendar } from './Month.styles';

LocaleConfig.locales.ko = monthLocaleData;

type DotProps = { key: string; color: string };
interface IMarkDate {
  [key: string]: { dots: DotProps[] };
}

const Month = (): React.ReactElement => {
  LocaleConfig.defaultLocale = 'ko';
  const sunny = useMemo(() => ({ key: 'vacation', color: 'red' }), []);
  const moon = useMemo(() => ({ key: 'massage', color: 'blue' }), []);

  const toDay = dayjs();
  const toDate = toDay.toDate().toDateString();
  const toMonth = toDay.month() + 1;
  const navigation = useNavigation();

  const [year, setYear] = useState(dayjs().year());
  const [month, setMonth] = useState(dayjs().month() + 1);
  const [day, setDay] = useState(dayjs().date());
  const [arrow, setArrow] = useState(true);
  const [markedDate, setMarkedDate] = useState<IMarkDate>({});
  const [loading, setLoading] = useState(true);

  const getMonthData = useCallback(async () => {
    const defaultData = [...Array(day)].map((_v, i) =>
      `${year}-${0 + month.toString().slice(-2)}-${`0${i + 1}`.slice(-2)}`.toString(),
    );
    const thisMonth = await AsyncStorage.multiGet(defaultData);
    thisMonth.forEach((v) => {
      if (v[1] === null) return;
      const dayData = JSON.parse(v[1]);
      const dots: DotProps[] = [];
      if (dayData.day) dots.push(sunny);
      if (dayData.moon) dots.push(moon);
      setMarkedDate((prev) => {
        prev[`${v[0]}`] = { dots };
        return prev;
      });
    });
    setLoading(false);
  }, [month]);

  const onDisabledArrow = useCallback(
    (date: DateData[]) => {
      const { year: localYear, month: localMonth, dateString } = date[0];
      setYear(localYear);
      setMonth(localMonth);
      setDay(dayjs(dateString).daysInMonth());
      setArrow(month === toMonth);
    },
    [toMonth],
  );
  useEffect(() => {
    navigation.setOptions({ headerTitle: `${year} 年` });
  }, [year]);

  useEffect(() => {
    getMonthData();
  }, [getMonthData]);

  if (loading) return <></>;

  return (
    <AppLayout>
      <MonthCalendar
        markingType="multi-dot"
        hideExtraDays
        disableAllTouchEventsForDisabledDays
        maxDate={toDate}
        disableArrowRight={arrow}
        onVisibleMonthsChange={onDisabledArrow}
        markedDates={markedDate}
      />
    </AppLayout>
  );
};

export default Month;
