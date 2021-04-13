import { isNullOrUndefined } from "src/libs/util/utils/src";
import { UserRoleDTO } from "./UserRoleDTO";

export class UserModal {
  title: string = "";
  enableEdition: boolean = false;

  modalObj: UserRoleDTO;
  userId: string;

  showRoleSelect: boolean = false;
  showPatientSwitch: boolean = false;

  constructor(obj?: Partial<UserModal>) {
    if (obj)
      for (const prop of Object.keys(obj)) {
        this[prop] = obj[prop];
      }

    if (isNullOrUndefined(this.modalObj)) this.modalObj = new UserRoleDTO();

    if (!isNullOrUndefined(this.userId)) this.modalObj.Id = this.userId;
  }
}
