import React from 'react';
import { TouchableOpacity } from 'react-native';

import { convertDateFormat } from '@hooks/convertDate';

import { Text } from '@atoms/Text';

interface IProps {
  date: Date;
  onOpen: () => void;
}

const HeaderTitle = ({ date, onOpen }: IProps): React.ReactElement => (
  <>
    <TouchableOpacity onPress={onOpen}>
      <Text>{convertDateFormat(date)}</Text>
    </TouchableOpacity>
  </>
);

export default HeaderTitle;
