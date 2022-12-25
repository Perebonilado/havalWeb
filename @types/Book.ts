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

export interface GetBookByIdQuery {
  token: string;
  id: string;
}

export interface GetBookByIdResponse {
  message: string;
  data: [
    {
      _id: string;
      title: string;
      author: string;
      bookUrl: string;
      coverImageUrl: string;
      user: {
        _id: string;
        firstName: string;
        lastName: string;
        username: string;
        profilePictureURL: string;
      };
      releaseDate: Date | string;
      rating: number;
      purchaseCount: number;
      amount: number;
      genre: string;
      description: string;
      __v: number;
    }
  ];
}
