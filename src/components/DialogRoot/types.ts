import { IFormValues as IAddUserFormValues } from "../../modules/Users/types";
import { ADD_USER_DIALOG } from "./constants";

type EmptyState = {
  props?: undefined
}

export interface IDialogProps {
  [ADD_USER_DIALOG]: EmptyState['props']
}

export type IDialogID = keyof IDialogProps;

interface IDiaogStoredStateList {
  [ADD_USER_DIALOG]: Partial<IAddUserFormValues>
}

export type IDiaogStoredState<ID extends IDialogID> = {
  id: ID
  props: IDialogProps[ID]
  state?: IDiaogStoredStateList[ID]
} | null;
