import React, { useCallback, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Keyboard, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import maxim from '@utils/maxim.json';

import useInput from '@hooks/useInput';
import getToday from '@hooks/getToday';
import useBoolean from '@hooks/useBoolean';
import convertKey from '@hooks/convertKey';

import { Text } from '@atoms/Default';

import GoodWord from '@components/Diary/GoodWord';
import AppLayout from '@components/AppLayout/AppLayout';
import DiaryInputArea from '@components/Diary/DiaryInputArea';

interface IParams {
  day: string;
}

const Diary = (): React.ReactElement => {
  const route = useRoute();
  const navigation = useNavigation();
  const [randomNumber, setRandomNumber] = useState(0);
  const { message, author } = maxim[randomNumber];
  const [{ year, month, day }, setDate] = useState(getToday());

  const [focus, , setFocus] = useBoolean(false);
  const [sunny, toggleSunny] = useBoolean(false);
  const [moon, toggleMoon] = useBoolean(false);

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
      const data = await AsyncStorage.getItem(getDate ?? convertKey({ year, month, day }));
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

  const onInputAreaToggle = useCallback(
    (type: 'sunny' | 'moon' | '') => async () => {
      setFocus(false);
      await AsyncStorage.setItem(
        convertKey({ year, month, day }),
        JSON.stringify({ day: dayInput, moon: moonInput }),
      );
      Keyboard.dismiss();
      if (type === 'sunny') toggleSunny();
      else if (type === 'moon') toggleMoon();
    },
    [toggleSunny, toggleMoon, convertKey, Keyboard],
  );

  const onInputToggle = useCallback(
    (toggle: boolean, type: string) => () => {
      if (!focus) setFocus(toggle);
      if (type === 'sunny') return toggle ? toggleMoon(true) : toggleMoon(false);
      return toggle ? toggleSunny(true) : toggleSunny(false);
    },
    [focus, toggleMoon, toggleSunny],
  );

  useEffect(() => {
    const newRandomNumber = Math.floor(Math.random() * maxim.length);
    setRandomNumber(newRandomNumber);
    navigation.setOptions({
      headerTitle: DayTitle,
    });
  }, [maxim, DayTitle, navigation]);

  useEffect(() => {
    if (route.params) {
      const { day: paramDay } = route.params as IParams;
      const [otherYear, otherMonth, otherDay] = paramDay.split('-');
      setDate({ year: otherYear, month: otherMonth, day: otherDay });
      getTodayData(paramDay);
    } else {
      setDate(getToday());
      getTodayData();
    }
  }, [route]);

  return (
    <AppLayout onPress={onInputAreaToggle('')}>
      <>
        <GoodWord {...{ focus, message, author }} />
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
      </>
    </AppLayout>
  );
};

export default Diary;
