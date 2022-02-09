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
  const navigation = useNavigation();
  const [year, setYear] = useState(dayjs().year());
  const [month, setMonth] = useState(dayjs().month() + 1);
  const [arrow, setArrow] = useState(true);
  const [markedDate, setMarkedDate] = useState({});
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
      const thisMonth = await AsyncStorage.multiGet(['2022-02-08', '2022-02-09']);
      // 저장 시 두자리로 저장해야 함.
    };

    getMonthData();
  }, [toDate]);

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
