import React, { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LocaleConfig } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import { DateData } from 'react-native-calendars/src/types';
import { StackNavigationProp } from '@react-navigation/stack';

import { monthDotData, monthLocaleData } from '@configs/monthCalendarData';

import { DiaryStackNavParamList } from '@navigators/DiaryStackNav';

import convertKey from '@utils/convertKey';

import Text from '@atoms/Text';

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

const toYear = dayjs().year();
const toMonth = dayjs().month() + 1;
const maxDate = dayjs().toDate().toDateString();

const Month = (): React.ReactElement => {
  const navigation = useNavigation<StackNavigationProp<DiaryStackNavParamList>>();

  const [year, setYear] = useState(toYear);
  const [month, setMonth] = useState(toMonth);
  const [day, setDay] = useState(dayjs().date());
  const [markedDates, setMarkedDates] = useState<IMarkDate>({});
  const [disableArrowRight, setDisableArrowRight] = useState(true);

  const onVisibleMonthsChange = ([
    { year: localYear, month: localMonth, dateString },
  ]: DateData[]) => {
    setYear(localYear);
    setMonth(localMonth);
    setDay(dayjs(dateString).daysInMonth());
    setDisableArrowRight(localYear === toYear && localMonth === toMonth);
  };

  const onDayPress = ({ year: pressYear, month: pressMonth, day: pressDay }: DateData) =>
    navigation.navigate('Diary', {
      year: pressYear.toString(),
      month: pressMonth.toString(),
      day: pressDay.toString(),
    });

  const getMonthData = useCallback(async () => {
    const defaultData = [...Array(day)].map((_, monthDay) =>
      convertKey({ year: year.toString(), month: month.toString(), day: monthDay.toString() }),
    );

    const thisMonthData = await AsyncStorage.multiGet(defaultData);

    thisMonthData.forEach((monthDayData) => {
      if (monthDayData[1] === null) return;
      const { sunny, moon } = monthDotData;
      const dayData = JSON.parse(monthDayData[1]);
      const dots: DotProps[] = [];
      if (dayData.day) dots.push(sunny);
      if (dayData.moon) dots.push(moon);
      setMarkedDates((prev) => {
        prev[`${monthDayData[0]}`] = { dots };
        return prev;
      });
    });
  }, [month]);

  useEffect(() => {
    navigation.setOptions({ headerTitle: () => <Text>{year} 年</Text> });
  }, [year]);

  useEffect(() => {
    getMonthData();
  }, [getMonthData]);

  return (
    <AppLayout loading={Boolean(markedDates?.length)}>
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
