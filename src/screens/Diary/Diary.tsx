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
  const [area, setArea] = useState('');
  const [dayInput, setDayInput] = useState('');
  const [moonInput, setMoonInput] = useState('');

  const DayTitle = () => <Text>{`${day}日`}</Text>;
  const headerRight = () => <Text>Right</Text>;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: DayTitle,
      headerRight,
    });
  }, [day]);

  const onChangeText = (type: 'day' | 'moon') => (value: string) =>
    type === 'day' ? setDayInput(value) : setMoonInput(value);

  const onInputAreaToggle = (type: string) => () => {
    if (focus) {
      setFocus(false);
      return Keyboard.dismiss();
    }
    if (type === 'sunny') setArea((prev) => (prev !== 'sunny' ? 'sunny' : ''));
    if (type === 'moon') setArea((prev) => (prev !== 'moon' ? 'moon' : ''));
  };

  const onInputToggle = (toggle: boolean, type: string) => () => {
    setFocus(toggle);
    if (type === 'sunny') setArea((prev) => (prev !== 'moon' ? 'moon' : ''));
    if (type === 'moon') setArea((prev) => (prev !== 'sunny' ? 'sunny' : ''));
  };

  return (
    <SafeAreaView>
      <WritingWrapper onPress={() => Keyboard.dismiss()}>
        <GoodWardWrap focus={focus}>
          <Text>Good Word</Text>
        </GoodWardWrap>
        <WritingWrap area={area === 'sunny'}>
          <WritingToggleWrap onPress={onInputAreaToggle('sunny')}>
            <Ionicons name="sunny-outline" color="#736355" size={24} />
          </WritingToggleWrap>
          <WritingArea
            multiline
            value={dayInput}
            onChangeText={onChangeText('day')}
            onFocus={onInputToggle(true, 'sunny')}
            onBlur={onInputToggle(false, 'sunny')}
            area={area === 'sunny'}
          />
        </WritingWrap>
        <WritingWrap area={area === 'moon'}>
          <WritingToggleWrap onPress={onInputAreaToggle('moon')}>
            <Ionicons name="moon-outline" color="#736355" size={24} />
          </WritingToggleWrap>
          <WritingArea
            multiline
            value={moonInput}
            onChangeText={onChangeText('moon')}
            onFocus={onInputToggle(true, 'moon')}
            onBlur={onInputToggle(false, 'moon')}
            area={area === 'moon'}
          />
        </WritingWrap>
      </WritingWrapper>
    </SafeAreaView>
  );
};

export default Diary;
