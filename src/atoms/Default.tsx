import styled from 'styled-components/native';

export const View = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.backgroundColor};
`;

export const Text = styled.Text`
  color: ${(props) => props.theme.fontColor};
`;
