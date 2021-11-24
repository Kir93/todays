import styled from 'styled-components/native';

export const GoodWordWrap = styled.View<{ focus: boolean }>`
  height: 50px;
  align-items: center;
  margin-top: 15px;
  padding: 0 30px;
  ${({ focus }) => focus && { display: 'none' }};
`;
