import React, { FC } from 'react';

import { Text } from '@atoms/Default';
import D from './Diary.styles';

interface IProps {
  focus: boolean;
  message: string;
  author: string;
}

const GoodWord: FC<IProps> = ({ focus, message, author }) => (
  <D.GoodWordWrap focus={focus}>
    <Text>
      {message} -{author}
    </Text>
  </D.GoodWordWrap>
);

export default GoodWord;
