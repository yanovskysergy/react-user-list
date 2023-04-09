import React from "react";
import { IconButton } from "@mui/material";
import { Cancel, Delete, Edit, Save } from "@mui/icons-material";
import { api as serverApi } from '../../redux/API/API';
import { store } from '../../redux/store';
import { IUser } from "../../redux/API/types";
import { ITableSchema } from "../../components/Table/types";

export type IField = 'name' | 'age' | 'about' | 'edit';

export const tableSchema: ITableSchema<IField, IUser> = {
  columns: [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      editable: true
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      flex: 1,
      editable: true
    },
    {
      field: "about",
      headerName: "About person",
      flex: 2,
      editable: true
    },
    {
      field: "edit",
      headerName: "",
      width: 100,
      editable: false,
      sortable: false,
      renderCell: ({ api, row }) => {
        const isEditableRow = Object.prototype.hasOwnProperty.call(api.state.editRows, row.id);

        if (isEditableRow) {
          return (
            <>
              <IconButton
                onClick={() => {
                  const newRow = Object.entries(api.state.editRows[row.id]).reduce(
                    (acc, [key, { value }]) => {
                      // @ts-ignore
                      acc[key] = value;
                      return acc;
                    },
                    { id: row.id } as IUser
                  );
                  store.dispatch(serverApi.endpoints.editUser.initiate(newRow));
                  api.stopRowEditMode({ id: row.id });
                }}
              >
                <Save />
              </IconButton>
              <IconButton
                onClick={() => {
                  api.stopRowEditMode({ id: row.id, ignoreModifications: true });
                }}
              >
                <Cancel />
              </IconButton>
            </>
          )
        }

        return (
          <>
            <IconButton
              onClick={() => {
                Object.keys(api.state.editRows).forEach(id => api.stopRowEditMode({ id }));
                api.startRowEditMode({ id: row.id });
              }}
            >
              <Edit />
            </IconButton>
            <IconButton
              onClick={() => {
                store.dispatch(serverApi.endpoints.deleteUser.initiate(row));
              }}
            >
              <Delete />
            </IconButton>
          </>
        );
      }
    }
  ],
}