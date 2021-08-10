import styled from 'styled-components/native';

export const View = styled.View`
  flex: 1;
  padding: 0 32px;
  background-color: ${(props) => props.theme.backgroundColor};
`;

export const Text = styled.Text`
  font-family: 'NotoSansKR_400Regular';
  font-size: 16px;
  color: ${(props) => props.theme.fontColor};
`;
