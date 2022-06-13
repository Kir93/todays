import React, { FC, memo } from 'react';
import { Ionicons } from '@expo/vector-icons';

import Theme from '@styles/theme';
import D from './Diary.styles';

interface IProps {
  type: 'day' | 'moon';
  value: string;
  area: boolean;
  done: boolean;
  onChangeText: (value: string) => void;
  onInputAreaToggle: (type: 'day' | 'moon') => () => void;
  onInputToggle: (toggle: boolean, type: string) => () => void;
}

const DiaryInputArea: FC<IProps> = ({
  type,
  value,
  area,
  done,
  onChangeText,
  onInputAreaToggle,
  onInputToggle,
}) => (
  <>
    <D.WritingToggleWrap onPress={onInputAreaToggle(type)}>
      <Ionicons
        name={type === 'day' ? 'sunny-outline' : 'moon-outline'}
        color={Theme.primaryColor}
        size={24}
      />
      <Ionicons
        name={area ? 'ios-chevron-up' : 'ios-chevron-down'}
        color={Theme.primaryColor}
        size={24}
      />
    </D.WritingToggleWrap>
    <D.WritingArea
      multiline
      value={value}
      onChangeText={onChangeText}
      onFocus={onInputToggle(true, type)}
      onBlur={onInputToggle(false, type)}
      area={area}
      done={done}
    />
  </>
);

export default memo(DiaryInputArea);
