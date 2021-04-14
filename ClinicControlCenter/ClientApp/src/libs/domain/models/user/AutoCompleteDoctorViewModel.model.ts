import { IDoctorViewModel } from "src/app/system-management/models/UserViewModel.model";

export interface IAutoCompleteDoctorViewModel extends IDoctorViewModel {
  Id: string;
  Specialty: string;
  CRM?: string;
  Name: string;
}
