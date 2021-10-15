import styled from 'styled-components/native';

export const SafeAreaView = styled.SafeAreaView`
  background-color: ${(props) => props.theme.backgroundColor};
`;

export const DiaryWrapper = styled.KeyboardAvoidingView`
  background-color: ${(props) => props.theme.backgroundColor};
`;

export const FormWrap = styled.ScrollView`
  padding: 0 30px;
  background-color: ${(props) => props.theme.backgroundColor};
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => props.theme.fontColor};
  margin: 20px 0 10px;
`;

export const Input = styled.TextInput`
  font-size: 18px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  color: #fff;
  padding: 5px 10px;
  margin-bottom: 5px;
`;
