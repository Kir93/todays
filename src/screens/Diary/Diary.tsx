import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Pressable, Keyboard, TouchableOpacity } from 'react-native';

import maxim from '@utils/maxim.json';
import useInput from '@hooks/useInput';

import { Text } from '@atoms/Default';
import GoodWord from '@components/GoodWord/GoodWord';
import AppLayout from '@components/Applayout/AppLayout';
import DiaryInputArea from '@components/DiaryInputArea/DiaryInputArea';

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
    <AppLayout>
      <Pressable onPress={onInputAreaToggle('')}>
        <GoodWord
          focus={focus}
          message={maxim[randomNumber].message}
          author={maxim[randomNumber].author}
        />
        <DiaryInputArea
          type="sunny"
          value={dayInput}
          area={sunny}
          done={!focus && dayInput !== ''}
          onChangeText={onChangeDayInput}
          onInputAreaToggle={onInputAreaToggle}
          onInputToggle={onInputToggle}
        />
        <DiaryInputArea
          type="moon"
          value={moonInput}
          area={moon}
          done={!focus && moonInput !== ''}
          onChangeText={onChangeMoonInput}
          onInputAreaToggle={onInputAreaToggle}
          onInputToggle={onInputToggle}
        />
      </Pressable>
    </AppLayout>
  );
};

export default Diary;
