import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const dialogSelector = (state: RootState) => state.dialog.dialogState;

export const isDialogOpenSelector = createSelector(
    dialogSelector,
    (dialog) => !!dialog?.id
)