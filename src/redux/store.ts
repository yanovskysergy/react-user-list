import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { api } from './API/API'
import dialogReduser from './dialog/slice';
import dialogMiddleware from './dialog/middlewares'

export const store = configureStore({
  reducer: {
    dialog: dialogReduser,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(
      api.middleware, 
      dialogMiddleware.middleware
    )
});

export type RootState = ReturnType<typeof store.getState>

setupListeners(store.dispatch);