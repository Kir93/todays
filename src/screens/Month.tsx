import React, { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LocaleConfig } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import { DateData } from 'react-native-calendars/src/types';

import { monthDotData, monthLocaleData } from '@configs/monthCalendarData';

import convertKey from '@utils/convertKey';
import useBoolean from '@utils/useBoolean';

import AppLayout from '@components/AppLayout/AppLayout';
import MonthCalendar from '@components/Month/Month.styles';

LocaleConfig.defaultLocale = 'ko';
LocaleConfig.locales.ko = monthLocaleData;

interface DotProps {
  key: string;
  color: string;
}
interface IMarkDate {
  [key: string]: { dots: DotProps[] };
}

const Month = (): React.ReactElement => {
  const maxDate = dayjs().toDate().toDateString();
  const toMonth = dayjs().month() + 1;
  const navigation = useNavigation();

  const [loading, toggleLoading] = useBoolean(true);

  const [year, setYear] = useState(dayjs().year());
  const [month, setMonth] = useState(toMonth);
  const [day, setDay] = useState(dayjs().date());
  const [disableArrowRight, setDisableArrowRight] = useState(true);
  const [markedDates, setMarkedDates] = useState<IMarkDate>({});

  const getMonthData = useCallback(async () => {
    const defaultData = [...Array(day)].map((_v, i) =>
      convertKey({ year: year.toString(), month: month.toString(), day: i.toString() }),
    );

    const thisMonth = await AsyncStorage.multiGet(defaultData);

    thisMonth.forEach((v) => {
      if (v[1] === null) return;
      const { sunny, moon } = monthDotData;
      const dayData = JSON.parse(v[1]);
      const dots: DotProps[] = [];
      if (dayData.day) dots.push(sunny);
      if (dayData.moon) dots.push(moon);
      setMarkedDates((prev) => {
        prev[`${v[0]}`] = { dots };
        return prev;
      });
    });
    toggleLoading();
  }, [month]);

  const onVisibleMonthsChange = useCallback(
    (date: DateData[]) => {
      const { year: localYear, month: localMonth, dateString } = date[0];
      setYear(localYear);
      setMonth(localMonth);
      setDay(dayjs(dateString).daysInMonth());
      setDisableArrowRight(localMonth === toMonth);
    },
    [toMonth],
  );

  const onDayPress = useCallback(
    (data) => navigation.navigate('Diary', { day: `${data.year}-${data.month}-${data.day}` }),
    [navigation],
  );

  useEffect(() => {
    navigation.setOptions({ headerTitle: `${year} 年` });
  }, [year]);

  useEffect(() => {
    getMonthData();
  }, [getMonthData]);

  return (
    <AppLayout loading={loading}>
      <MonthCalendar
        hideExtraDays
        markingType="multi-dot"
        disableAllTouchEventsForDisabledDays
        {...{ maxDate, disableArrowRight, onVisibleMonthsChange, markedDates, onDayPress }}
      />
    </AppLayout>
  );
};

export default Month;
