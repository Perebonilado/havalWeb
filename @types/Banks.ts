export interface GetBanksListResponse {
  message: string;
  data: Bank[];
}

export interface GetBanksQuery {
  auth_token: string
}

export interface Bank {
  id: number;
  name: string;
  slug: string;
  code: string;
  longcode: string;
  gateway: string;
  pay_with_bank: boolean;
  active: boolean;
  country: string;
  currency: string;
  type: string;
  is_deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface VerifyBankAccountResponse {
  message: string;
  data: {
    account_number: string;
    account_name: string;
    bank_id: number;
  };
}

export interface VerifyBankAccountPayload {
  account_number: string | number;
  bank_code: string;
  auth_token: string
}
