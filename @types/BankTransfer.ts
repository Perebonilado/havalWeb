export interface CreateTransferRecipientPayload {
  auth_token: string;
  body: {
    name: string;
    account_number: string | number;
    bank_code: string;
  };
}

export interface CreateTransferRecipientResponse {
  message: string;
  data: {
    status: boolean;
    message: string;
    data: {
      active: boolean;
      createdAt: Date;
      currency: string;
      description: string | null;
      domain: string;
      email: string | null;
      id: number;
      integration: string;
      metadata: string | null;
      name: string;
      recipient_code: string;
      type: string;
      updatedAt: string;
      is_deleted: boolean;
      isDeleted: boolean;
      details: {
        authorization_code: string | null;
        account_number: string;
        account_name: string;
        bank_code: string;
        bank_name: string;
      };
    };
  };
}

export interface InitiateTransferPayload {
  body: {
    amount: number;
    recipient: string;
    reason: string;
  };
  auth_token: string;
}

export interface InitiateTransferResponse {
  data: {
    status: boolean;
    message: string;
    data: {
      transfersessionid: [];
      domain: string;
      amount: number;
      currency: string;
      reference: string;
      source: string;
      source_details: null | string;
      reason: string;
      status: string;
      failures: null | string | boolean;
      transfer_code: string;
      titan_code: null;
      transferred_at: null;
      id: number;
      integration: number;
      request: number;
      recipient: number;
      createdAt: Date;
      updatedAt: Date;
    };
  };
}

export interface FinalizeTransferResponse {
  data: {
    status: boolean;
    message: string;
    data: {
      domain: string;
      amount: number;
      currency: string;
      reference: string;
      source: string;
      source_details: string | null;
      reason: string;
      status: string;
      failures: null | string;
      transfer_code: string;
      titan_code: null | string;
      transferred_at: null | string;
      id: number;
      integration: number;
      request: number;
      recipient: number;
      createdAt: Date;
      updatedAt: Date;
    };
  };
}

export interface FinalizeTransferPayload {
  body: {
    otp: string;
    transfer_code: string;
    amount: number;
  };
  auth_token: string
}
