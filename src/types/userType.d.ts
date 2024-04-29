export interface userLoginType {
  email: string;
  password: string;
}

export interface UserType {
  _id?: string;
  fullname?: string;
  username?: string;
  bio?: string;
  email?: string;
  followers?: string[];
  following?: string[];
  createdAt?: string;
  avatar?: string;
}
