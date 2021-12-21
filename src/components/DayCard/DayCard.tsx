import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  CardContentsWrap,
  CardDayText,
  CardText,
  DayCardWrapper,
  DetailContentsWrap,
} from './DayCard.s';

interface IProps {
  thisDay: number;
  day?: string;
  moon?: string;
}

const DayCard = ({ thisDay, day = '', moon = '' }: IProps): React.ReactElement => (
  <DayCardWrapper>
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

export default DayCard;

DayCard.defaultProps = { day: '', moon: '' };
