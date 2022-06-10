import styled from 'styled-components/native';

import Text from '@atoms/Text';

const ListLoadingWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
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
`;
const CardContentsWrap = styled.View`
  width: 75%;
  margin-left: 5px;
`;

const DetailContentsWrap = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 3px 0;
`;

const CardDayText = styled(Text)`
  width: 25%;
  text-align: center;
  font-size: 24px;
  font-family: ${({ theme }) => theme.medium};
`;

const CardText = styled(Text)`
  padding-left: 10px;
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
  ListLoadingWrapper,
  DayCardWrapper,
  CardContentsWrap,
  DetailContentsWrap,
  CardDayText,
  CardText,
  ListHeaderText,
};

export default L;
