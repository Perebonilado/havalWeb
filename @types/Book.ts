export interface GetMerchantsBookQuery {
  perPage: string | number;
  page: string | number;
  token: string;
}

export interface Book {
  _id: string;
  title: string;
  author: string;
  bookUrl: string;
  coverImageUrl: string;
  user: string;
  releaseDate: Date;
  rating: number;
  purchaseCount: number;
  amount: number;
  genre: string;
  description: string;
  __v: number;
}

export interface GetMerchantsBooksResponse {
  message: string;
  data: Book[];
  page: number;
  totalPageCount: number;
}
