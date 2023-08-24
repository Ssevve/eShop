import { useSyncExternalStore } from 'react';

function useWindowWidth() {
  return useSyncExternalStore(subscribe, getSnapshot);
}

function getSnapshot() {
  return window.innerWidth;
}

function subscribe(callback = () => {}) {
  window.addEventListener('resize', callback);
  return () => {
    window.removeEventListener('resize', callback);
  }
}

export default useWindowWidth;
