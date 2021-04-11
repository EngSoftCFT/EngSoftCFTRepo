import { IUser } from "./../../../../../../api-authorization/authorize.service";
export interface IAuthUser extends IUser {
  role?: string | string[];
}
