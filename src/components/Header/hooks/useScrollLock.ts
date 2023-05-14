import { useLayoutEffect, useState } from 'react';

type UseLockedBodyOutput = [boolean, (locked: boolean) => void];

function useScrollLock(initialLocked = false): UseLockedBodyOutput {
  const [locked, setLocked] = useState(initialLocked);

  useLayoutEffect(() => {
    const originalOverflow = document.body.style.overflowY;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollBarWidth = window.innerWidth - document.body.offsetWidth;

    if (locked) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
      document.body.style.overflowY = 'hidden';
    }

    return () => {
      document.body.style.overflowY = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [locked]);

  return [locked, setLocked];
}

export default useScrollLock;
