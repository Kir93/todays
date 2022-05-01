import React from 'react';

import { Text } from '@atoms/Default';
import { GoodWordWrap } from './GoodWord.styles';

interface IProps {
  focus: boolean;
  message: string;
  author: string;
}

const GoodWord = ({ focus, message, author }: IProps): React.ReactElement => (
  <GoodWordWrap focus={focus}>
    <Text>
      {message} -{author}
    </Text>
  </GoodWordWrap>
);

export default GoodWord;
