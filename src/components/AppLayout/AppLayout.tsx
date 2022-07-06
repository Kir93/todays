import React, { FC } from 'react';

import LoadingScreen from '@components/LoadingScreen/LoadingScreen';
import A from './AppLayout.styles';

interface IProps {
  children: JSX.Element | JSX.Element[];
  loading?: boolean;
  onPress?: () => void;
}

const AppLayout: FC<IProps> = ({ children, loading, onPress }) =>
  loading ? (
    <LoadingScreen />
  ) : (
    <A.AvoidView onPress={onPress}>
      <A.SafeAreaView>{children}</A.SafeAreaView>
    </A.AvoidView>
  );

export default AppLayout;

AppLayout.defaultProps = {
  loading: false,
  onPress: () => {},
};
