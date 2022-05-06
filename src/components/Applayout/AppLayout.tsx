import React from 'react';
import A from './AppLayout.s';

interface IProps {
  onPress?: () => void;
  children: (string | React.ReactElement) | (string | React.ReactElement)[];
}

const AppLayout = ({ onPress, children }: IProps): React.ReactElement => (
  <A.AvoidView onPress={onPress}>
    <A.SafeAreaView>{children}</A.SafeAreaView>
  </A.AvoidView>
);

export default AppLayout;

AppLayout.defaultProps = {
  onPress: () => {},
};
