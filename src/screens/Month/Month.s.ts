import styled from 'styled-components/native';
import { Calendar } from 'react-native-calendars';

export const MonthCalendar = styled(Calendar).attrs(({ theme }) => ({
  theme: {
    backgroundColor: theme.backgroundColor,
    calendarBackground: theme.backgroundColor,
    textSectionTitleColor: theme.fontColor,
    selectedDayTextColor: theme.fontColor,
    todayTextColor: theme.primaryColor,
    dayTextColor: theme.lightColor,
    arrowColor: theme.primaryColor,
    monthTextColor: theme.primaryColor,
    indicatorColor: theme.primaryColor,
    textDayFontFamily: 'NotoSansKR_400Regular',
    textMonthFontFamily: 'NotoSansKR_700Bold',
    textDayHeaderFontFamily: 'NotoSansKR_400Regular',
    textDayFontSize: 18,
    textMonthFontSize: 18,
    textDayHeaderFontSize: 18,
  },
}))`
  height: 600px;
`;
