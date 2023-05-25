import React, { useEffect } from 'react';
import { DataGrid, GridNoRowsOverlay, GridValidRowModel, useGridApiRef } from '@mui/x-data-grid';
import { Box, SxProps, Theme } from '@mui/material';
import useLocalStorage from 'use-local-storage';
import { ITableProps, ITableSettings } from './types';
import LoadingFullWidth from '../LoadingFullWidth';

const rowHeight = 45;
const headerHeight = 50;

function Table<C extends string, R extends GridValidRowModel>(
  { rows, columns, isLoading, tableId }: ITableProps<C, R>
) {
  const [tableSettings, setTableSettings] = useLocalStorage<ITableSettings>(`table-settings-id:{${tableId}}`, {})
  const apiRef = useGridApiRef();

  useEffect(() => {
    const listener = () => {
      const { sorting, pagination } = apiRef.current.exportState();
      setTableSettings({ sorting, pagination });
    }

    apiRef.current.subscribeEvent('paginationModelChange', listener);
    apiRef.current.subscribeEvent('sortModelChange', listener);
  }, [])

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        apiRef={apiRef}
        sx={dataGridStyle}
        disableRowSelectionOnClick
        disableVirtualization
        disableColumnMenu
        rowSelection={false}
        rows={rows}
        columns={columns}
        editMode="row"
        rowHeight={rowHeight}
        columnHeaderHeight={headerHeight}
        slots={{
          noRowsOverlay: isLoading ? LoadingFullWidth : GridNoRowsOverlay
        }}
        initialState={tableSettings}
      />
    </Box>
  );
}

const dataGridStyle: SxProps<Theme> = {
  '& .MuiDataGrid-columnHeader': {
    '&:focus': { outline: 'none' },
    '&:focus-within': { outline: 'none' },
  },
  '& .MuiDataGrid-virtualScroller': {
    overflowX: 'hidden'
  },
  '& .MuiDataGrid-row': {
    marginLeft: '1px',
    '&.MuiDataGrid-row--editing': {
      boxShadow: 'none',
      marginLeft: '0',
      '& .MuiDataGrid-cell': {
        backgroundColor: 'rgba(0, 0, 0, .04)',
      }
    },
    '& .MuiDataGrid-cell': {
      '&.MuiDataGrid-cell--editing': {
        '&:focus-within': {
          outline: "solid #1976d2 1px",
          outlineOffset: "-1px",
        }
      },
      '& .MuiInputBase-root input': { padding: '10px' },
      '&:focus': { outline: 'none' },
      '&:focus-within': { outline: 'none' },
    }
  }
}

export default Table