import React, { useEffect } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useForm } from 'react-hook-form';
import { useAddUserMutation } from "../../redux/API/API";
import { useDispatch } from "react-redux";
import { closeDialog } from "../../redux/dialog/slice";
import { IFormValues } from "./types";
import useLocalStorage from "use-local-storage";
import { IDiaogStoredState } from "../../components/DialogRoot/types";
import { ADD_USER_DIALOG, LOCAL_STORAGE_DIALOG_STATE } from "../../components/DialogRoot/constants";

function AddUserForm() {
  const [
    storedDialogState,
    setStoredDialogState
  ] = useLocalStorage<IDiaogStoredState<typeof ADD_USER_DIALOG>>(LOCAL_STORAGE_DIALOG_STATE, null);
  const { watch, register, handleSubmit, formState: { errors } } = useForm<IFormValues>({
    defaultValues: storedDialogState?.state
  });

  useEffect(() => {
    const subscription = watch((formValues) => setStoredDialogState((lsState) => {
      return lsState ? { ...lsState, state: formValues } : lsState
    }));
    return () => subscription.unsubscribe();
  }, [watch, setStoredDialogState]);

  const dispatch = useDispatch();
  const [addUserMutation, { isLoading }] = useAddUserMutation();

  const addUser = async (values: IFormValues) => {
    await addUserMutation(values);
    dispatch(closeDialog())
  };

  return (
    <form onSubmit={handleSubmit(addUser)} style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography sx={{ textAlign: 'center', marginBottom: '10px' }} variant="overline">
        New user
      </Typography>
      <TextField
        error={!!errors.name?.message}
        helperText={errors.name?.message}
        label="Name"
        {...register('name', { required: "Name is required" })}
      />
      <TextField
        error={!!errors.age?.message}
        helperText={errors.age?.message}
        type="number"
        label="Age"
        {...register('age', { required: "Age is required" })}
      />
      <TextField label="About person" {...register('about')} />
      <Button type="submit" disabled={isLoading}>
        ADD
      </Button>
    </form>
  );
}

export default AddUserForm;