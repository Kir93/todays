import styled from 'styled-components/native';

export const SafeAreaView = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${(props) => props.theme.backgroundColor};
`;

export const WritingWrapper = styled.Pressable`
  padding: 12px 24px;
`;

export const GoodWardWrap = styled.View<{ focus: boolean }>`
  align-items: center;
  margin: 30px 0;
  ${({ focus }) => focus && { display: 'none' }}
`;

export const WritingWrap = styled.View<{ area: boolean }>`
  ${({ area }) => area && { display: 'none' }}
`;

export const WritingToggleWrap = styled.TouchableOpacity`
  margin: 24px 0;
`;

export const WritingArea = styled.TextInput<{ area: boolean; done: boolean }>`
  height: 200px;
  border-radius: 8px;
  background-color: ${({ theme, done }) => (done ? theme.backgroundColor : '#fff')};
  padding: 16px;
  font-family: ${({ theme }) => theme.regular};
  color: ${({ theme }) => theme.primaryColor};
  ${({ area }) => area && { display: 'none' }}
`;
