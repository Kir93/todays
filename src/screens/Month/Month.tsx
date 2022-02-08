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
  const toDate = toDay.toDate();
  const navigation = useNavigation();
  const [year, setYear] = useState(dayjs().year());
  const [month, setMonth] = useState(dayjs().month() + 1);
  const [arrow, setArrow] = useState(true);
  const sunny = { key: 'vacation', color: 'red' };
  const moon = { key: 'massage', color: 'blue' };

  const onDisabledArrow = useCallback(
    (date: DateData[]) => setArrow(date[0].month === month),
    [arrow],
  );
  useEffect(() => {
    navigation.setOptions({ headerTitle: `${year} 年` });
  }, [year]);

  useEffect(() => {
    const getMonthData = async () => {
      const thisMonth = await AsyncStorage.multiGet(['2022-2-1', '2022-2-2', '2022-2-8']);
      /*
       * const arrayToObject = (array: [string, string | null][]) =>
       *   array.reduce((acc, row) => ((acc[row[0]] = [...(acc[row[0]] || []), row[1]]), acc), {});
       */

      // return arrayToObject(thisMonth);
    };
    getMonthData();
  }, [toDay]);

  return (
    <AppLayout>
      <MonthCalendar
        markingType="multi-dot"
        hideExtraDays
        disableAllTouchEventsForDisabledDays
        maxDate={toDate.toString()}
        disableArrowRight={arrow}
        onVisibleMonthsChange={onDisabledArrow}
        markedDates={{
          '2021-11-25': {
            dots: [sunny, moon],
          },
          '2021-11-26': { dots: [moon] },
        }}
      />
    </AppLayout>
  );
};

export default Month;
