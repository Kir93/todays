import React from 'react';
import { ListHeaderText } from './ListHeader.styles';

const ListHeader = ({ children }: { children: string[] }): React.ReactElement => (
  <ListHeaderText>{children}</ListHeaderText>
);

export default ListHeader;
