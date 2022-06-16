import Text from '@atoms/Text';
import React, { FC } from 'react';
import A from './AppLayout.styles';

interface IProps {
  children: JSX.Element | JSX.Element[];
  loading: boolean;
  onPress?: () => void;
}

const AppLayout: FC<IProps> = ({ children, loading = true, onPress }) =>
  loading ? (
    <A.LoadingWrapper>
      <Text>Loading...</Text>
    </A.LoadingWrapper>
  ) : (
    <A.AvoidView onPress={onPress}>
      <A.SafeAreaView>{children}</A.SafeAreaView>
    </A.AvoidView>
  );

export default AppLayout;

AppLayout.defaultProps = {
  onPress: () => {},
};
