import React, { FC } from 'react';
import { Ionicons } from '@expo/vector-icons';
import D from './Diary.styles';

interface IProps {
  type: 'sunny' | 'moon';
  value: string;
  area: boolean;
  done: boolean;
  onChangeText: (value: string) => void;
  onInputAreaToggle: (type: 'sunny' | 'moon') => () => void;
  onInputToggle: (toggle: boolean, type: string) => () => void;
}

const DiaryInputArea: FC<IProps> = ({
  type = 'sunny',
  value,
  area = false,
  done = false,
  onChangeText,
  onInputAreaToggle,
  onInputToggle,
}) => (
  <>
    <D.WritingToggleWrap onPress={onInputAreaToggle(type)}>
      <Ionicons
        name={type === 'sunny' ? 'sunny-outline' : 'moon-outline'}
        color="#736355"
        size={24}
      />
      <Ionicons name={area ? 'ios-chevron-up' : 'ios-chevron-down'} color="#736355" size={24} />
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

export default React.memo(DiaryInputArea);
