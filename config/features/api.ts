import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URI } from "../../@shared/constants";
import {
  LoginPayload,
  LoginResponse,
  SignupPayload,
  SignupResponse,
} from "../../@types/Auth";
import {
  GetMerchantsBooksResponse,
  GetMerchantsBookQuery,
} from "../../@types/Book";

export const api = createApi({
  reducerPath: "haval-api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URI }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginPayload>({
      query: (payload) => ({
        url: "auth/login",
        method: "POST",
        body: payload,
      }),
    }),
    signup: builder.mutation<SignupResponse, SignupPayload>({
      query: (payload) => ({
        url: "auth/signup",
        method: "POST",
        body: payload,
      }),
    }),
    getMerchantBooks: builder.query<
      GetMerchantsBooksResponse,
      GetMerchantsBookQuery
    >({
      query: ({ page, perPage, token }) => ({
        url: `books/retrieve-all-merchant-books?perPage=${perPage}&page=${page}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useGetMerchantBooksQuery } = api;
