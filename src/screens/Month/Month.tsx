import React, { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { LocaleConfig } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import { DateData } from 'react-native-calendars/src/types';

import AppLayout from '@components/Applayout/AppLayout';
import { MonthCalendar } from './Month.s';

LocaleConfig.locales.ko = {
  monthNames: [
    '1월 ',
    '2월 ',
    '3월 ',
    '4월 ',
    '5월 ',
    '6월 ',
    '7월 ',
    '8월 ',
    '9월 ',
    '10월 ',
    '11월 ',
    '12월 ',
  ],
  monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  dayNames: ['일', '월', '화', '수', '목', '금', '토'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};

const Month = (): React.ReactElement => {
  LocaleConfig.defaultLocale = 'ko';
  const toDay = dayjs();
  const navigation = useNavigation();
  const [arrow, setArrow] = useState(true);
  const sunny = { key: 'vacation', color: 'red' };
  const moon = { key: 'massage', color: 'blue' };
  const onDisabledArrow = useCallback(
    (month: DateData[]) => setArrow(month[0].month === toDay.month() + 1),
    [arrow],
  );
  useEffect(() => {
    navigation.setOptions({ headerTitle: `${toDay.year()} 年` });
  }, [toDay]);

  return (
    <AppLayout>
      <MonthCalendar
        markingType="multi-dot"
        hideExtraDays
        disableAllTouchEventsForDisabledDays
        maxDate={toDay.toDate()}
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