import { isNullOrUndefined } from "src/libs/util/utils/src";
import { UserDTO } from "./userDTO";

export class UserDetailModal {
  title: string = "";
  enableEdition: boolean = false;

  modalObj: UserDTO;

  constructor(obj?: Partial<UserDetailModal>) {
    if (obj)
      for (const prop of Object.keys(obj)) {
        this[prop] = obj[prop];
      }

    if (isNullOrUndefined(this.modalObj)) this.modalObj = new UserDTO();
  }
}
