import styled from 'styled-components/native';

export default styled.Text`
  font-family: ${({ theme }) => theme.regular};
  font-size: 16px;
  text-align: center;
  color: ${({ theme }) => theme.primaryColor};
`;
