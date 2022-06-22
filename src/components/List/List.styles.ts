import styled from 'styled-components/native';

import Text from '@atoms/Text';

const ListHeaderPaddingView = styled.View`
  padding-bottom: 35px;
`;

const DayCardWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${({ theme }) => theme.lightColor};
  border-radius: 8px;
  padding: 15px;
  padding-right: 20px;
  margin: 5px 15px;
  height: 100px;
`;
const CardContentsWrap = styled.View`
  width: 75%;
  margin-left: 5px;
`;

const DetailContentsWrap = styled.View`
  flex-direction: row;
  align-items: center;
  height: 35px;
`;

const CardDayText = styled(Text)`
  width: 25%;
  text-align: center;
  font-size: 24px;
  font-family: ${({ theme }) => theme.medium};
`;

const CardText = styled(Text)`
  flex-shrink: 1;
  margin-left: 10px;
  line-height: 18px;
  font-size: 16px;
`;

export const ListHeaderText = styled(Text)`
  font-family: ${({ theme }) => theme.bold};
  color: ${({ theme }) => theme.fontColor};
  font-size: 24px;
  text-align: left;
  margin: 15px;
`;

const L = {
  ListHeaderPaddingView,
  DayCardWrapper,
  CardContentsWrap,
  DetailContentsWrap,
  CardDayText,
  CardText,
  ListHeaderText,
};

export default L;
