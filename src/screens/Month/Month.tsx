import React from 'react';
import { LocaleConfig } from 'react-native-calendars';

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
  return (
    <AppLayout>
      <MonthCalendar />
    </AppLayout>
  );
};

export default Month;
