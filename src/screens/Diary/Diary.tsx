import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import useInput from '@hooks/useInput';

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
  const [sunny, setSunny] = useState(false);
  const [moon, setMoon] = useState(false);
  const [dayInput, onChangeDayInput] = useInput('');
  const [moonInput, onChangeMoonInput] = useInput('');

  const DayTitle = () => <Text>{`${day}日`}</Text>;
  const headerRight = () => <Text>Right</Text>;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: DayTitle,
      headerRight,
    });
  }, [day]);

  const onInputAreaToggle = (type: 'sunny' | 'moon' | '') => () => {
    if (focus) {
      setFocus(false);
      return Keyboard.dismiss();
    }
    if (type === 'sunny') setSunny((prev) => !prev);
    else if (type === 'moon') setMoon((prev) => !prev);
    else return null;
  };

  const onInputToggle = (toggle: boolean, type: string) => () => {
    setFocus(toggle);
    if (type === 'sunny') return toggle ? setMoon(true) : setMoon(false);
    return toggle ? setSunny(true) : setSunny(false);
  };

  return (
    <SafeAreaView>
      <WritingWrapper onPress={onInputAreaToggle('')}>
        <GoodWardWrap focus={focus}>
          <Text>Good Word</Text>
        </GoodWardWrap>
        <WritingWrap area={focus && sunny}>
          <WritingToggleWrap onPress={onInputAreaToggle('sunny')}>
            <Ionicons name="sunny-outline" color="#736355" size={24} />
          </WritingToggleWrap>
          <WritingArea
            multiline
            value={dayInput}
            onChangeText={onChangeDayInput}
            onFocus={onInputToggle(true, 'sunny')}
            onBlur={onInputToggle(false, 'sunny')}
            area={sunny}
            done={!focus && dayInput !== ''}
          />
        </WritingWrap>
        <WritingWrap area={focus && moon}>
          <WritingToggleWrap onPress={onInputAreaToggle('moon')}>
            <Ionicons name="moon-outline" color="#736355" size={24} />
          </WritingToggleWrap>
          <WritingArea
            multiline
            value={moonInput}
            onChangeText={onChangeMoonInput}
            onFocus={onInputToggle(true, 'moon')}
            onBlur={onInputToggle(false, 'moon')}
            area={moon}
            done={!focus && moonInput !== ''}
          />
        </WritingWrap>
      </WritingWrapper>
    </SafeAreaView>
  );
};

export default Diary;
