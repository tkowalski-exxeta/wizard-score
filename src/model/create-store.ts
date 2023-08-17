import { configureStore } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/query";
import { reducer } from "./slice";

export function createStore(preloadedState?: object) {
  const store = configureStore({
    reducer: reducer,
    preloadedState,
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware({
    //         serializableCheck: false,
    //     }).concat(statisticsApi.middleware),
  });

  // optional, but required for refetchOnFocus/refetchOnReconnect behaviors
  // see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
  // setupListeners(store.dispatch);
  return store;
}
