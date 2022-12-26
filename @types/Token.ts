export interface GenerateTokenResponse {
  message: string;
  data: {
    token: string;
    bookTitle: string;
    bookDescription: string;
    author: string;
    amount: number;
    bookCover: string;
  };
}

export interface GenerateTokenQuery {
    token: string;
    id: string;
}

export interface SendTokenViaEmailQuery {
  auth_token: string;
  assetName: string;
  token: string;
  email: string;
}

export interface SendTokenViaEmailResponse {
  message: string; 
}
