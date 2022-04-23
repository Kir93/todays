import { useCallback, useState } from 'react';

export default (initBoolean = false): [boolean, (toggler?: boolean) => void] => {
  const [isBoolean, toggle] = useState(initBoolean);

  const toggleFunction = useCallback(
    (toggler) => (toggler ? toggle(toggler) : toggle((prev) => !prev)),
    [],
  );

  return [isBoolean, toggleFunction];
};
