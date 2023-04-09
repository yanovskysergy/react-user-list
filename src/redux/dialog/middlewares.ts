import { createListenerMiddleware } from '@reduxjs/toolkit';
import { closeDialog, openDialog } from './slice';
import { LOCAL_STORAGE_DIALOG_STATE } from '../../components/DialogRoot/constants';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: openDialog,
  effect: (action) => {
    window.localStorage.setItem(LOCAL_STORAGE_DIALOG_STATE, JSON.stringify(action.payload));
  },
});

listenerMiddleware.startListening({
  actionCreator: closeDialog,
  effect: () => {
    window.localStorage.removeItem(LOCAL_STORAGE_DIALOG_STATE);
  }
});

export default listenerMiddleware;