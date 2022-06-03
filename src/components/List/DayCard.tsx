import React, { FC, memo } from 'react';
import { Ionicons } from '@expo/vector-icons';
import L from './List.styles';

interface IProps {
  id: string;
  thisDay: number;
  day?: string;
  moon?: string;
  onPress: (day: string) => () => void;
}

const DayCard: FC<IProps> = ({ id, thisDay, day = '', moon = '', onPress }) => (
  <L.DayCardWrapper onPress={onPress(id)}>
    <L.CardDayText>{thisDay}</L.CardDayText>
    <L.CardContentsWrap>
      <L.DetailContentsWrap>
        <Ionicons name="sunny-outline" color="#736355" size={18} />
        <L.CardText numberOfLines={1}>{day}</L.CardText>
      </L.DetailContentsWrap>
      <L.DetailContentsWrap>
        <Ionicons name="moon-outline" color="#736355" size={18} />
        <L.CardText>{moon}</L.CardText>
      </L.DetailContentsWrap>
    </L.CardContentsWrap>
  </L.DayCardWrapper>
);

export default memo(DayCard);

DayCard.defaultProps = {
  day: '',
  moon: '',
};
