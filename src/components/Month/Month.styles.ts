import styled from 'styled-components/native';
import { Calendar } from 'react-native-calendars';
import { Platform } from 'react-native';

export default styled(Calendar).attrs(({ theme }) => ({
  theme: {
    backgroundColor: theme.backgroundColor,
    calendarBackground: theme.backgroundColor,
    textSectionTitleColor: theme.fontColor,
    selectedDayTextColor: theme.fontColor,
    todayTextColor: theme.primaryColor,
    dayTextColor: theme.fontColor,
    arrowColor: theme.primaryColor,
    monthTextColor: theme.primaryColor,
    indicatorColor: theme.primaryColor,
    textDayFontFamily: 'NotoSansKR_400Regular',
    textMonthFontFamily: 'NotoSansKR_700Bold',
    textDayHeaderFontFamily: 'NotoSansKR_400Regular',
    textDayFontSize: Platform.OS === 'ios' ? 18 : 15,
    textMonthFontSize: 18,
    textDayHeaderFontSize: 18,
  },
}))`
  height: 600px;
`;
