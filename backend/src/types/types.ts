import { Request } from "express";

export interface SignupBody {
  fullname: string;
  username: string;
  password: string;
  confirm: string;
  email?: string;
  gender: "male" | "female";
}

export interface LoginBody {
  username: string;
  password: string;
}

// extend express request to include `file` (from multer)
export interface MulterRequest<T> extends Request {
  body: T;
  file?: Express.Multer.File;
}

// extend express request to include authenticated user
export interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    username: string;
  };
}