import React, { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LocaleConfig } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import { DateData } from 'react-native-calendars/src/types';

import monthLocaleData from '@utils/monthLocaleData';

import AppLayout from '@components/Applayout/AppLayout';
import { MonthCalendar } from './Month.s';

LocaleConfig.locales.ko = monthLocaleData;

const Month = (): React.ReactElement => {
  LocaleConfig.defaultLocale = 'ko';
  const toDay = dayjs();
  const toDate = toDay.toDate().toString();
  const toMonth = toDay.month() + 1;
  const navigation = useNavigation();
  const [year, setYear] = useState(dayjs().year());
  const [month, setMonth] = useState(dayjs().month() + 1);
  const [day, setDay] = useState(dayjs().date());
  const [arrow, setArrow] = useState(true);
  const [markedDate, setMarkedDate] = useState<{
    [key: string]: { dots: { key: string; color: string }[] };
  }>({});
  const [loading, setLoading] = useState(true);
  const sunny = { key: 'vacation', color: 'red' };
  const moon = { key: 'massage', color: 'blue' };

  const onDisabledArrow = useCallback(
    (date: DateData[]) => {
      setYear(date[0].year);
      setMonth(date[0].month);
      setDay(dayjs(date[0].dateString).daysInMonth());
      setArrow(date[0].month === toMonth);
    },
    [toMonth],
  );
  useEffect(() => {
    navigation.setOptions({ headerTitle: `${year} 年` });
  }, [year]);

  useEffect(() => {
    const getMonthData = async () => {
      const defaultData = [...Array(day)].map((_v, i) =>
        `${year}-${0 + month.toString().slice(-2)}-${`0${i + 1}`.slice(-2)}`.toString(),
      );
      const thisMonth = await AsyncStorage.multiGet(defaultData);
      thisMonth.forEach((v) => {
        if (v[1] === null) return;
        const dayData = JSON.parse(v[1]);
        const dots: { key: string; color: string }[] = [];
        if (dayData.day) dots.push(sunny);
        if (dayData.moon) dots.push(moon);
        setMarkedDate((prev) => {
          prev[`${v[0]}`] = { dots };
          return prev;
        });
      });
      setLoading(false);
    };
    getMonthData();
  }, [month]);

  return !loading ? (
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
  ) : (
    <></>
  );
};

export default Month;
