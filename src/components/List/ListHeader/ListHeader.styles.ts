import styled from 'styled-components/native';
import { Text } from '@atoms/Text';

export const ListHeaderText = styled(Text)`
  font-family: ${({ theme }) => theme.bold};
  color: ${({ theme }) => theme.fontColor}
  font-size: 24px;
  text-align: left;
  margin: 15px;
`;
