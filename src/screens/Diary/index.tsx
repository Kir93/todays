import React, { useCallback, useEffect, useState } from 'react';

import { View, Text } from '@atoms/Default';
import { useNavigation } from '@react-navigation/native';
import HeaderTitle from '@components/Diary/HeaderTitle';
import CDateTimePicker from '@components/Common/CDateTimePicker';

const Diary = (): React.ReactElement => {
  const text = 'Diary';
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const onOpen = useCallback(() => setShow(true), [show]);

  const DateTitle = () => <HeaderTitle date={date} onOpen={onOpen} />;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: DateTitle,
    });
  }, [date]);
  return (
    <View>
      <Text>{text}</Text>
      {show && <CDateTimePicker date={date} show={show} setDate={setDate} setShow={setShow} />}
    </View>
  );
};

export default Diary;
