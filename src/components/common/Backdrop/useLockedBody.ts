import { useEffect, useState } from 'react';

type UseLockedBodyOutput = [boolean, React.Dispatch<React.SetStateAction<boolean>>];

function useLockedBody(initialLocked = false): UseLockedBodyOutput {
  const [locked, setLocked] = useState(initialLocked);

  useEffect(() => {
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

export default useLockedBody;