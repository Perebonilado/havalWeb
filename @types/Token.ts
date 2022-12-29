export interface GenerateTokenData {
  token: string;
  bookTitle: string;
  bookDescription: string;
  author: string;
  amount: number;
  bookCover: string;
}

export interface GenerateTokenResponse {
  message: string;
  data: GenerateTokenData[];
}

export interface GenerateTokenQuery {
  token: string;
  id: string;
  count?: number;
}

export interface SendTokenViaEmailPayload {
  auth_token: string;
  assetName: string;
  token: string;
  email: string;
  assetImage: string;
}

export interface SendTokenViaEmailResponse {
  message: string;
}

export interface GetUnusedTokensQuery {
  asset_type: "book" | "audio" | "video";
  asset_id: string;
  auth_token: string;
}

export interface GetUnusedTokenData {
  _id: string;
  user: string;
  amount: number;
  book: {
    title: string;
    coverImageUrl: string;
  };
  token: string;
  sentTo: string;
  created_at: Date;
  __v: number;
}

export interface GetUnusedTokenResponse {
  message: string;
  data: GetUnusedTokenData[];
}
