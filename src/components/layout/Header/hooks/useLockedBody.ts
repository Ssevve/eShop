import { useEffect, useState } from 'react';

type UseLockedBodyOutput = (locked: boolean) => void;

function useLockedBody(initialLocked = false): UseLockedBodyOutput {
  const [locked, setLocked] = useState(initialLocked);

  useEffect(() => {
    const originalOverflow = document.body.style.overflowY;

    if (locked) document.body.style.overflowY = 'hidden';

    return () => {
      document.body.style.overflowY = originalOverflow;
    };
  }, [locked]);

  return setLocked;
}

export default useLockedBody;
