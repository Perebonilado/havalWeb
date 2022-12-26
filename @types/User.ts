interface WalletInfo {
  _id: string;
  user: string;
  transactions: string[];
  amount: number;
  created_at: Date;
  __v: number;
}

export interface GetUserProfileResponse {
  message: string;
  data: {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    profilePictureURL: string;
    tokenWallet: WalletInfo;
    revenueWallet: WalletInfo
  };
}
