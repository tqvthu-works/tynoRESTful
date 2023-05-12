import { Request } from 'express';
import { UserAttributes } from "@app/Models/User";
declare global {
  namespace Express {
    interface Request {
      user: Partial<UserAttributes>; // Replace 'User' with your actual user object type
    }
  }
}