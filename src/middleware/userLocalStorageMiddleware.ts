import { setUser } from "@/features/auth";
import { createListenerMiddleware } from "@reduxjs/toolkit";

export const userLocalStorageMiddleware = createListenerMiddleware();
userLocalStorageMiddleware.startListening({
  actionCreator: setUser,
  effect: async (action) => {
    if (action.payload) localStorage.setItem('user', JSON.stringify(action.payload));
    else localStorage.removeItem('user');
  }
});