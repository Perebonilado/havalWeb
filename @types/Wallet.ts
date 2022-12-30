export interface GetWalletInfoResponse {
  revenueWallet: {
    _id: string;
    amount: number;
  };
  tokenWallet: {
    _id: string;
    amount: number;
  };
}

export interface GetWalletInfoQuery {
  token: string;
}

export interface FundTokenWalletPayload {
  amount: number;
  initiator: "merchant";
  token: string;
  success_url?: string
}

export interface FundTokenWalletResponse {
  data: {
    status: boolean;
    message: string;
    data: {
      authorization_url: string;
      access_code: string;
      reference: string;
    };
  };
}
