import styled from 'styled-components/native';
import { WINDOW_HEIGHT } from 'configs/windowSize';

const WritingToggleWrap = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 24px 0;
`;

const WritingArea = styled.TextInput<{ area: boolean; done: boolean }>`
  height: ${WINDOW_HEIGHT / 2 - 200}px;
  border-radius: 8px;
  background-color: ${({ theme, done }) => (done ? theme.backgroundColor : '#fff')};
  border: ${({ theme, done }) => (done ? `1px solid ${theme.lightColor}` : '0')};
  padding: 16px;
  text-align-vertical: top;
  font-family: ${({ theme }) => theme.regular};
  color: ${({ theme }) => theme.primaryColor};
  ${({ area }) => area && { display: 'none' }}
`;

const GoodWordWrap = styled.View<{ focus: boolean }>`
  min-height: 50px;
  align-items: center;
  margin-top: 15px;
  padding: 0 30px;
  ${({ focus }) => focus && { display: 'none' }};
`;

const D = {
  WritingToggleWrap,
  WritingArea,
  GoodWordWrap,
};

export default D;
