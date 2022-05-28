import React, { FC, memo } from 'react';
import { View } from 'react-native';
import DayCard from './DayCard/DayCard';
import ListHeader from './ListHeader/ListHeader';

interface IProps {
  id: string;
  itemData: {
    thisDay: number;
    day: string;
    moon: string;
  };
  onNavigateDiaryPage: (day: string) => void;
}

const RenderCard: FC<IProps> = ({ id, itemData, onNavigateDiaryPage }) => (
  <View key={id}>
    {id.split('-')[2] === '01' && (
      <ListHeader>
        {id.split('-')[1] === '01' ? `${id.split('-')[0]}-${id.split('-')[1]}` : id.split('-')[1]}월
      </ListHeader>
    )}
    <DayCard onPress={onNavigateDiaryPage} {...{ id, ...itemData }} />
  </View>
);

export default memo(RenderCard);
