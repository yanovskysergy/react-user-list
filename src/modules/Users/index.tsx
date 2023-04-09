import React from "react";
import { Box, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useGetUsersQuery } from "../../redux/API/API";
import Table from "../../components/Table";
import { IUser } from "../../redux/API/types";
import { IField, tableSchema } from "./tableSchema";
import { useDispatch } from "react-redux";
import { openDialog } from "../../redux/dialog/slice";
import { ADD_USER_DIALOG } from "../../components/DialogRoot/constants";

function Users() {
  const { data, isLoading, isUninitialized } = useGetUsersQuery();
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1
      }}>
      <Button
        sx={{ margin: '0 0 15px auto' }}
        onClick={() => dispatch(openDialog({ id: ADD_USER_DIALOG, props: undefined }))}
      >
        <Add sx={{ marginRight: '5px' }} />
        new user
      </Button>
      <Table<IField, IUser>
        columns={tableSchema.columns}
        rows={data || []}
        isLoading={isUninitialized || isLoading}
        tableId="users-table"
      />
    </Box>
  )
}

export default Users;