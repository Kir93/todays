import styled from 'styled-components/native';
import { Text } from '@atoms/Text';

export const DayCardWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${({ theme }) => theme.lightColor};
  border-radius: 8px;
  padding: 15px;
  padding-right: 20px;
  margin: 5px 15px;
`;
export const CardContentsWrap = styled.View`
  width: 75%;
  margin-left: 5px;
`;

export const DetailContentsWrap = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 3px 0;
`;

export const CardDayText = styled(Text)`
  width: 25%;
  text-align: center;
  font-size: 24px;
  font-family: ${({ theme }) => theme.medium};
`;

export const CardText = styled(Text)`
  padding-left: 10px;
  font-size: 16px;
`;
