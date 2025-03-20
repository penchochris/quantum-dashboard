import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const groupsApiSlice = createApi({
  reducerPath: "groupsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/ui",
  }),
  endpoints: (builder) => ({
    getGroups: builder.query({
      query: () => "group",
    }),
    getGroupPeers: builder.query({
      query: ({ id }) => `group/${id}/peer`,
    }),
    getGroupPeersEvents: builder.query({
      query: ({ id, peer }) => `group/${id}/peer/${peer}/event`,
    }),
  }),
});

export const {
  useGetGroupsQuery,
  useGetGroupPeersQuery,
  useGetGroupPeersEventsQuery,
} = groupsApiSlice;
