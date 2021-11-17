import React from 'react';
import { SafeAreaView } from './AppLayout.s';

const AppLayout = ({ children }: { children: React.ReactElement }): React.ReactElement => (
  <SafeAreaView>{children}</SafeAreaView>
);

export default AppLayout;
