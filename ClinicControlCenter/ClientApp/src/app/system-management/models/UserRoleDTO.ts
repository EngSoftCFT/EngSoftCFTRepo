import { USER_ROLES } from "src/libs/util/user-controller/src";
import { isNullOrUndefined } from "src/libs/util/utils/src";
import { IUserViewModel } from "./UserViewModel.model";

export class UserRoleDTO {
  Id: string;

  // Employee ->
  ContractDate?: Date;
  Salary?: number;
  // <- Employee

  // Doctor ->
  Specialty?: string;
  CRM?: string;
  // <- Doctor

  // Patient ->
  Weight?: number;
  Height?: number;
  BloodType?: string;
  // <- Patient

  userRole: USER_ROLES = USER_ROLES.USER_ROLE;
  isPatient: boolean = false;

  constructor(obj?: Partial<UserRoleDTO>) {
    if (obj)
      for (const prop of Object.keys(obj)) {
        this[prop] = obj[prop];
      }
  }

  public static FromViewModel(viewModel: IUserViewModel) {
    if (isNullOrUndefined(viewModel)) return new UserRoleDTO();

    const planifiedObject = Object.assign({}, viewModel);

    if (viewModel.Patient) Object.assign(planifiedObject, viewModel.Patient);
    if (viewModel.Employee) Object.assign(planifiedObject, viewModel.Employee);
    if (viewModel.Doctor) Object.assign(planifiedObject, viewModel.Doctor);

    const resultDTO = new UserRoleDTO(planifiedObject);

    if (!isNullOrUndefined(viewModel?.Employee?.ContractDate)) {
      resultDTO.ContractDate = new Date(viewModel?.Employee?.ContractDate);
    }

    if (viewModel.IsPatient) resultDTO.isPatient = true;
    if (viewModel.IsEmployee) resultDTO.userRole = USER_ROLES.EMPLOYEE_ROLE;
    if (viewModel.IsDoctor) resultDTO.userRole = USER_ROLES.DOCTOR_ROLE;
    if (viewModel.IsManager) resultDTO.userRole = USER_ROLES.MANAGER_ROLE;

    return resultDTO;
  }
}
