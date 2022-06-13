import React, { useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Keyboard, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import maxim from '@configs/maxim.json';

import useInput from '@utils/useInput';
import getToday from '@utils/getToday';
import useBoolean from '@utils/useBoolean';
import convertKey from '@utils/convertKey';

import Text from '@atoms/Text';

import GoodWord from '@components/Diary/GoodWord';
import AppLayout from '@components/AppLayout/AppLayout';
import DiaryInputArea from '@components/Diary/DiaryInputArea';

interface IParams {
  day: string;
}

const Diary = (): React.ReactElement => {
  const router = useRoute();
  const navigation = useNavigation();
  const [randomNumber, setRandomNumber] = useState(0);
  const { message, author } = maxim[randomNumber];
  const [{ year, month, day }, setDate] = useState(getToday());

  const [focus, , setFocus] = useBoolean(false);
  const [dayInputArea, toggleDayInputArea] = useBoolean(false);
  const [moonInputArea, toggleMoonInputArea] = useBoolean(false);

  const [dayInput, onChangeDayInput, setDayInput] = useInput('');
  const [moonInput, onChangeMoonInput, setMoonInput] = useInput('');

  const onNavigateListPage = () => navigation.navigate('List');

  const DayTitle = useMemo(
    () => (
      <TouchableOpacity onPress={onNavigateListPage}>
        <Text>{`${day} 日`}</Text>
      </TouchableOpacity>
    ),
    [onNavigateListPage, day],
  );

  const getTodayData = async (getDate?: string) => {
    const data = await AsyncStorage.getItem(getDate ?? convertKey({ year, month, day }));
    if (!data) {
      setDayInput('');
      setMoonInput('');
    } else {
      const parsingData = JSON.parse(data);
      setDayInput(parsingData?.day);
      setMoonInput(parsingData?.moon);
    }
  };

  const onInputAreaToggle = (type: string) => async () => {
    setFocus(false);
    await AsyncStorage.setItem(
      convertKey({ year, month, day }),
      JSON.stringify({ day: dayInput, moon: moonInput }),
    );
    Keyboard.dismiss();
    if (type === 'day') toggleDayInputArea();
    else if (type === 'moon') toggleMoonInputArea();
  };

  const onInputToggle = (toggle: boolean, type: string) => () => {
    if (!focus) setFocus(toggle);
    if (type === 'day') toggleMoonInputArea(!!toggle);
    else if (type === 'moon') toggleDayInputArea(!!toggle);
  };

  useEffect(() => {
    const newRandomNumber = Math.floor(Math.random() * maxim.length);
    setRandomNumber(newRandomNumber);
    navigation.setOptions({
      headerTitle: DayTitle,
    });
  }, [maxim, DayTitle, navigation]);

  useEffect(() => {
    if (router.params) {
      const { day: paramDay } = router.params as IParams;
      const [otherYear, otherMonth, otherDay] = paramDay.split('-');
      setDate({ year: otherYear, month: otherMonth, day: otherDay });
      getTodayData(paramDay);
    } else {
      setDate(getToday());
      getTodayData();
    }
  }, [router.params]);

  return (
    <AppLayout onPress={onInputAreaToggle('')}>
      <GoodWord {...{ focus, message, author }} />
      <DiaryInputArea
        type="day"
        value={dayInput}
        area={dayInputArea}
        done={Boolean(!focus && dayInput?.length)}
        onChangeText={onChangeDayInput}
        onInputAreaToggle={onInputAreaToggle}
        onInputToggle={onInputToggle}
      />
      <DiaryInputArea
        type="moon"
        value={moonInput}
        area={moonInputArea}
        done={Boolean(!focus && moonInput?.length)}
        onChangeText={onChangeMoonInput}
        onInputAreaToggle={onInputAreaToggle}
        onInputToggle={onInputToggle}
      />
    </AppLayout>
  );
};

export default Diary;
