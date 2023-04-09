import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dialog } from "@mui/material";
import { ADD_USER_DIALOG } from "./constants";
import { dialogSelector } from "../../redux/dialog/selectors";
import { closeDialog } from "../../redux/dialog/slice";
import AddUserForm from "../../modules/Users/AddUserForm";

const contentList = {
  [ADD_USER_DIALOG]: AddUserForm
}

function Empty() {
  return null;
}

function DialogRoot() {
  const dialog = useSelector(dialogSelector);
  const dispatch = useDispatch();

  if (!dialog) return null;

  const Content = dialog ? contentList[dialog.id] : Empty;

  return (
    <Dialog
      open={!!dialog}
      onClose={() => dispatch(closeDialog())}
      fullWidth={false}
    >
      <Content />
    </Dialog>
  )
}

export default DialogRoot