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
  GetBookByIdQuery,
  GetBookByIdResponse,
} from "../../@types/Book";
import { UploadBookPayload, UploadBookResponse } from "../../@types/Upload";
import { GetUserProfileResponse } from "../../@types/User";
import {
  GenerateTokenQuery,
  GenerateTokenResponse,
  SendTokenViaEmailPayload,
  SendTokenViaEmailResponse,
  GetUnusedTokenResponse,
  GetUnusedTokensQuery
} from "../../@types/Token";

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
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    uploadBook: builder.mutation<UploadBookResponse, UploadBookPayload>({
      query: ({ data, token }) => ({
        url: "books/upload-book",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getUserProfile: builder.query<GetUserProfileResponse, string>({
      query: (token) => ({
        url: "user/profile-info",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getBookById: builder.query<GetBookByIdResponse, GetBookByIdQuery>({
      query: ({ token, id }) => ({
        url: `books/retrieve-one-merchant-book/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    generateSalesToken: builder.mutation<
      GenerateTokenResponse,
      GenerateTokenQuery
    >({
      query: ({ token, id }) => ({
        url: `sales-token/generate/${id}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    sendTokenViaEmail: builder.mutation<
      SendTokenViaEmailResponse,
      SendTokenViaEmailPayload
    >({
      query: ({ auth_token, token, assetName, email, assetImage }) => ({
        url: "sales-token/send-token-email",
        method: "POST",
        body: { token, assetName, email, assetImage },
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      }),
    }),
    getUnusedTokens: builder.query<GetUnusedTokenResponse, GetUnusedTokensQuery>({
      query: ({asset_id, asset_type, auth_token})=>({
        url: `sales-token/get-unused-tokens?asset_type=${asset_type}&asset_id=${asset_id}`,
        headers: {
          Authorization: `Bearer ${auth_token}`
        }
      })
    })
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useGetMerchantBooksQuery,
  useUploadBookMutation,
  useGetUserProfileQuery,
  useGetBookByIdQuery,
  useGenerateSalesTokenMutation,
  useSendTokenViaEmailMutation,
  useGetUnusedTokensQuery
} = api;
