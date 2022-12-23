export interface GetUserProfileResponse {
  message: string;
  data: {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    profilePictureURL: string;
  };
}
