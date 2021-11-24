import React, { memo, useCallback, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, Platform } from 'react-native';

import { DateTimePickerWrapper, IOSHeaderButtonWrap } from './styles';

interface IProps {
  date: Date;
  show: boolean;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const CDateTimePicker = ({ date, show, setDate, setShow }: IProps) => {
  const isIOS = Platform.OS === 'ios';
  const [localDate, setLocalDate] = useState(date);

  const onCloseDate = useCallback(() => setShow(false), []);

  const onSelectToday = useCallback(() => {
    setDate(new Date());
    setShow(false);
  }, [date]);

  const onSelectDate = useCallback(() => {
    setDate(localDate);
    setShow(false);
  }, [date, localDate]);

  const onChangeDate = useCallback(
    (_e, currentDate) => {
      if (isIOS) setLocalDate(currentDate);
      else {
        setDate(currentDate);
        setShow(false);
      }
    },
    [date, localDate],
  );
  return show ? (
    <DateTimePickerWrapper>
      {isIOS && (
        <IOSHeaderButtonWrap>
          <Button title="닫기" onPress={onCloseDate} color="tomato" />
          <Button title="오늘" onPress={onSelectToday} color="white" />
          <Button title="선택" onPress={onSelectDate} />
        </IOSHeaderButtonWrap>
      )}
      <DateTimePicker
        testID="dateTimePicker"
        mode="date"
        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
        value={localDate}
        locale="ko"
        onChange={onChangeDate}
        textColor="white"
      />
    </DateTimePickerWrapper>
  ) : null;
};

export default memo(CDateTimePicker);
