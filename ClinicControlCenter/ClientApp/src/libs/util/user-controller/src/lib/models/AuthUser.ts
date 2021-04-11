import { IUser } from "src/api-authorization/authorize.service";

export interface IAuthUser extends IUser {
  role?: string | string[];
  rolePermLevel?: string;
}
