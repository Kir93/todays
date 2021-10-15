import React, { useCallback, useEffect, useState } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import HeaderTitle from '@components/Diary/HeaderTitle';
import CDateTimePicker from '@components/Common/CDateTimePicker';
import { DiaryWrapper, FormWrap, Input, SafeAreaView, Title } from './styles';

const Diary = (): React.ReactElement => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const onOpen = useCallback(() => setShow(true), [show]);
  const onClose = useCallback(() => {
    setShow(false);
    Keyboard.dismiss();
  }, [show]);

  const DateTitle = () => <HeaderTitle date={date} onOpen={onOpen} />;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: DateTitle,
    });
  }, [date]);
  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={onClose}>
        <DiaryWrapper behavior="padding">
          <FormWrap>
            <Title>테스트</Title>
            <Input />
            <Input />
            <Input />
            <Title>테스트</Title>
            <Input />
            <Input />
            <Input />
            <Title>테스트</Title>
            <Input />
            <Input />
            <Input />
            <Title>테스트</Title>
            <Input />
            <Input />
            <Input />
            <Title>테스트</Title>
            <Input />
            <Input />
            <Input />
          </FormWrap>
          {show ? (
            <CDateTimePicker date={date} show={show} setDate={setDate} setShow={setShow} />
          ) : null}
        </DiaryWrapper>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Diary;
