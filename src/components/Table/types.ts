import { GridColDef, GridPaginationInitialState, GridSortingInitialState, GridValidRowModel } from "@mui/x-data-grid"

export interface IColumn<C extends string, R extends GridValidRowModel> extends Omit<GridColDef<R, C>, 'field'> {
  field: C
}

export interface ITableProps<C extends string, R extends GridValidRowModel> {
  columns: IColumn<C, R>[]
  rows: R[]
  isLoading: boolean
  tableId: string
}

export interface ITableSchema<C extends string, R extends GridValidRowModel> {
  columns: IColumn<C, R>[]
}

export interface ITableSettings {
  sorting?: GridSortingInitialState,
  pagination?: GridPaginationInitialState
}