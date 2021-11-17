import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Text } from '@atoms/Default';
import AppLayout from '@components/Applayout/AppLayout';

import {
  CardContentsWrap,
  CardDayText,
  CardText,
  DayCardWrapper,
  DetailContentsWrap,
} from './List.s';

const List = (): React.ReactElement => {
  const navigation = useNavigation();
  const month = dayjs().month();

  const onNavigateMonthPage = () => navigation.navigate('Month');

  const MonthTitle = () => (
    <TouchableOpacity onPress={onNavigateMonthPage}>
      <Text>{`${month} 月`}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: MonthTitle,
    });
  }, [month]);

  return (
    <AppLayout>
      <DayCardWrapper>
        <CardDayText>17</CardDayText>
        <CardContentsWrap>
          <DetailContentsWrap>
            <Ionicons name="sunny-outline" color="#736355" size={18} />
            <CardText numberOfLines={1}>내용이 길어지면 어떻게 되는건가요?...</CardText>
          </DetailContentsWrap>
          <DetailContentsWrap>
            <Ionicons name="moon-outline" color="#736355" size={18} />
            <CardText>내용</CardText>
          </DetailContentsWrap>
        </CardContentsWrap>
      </DayCardWrapper>
    </AppLayout>
  );
};

export default List;
