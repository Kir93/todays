import React, { useEffect } from 'react';
import dayjs from 'dayjs';

import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Text } from '@atoms/Default';
import AppLayout from '@components/Applayout/AppLayout';

import DayCard from '@components/DayCard/DayCard';

const examCardData = [
  { day: '17', sunnyCardText: '테스테테스트', moonCardText: '밤 일기 테스트세트스' },
  { day: '14', sunnyCardText: '테스테테스트', moonCardText: '밤 일기 테스트세트스' },
  { day: '11', sunnyCardText: '테스테테스트', moonCardText: '밤 일기 테스트세트스' },
  { day: '10', sunnyCardText: '테스테테스트', moonCardText: '밤 일기 테스트세트스' },
];

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
      <>
        {examCardData.map((data) => (
          <DayCard key={data?.day} {...data} />
        ))}
      </>
    </AppLayout>
  );
};

export default List;
