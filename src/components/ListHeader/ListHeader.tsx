import React from 'react';
import { ListHeaderText } from './ListHeader.styles';

const ListHeader = ({ children }: { children: string[] }): React.ReactElement => (
  <ListHeaderText>{text}</ListHeaderText>
);

export default ListHeader;
