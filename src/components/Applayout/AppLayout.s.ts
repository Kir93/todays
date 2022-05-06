import styled from 'styled-components/native';

export const AvoidView = styled.Pressable`
  flex: 1;
`;

export const SafeAreaView = styled.KeyboardAvoidingView`
  flex: 1;
  padding: 12px 24px;
  background-color: ${(props) => props.theme.backgroundColor};
`;

const A = {
  AvoidView,
  SafeAreaView,
};

export default A;
