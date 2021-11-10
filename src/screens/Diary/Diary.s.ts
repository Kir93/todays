import styled from 'styled-components/native';
import { WINDOW_HEIGHT } from '@utils/windowSize';

export const SafeAreaView = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${(props) => props.theme.backgroundColor};
`;

export const WritingWrapper = styled.Pressable`
  padding: 12px 24px;
`;

export const GoodWordWrap = styled.View<{ focus: boolean }>`
  height: 50px;
  align-items: center;
  margin-top: 15px;
  ${({ focus }) => focus && { display: 'none' }};
`;

export const WritingWrap = styled.View``;

export const WritingToggleWrap = styled.TouchableOpacity`
  margin: 24px 0;
`;

export const WritingArea = styled.TextInput<{ area: boolean; done: boolean }>`
  height: ${WINDOW_HEIGHT / 2 - 200}px;
  border-radius: 8px;
  background-color: ${({ theme, done }) => (done ? theme.backgroundColor : '#fff')};
  padding: 16px;
  font-family: ${({ theme }) => theme.regular};
  color: ${({ theme }) => theme.primaryColor};
  ${({ area }) => area && { display: 'none' }}
`;
