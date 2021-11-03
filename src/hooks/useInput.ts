import { useCallback, useState } from 'react';

export default <T>(initValue: T): [T, (v: T) => void, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setter] = useState(initValue);
  const handler = useCallback((v) => {
    setter(v);
  }, []);
  return [value, handler, setter];
};
