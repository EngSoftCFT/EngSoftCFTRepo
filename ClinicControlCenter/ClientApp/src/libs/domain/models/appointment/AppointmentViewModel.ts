import { IDoctorViewModel, IUserViewModel } from "src/app/system-management/models/UserViewModel.model";

export interface IAppointmentViewModel {
  Date: string;
  Name: string;
  Email: string;
  Telephone: string;
  DoctorId: string;
  User?: IUserViewModel;
  Doctor?: IDoctorViewModel;
}
