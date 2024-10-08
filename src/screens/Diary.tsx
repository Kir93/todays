import React, { useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { Keyboard, TouchableOpacity } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import maxim from '@configs/maxim.json';
import { DiaryStackNavParamList } from '@navigators/DiaryStackNav';

import useInput from '@utils/useInput';
import getToday from '@utils/getToday';
import useBoolean from '@utils/useBoolean';
import convertKey from '@utils/convertKey';

import Text from '@atoms/Text';

import GoodWord from '@components/Diary/GoodWord';
import AppLayout from '@components/AppLayout/AppLayout';
import DiaryInputArea from '@components/Diary/DiaryInputArea';

const Diary = (): React.ReactElement => {
  const router = useRoute<RouteProp<{ params: DiaryStackNavParamList['Diary'] }>>();
  const param = router?.params;
  const navigation = useNavigation<StackNavigationProp<DiaryStackNavParamList>>();
  const [randomNumber, setRandomNumber] = useState(0);
  const [date, setDate] = useState(() => getToday());
  const [loading, setLoading] = useState(true);

  const [focus, , setFocus] = useBoolean(false);
  const [dayInputArea, toggleDayInputArea] = useBoolean(false);
  const [moonInputArea, toggleMoonInputArea] = useBoolean(false);

  const [dayInput, onChangeDayInput, setDayInput] = useInput('');
  const [moonInput, onChangeMoonInput, setMoonInput] = useInput('');

  const { message, author } = useMemo(() => maxim[randomNumber], [randomNumber]);

  const getTodayData = async (getDate: string) => {
    const data = await AsyncStorage.getItem(getDate);
    if (!data) {
      setDayInput('');
      setMoonInput('');
    } else {
      const parsingData = JSON.parse(data);
      setDayInput(parsingData?.day);
      setMoonInput(parsingData?.moon);
    }
    setLoading(false);
  };

  const onInputAreaToggle = (type: string) => async () => {
    setFocus(false);
    await AsyncStorage.setItem(
      convertKey(date),
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
    const onNavigateListPage = () => {
      onInputAreaToggle('')();
      navigation.navigate('List', { oldToday: date?.day });
    };

    navigation.setOptions({
      headerTitle: () => (
        <TouchableOpacity onPress={onNavigateListPage}>
          <Text>{`${date?.day} 日`}</Text>
        </TouchableOpacity>
      ),
    });
  }, [dayInput, moonInput, date]);

  useEffect(() => {
    setLoading(true);
    let getDateKey = convertKey(date);
    if (param) {
      getDateKey = convertKey(param);
      setDate((prev) => ({
        year: prev?.year !== param?.year ? param?.year : prev?.year,
        month: prev?.month !== param?.month ? param?.month : prev?.month,
        day: param?.day,
      }));
    }
    getTodayData(getDateKey);
  }, [param]);

  return (
    <AppLayout loading={loading} onPress={onInputAreaToggle('')}>
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
