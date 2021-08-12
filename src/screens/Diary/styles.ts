import styled from 'styled-components/native';

export const DiaryWrapper = styled.KeyboardAvoidingView`
  background-color: ${(props) => props.theme.backgroundColor};
  flex: 1;
`;

export const FormWrap = styled.ScrollView`
  background-color: ${(props) => props.theme.backgroundColor};
  padding: 30px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => props.theme.fontColor};
  margin: 20px 0 10px;
`;

export const Input = styled.TextInput`
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.fontColor};
  color: ${(props) => props.theme.fontColor};
  font-size: 24px;
`;
