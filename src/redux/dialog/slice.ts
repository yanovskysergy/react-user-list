import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IDialogID, IDialogProps } from '../../components/DialogRoot/types'
import { LOCAL_STORAGE_DIALOG_STATE } from '../../components/DialogRoot/constants';

interface IExistDialogState<ID extends IDialogID = IDialogID> {
  id: ID,
  props: IDialogProps[ID]
}

interface IDilogState<ID extends IDialogID = IDialogID> {
  dialogState: IExistDialogState<ID> | null
}

const getInitialState = (): IDilogState => ({
  dialogState: JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_DIALOG_STATE) || "null") as IExistDialogState | null
});

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState: getInitialState(),
  reducers: {
    openDialog: (state, { payload }: PayloadAction<IExistDialogState>) => {
      state.dialogState = payload
    },
    closeDialog: (state) => {
      state.dialogState = null
    }
  },
})

export const { openDialog, closeDialog } = dialogSlice.actions

export default dialogSlice.reducer