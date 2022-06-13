import styled from 'styled-components/native';

const LoadingWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const AvoidView = styled.Pressable`
  flex: 1;
`;

export const SafeAreaView = styled.KeyboardAvoidingView`
  flex: 1;
  padding: 12px 24px;
  background-color: ${(props) => props.theme.backgroundColor};
`;

const A = {
  LoadingWrapper,
  AvoidView,
  SafeAreaView,
};

export default A;
