import React, { memo } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  CardContentsWrap,
  CardDayText,
  CardText,
  DayCardWrapper,
  DetailContentsWrap,
} from './DayCard.s';

interface IProps {
  id: string;
  thisDay: number;
  day?: string;
  moon?: string;
  onPress: (day: string) => () => void;
}

const DayCard = ({ id, thisDay, day = '', moon = '', onPress }: IProps): React.ReactElement => (
  <DayCardWrapper onPress={onPress(id)}>
    <CardDayText>{thisDay}</CardDayText>
    <CardContentsWrap>
      <DetailContentsWrap>
        <Ionicons name="sunny-outline" color="#736355" size={18} />
        <CardText numberOfLines={1}>{day}</CardText>
      </DetailContentsWrap>
      <DetailContentsWrap>
        <Ionicons name="moon-outline" color="#736355" size={18} />
        <CardText>{moon}</CardText>
      </DetailContentsWrap>
    </CardContentsWrap>
  </DayCardWrapper>
);

export default memo(DayCard);

DayCard.defaultProps = { day: '', moon: '' };
