import styled from 'styled-components/native';

export const View = styled.View`
  flex: 1;
  padding: 0 32px;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

export const Text = styled.Text`
  font-family: ${({ theme }) => theme.regular};
  font-size: 16px;
  text-align: center;
  color: ${({ theme }) => theme.fontColor};
`;
