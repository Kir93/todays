import React, { useCallback, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Pressable, Keyboard, TouchableOpacity } from 'react-native';

import maxim from '@utils/maxim.json';
import useInput from '@hooks/useInput';

import { Text } from '@atoms/Default';
import GoodWord from '@components/GoodWord/GoodWord';
import AppLayout from '@components/Applayout/AppLayout';
import DiaryInputArea from '@components/DiaryInputArea/DiaryInputArea';

const Diary = (): React.ReactElement => {
  const navigation = useNavigation();
  const route = useRoute();
  const [date, setDate] = useState({
    year: dayjs().year().toString(),
    month: (dayjs().month() + 1).toString(),
    day: dayjs().date().toString(),
  });
  const { year, month, day } = date;
  const [randomNumber, setRandomNumber] = useState(0);
  const [focus, setFocus] = useState(false);
  const [sunny, setSunny] = useState(false);
  const [moon, setMoon] = useState(false);
  const [dayInput, onChangeDayInput, setDayInput] = useInput('');
  const [moonInput, onChangeMoonInput, setMoonInput] = useInput('');
  const onNavigateListPage = useCallback(() => navigation.navigate('List'), [navigation, day]);
  const DayTitle = useMemo(
    () => (
      <TouchableOpacity onPress={onNavigateListPage}>
        <Text>{`${day} 日`}</Text>
      </TouchableOpacity>
    ),
    [onNavigateListPage, day],
  );

  const getTodayData = useCallback(
    async (getDate?: string) => {
      const data = await AsyncStorage.getItem(
        getDate ?? `${year}-${0 + month.slice(-2)}-${0 + day.slice(-2)}`,
      );
      if (data) {
        const parsingData = JSON.parse(data);
        setDayInput(parsingData?.day);
        setMoonInput(parsingData?.moon);
      } else {
        setDayInput('');
        setMoonInput('');
      }
    },
    [day],
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: DayTitle,
    });
    setRandomNumber(Math.floor(Math.random() * maxim.length));
  }, [DayTitle, day, navigation]);

  useEffect(() => {
    if (route.params) {
      const { day: paramDay } = route.params as { day: string };
      const otherDay = paramDay.split('-');
      setDate({ year: otherDay[0], month: otherDay[1], day: otherDay[2] });
      getTodayData(paramDay);
    } else {
      setDate({
        year: dayjs().year().toString(),
        month: (dayjs().month() + 1).toString(),
        day: dayjs().date().toString(),
      });
      getTodayData();
    }
  }, [route]);

  const onInputAreaToggle = (type: 'sunny' | 'moon' | '') => async () => {
    if (focus) {
      setFocus(false);
      await AsyncStorage.setItem(
        `${year}-${0 + month.slice(-2)}-${0 + day.slice(-2)}`,
        JSON.stringify({ day: dayInput, moon: moonInput }),
      );
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
