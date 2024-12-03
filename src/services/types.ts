export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  errorMessage?: string;
}

export interface User {
  id: number;
  username: string;
  password: string;
  profile: Profile;
  token: string;
}

export interface Profile {
  name: string;
  email: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  author: number;
}
