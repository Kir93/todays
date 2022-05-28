import React, { FC } from 'react';
import A from './AppLayout.styles';

interface IProps {
  onPress?: () => void;
}

const AppLayout: FC<IProps> = ({ children, onPress }) => (
  <A.AvoidView onPress={onPress}>
    <A.SafeAreaView>{children}</A.SafeAreaView>
  </A.AvoidView>
);

export default AppLayout;

AppLayout.defaultProps = {
  onPress: () => {},
};
