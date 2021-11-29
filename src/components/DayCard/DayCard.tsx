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
  day: string;
  sunnyCardText: string;
  moonCardText: string;
}

const DayCard = ({ day, sunnyCardText, moonCardText }: IProps): React.ReactElement => (
  <DayCardWrapper>
    <CardDayText>{day}</CardDayText>
    <CardContentsWrap>
      <DetailContentsWrap>
        <Ionicons name="sunny-outline" color="#736355" size={18} />
        <CardText numberOfLines={1}>{sunnyCardText}</CardText>
      </DetailContentsWrap>
      <DetailContentsWrap>
        <Ionicons name="moon-outline" color="#736355" size={18} />
        <CardText>{moonCardText}</CardText>
      </DetailContentsWrap>
    </CardContentsWrap>
  </DayCardWrapper>
);

export default DayCard;
