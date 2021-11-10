import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Keyboard, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import maxim from '@utils/maxim.json';
import useInput from '@hooks/useInput';

import { Text } from '@atoms/Default';
import {
  GoodWordWrap,
  SafeAreaView,
  WritingArea,
  WritingToggleWrap,
  WritingWrap,
  WritingWrapper,
} from './Diary.s';

const Diary = (): React.ReactElement => {
  const navigation = useNavigation();
  const day = dayjs().day();
  const [randomNumber, setRandomNumber] = useState(0);
  const [focus, setFocus] = useState(false);
  const [sunny, setSunny] = useState(false);
  const [moon, setMoon] = useState(false);
  const [dayInput, onChangeDayInput] = useInput('');
  const [moonInput, onChangeMoonInput] = useInput('');

  const onNavigateListPage = () => navigation.navigate('List');

  const DayTitle = () => <Text>{`${day} 日`}</Text>;
  const headerRight = () => (
    <TouchableOpacity onPress={onNavigateListPage}>
      <Ionicons name="bookmark-outline" color="#736355" size={18} />
    </TouchableOpacity>
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: DayTitle,
      headerRight,
    });
    setRandomNumber(Math.floor(Math.random() * maxim.length));
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
        <GoodWordWrap focus={focus}>
          <Text>{maxim[randomNumber].message}</Text>
          <Text>{maxim[randomNumber].author}</Text>
        </GoodWordWrap>
        <WritingWrap>
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
        <WritingWrap>
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
