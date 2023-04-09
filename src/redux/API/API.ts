import { IUser } from "./types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://63b624601907f863aaeebf52.mockapi.io/" }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], void>({
      query: () => `/users`,
      providesTags: ['Users']
    }),
    addUser: builder.mutation<IUser, Partial<IUser>>({
      query: (body) => ({
        url: `/users`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Users']
    }),
    editUser: builder.mutation<IUser, Partial<IUser>>({
      query: (body) => ({
        url: `/users/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Users']
    }),
    deleteUser: builder.mutation<IUser, Partial<IUser>>({
      query: (body) => ({
        url: `/users/${body.id}`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['Users']
    }),
  }),
});

export const { useGetUsersQuery, useAddUserMutation } = api;