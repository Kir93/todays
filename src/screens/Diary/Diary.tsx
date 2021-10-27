import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { Text } from '@atoms/Default';
import {
  GoodWardWrap,
  SafeAreaView,
  WritingArea,
  WritingToggleWrap,
  WritingWrap,
  WritingWrapper,
} from './Diary.s';

const Diary = (): React.ReactElement => {
  const navigation = useNavigation();
  const day = dayjs().day();
  const [focus, setFocus] = useState(false);

  const DayTitle = () => <Text>{`${day}日`}</Text>;
  const headerRight = () => <Text>Right</Text>;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: DayTitle,
      headerRight,
    });
  }, [day]);

  const onFocus = () => {
    setFocus((prev) => !prev);
  };

  return (
    <SafeAreaView>
      <WritingWrapper onPress={() => Keyboard.dismiss()}>
        <GoodWardWrap focus={focus}>
          <Text>Good Word</Text>
        </GoodWardWrap>
        <WritingWrap>
          <WritingToggleWrap>
            <Ionicons name="sunny-outline" color="#736355" size={24} />
          </WritingToggleWrap>
          <WritingArea multiline onFocus={onFocus} />
        </WritingWrap>
        <WritingWrap>
          <WritingToggleWrap>
            <Ionicons name="moon-outline" color="#736355" size={24} />
          </WritingToggleWrap>
          <WritingArea multiline onFocus={onFocus} />
        </WritingWrap>
      </WritingWrapper>
    </SafeAreaView>
  );
};

export default Diary;
