export interface IUserViewModel {
  Id: string;
  UserName: string;
  Email: string;
  FullName?: string;
  Telephone?: string;
  CEP?: string;
  Street?: string;
  Neighborhood?: string;
  City?: string;
  State?: string;

  IsManager: boolean;
  IsDoctor: boolean;
  IsEmployee: boolean;
  IsPatient: boolean;

  Patient?: IPatientViewModel;
  Employee?: IEmployeeViewModel;
  Doctor?: IDoctorViewModel;
}

export interface IPatientViewModel {
  Id?: string;
  Weight?: number;
  Height?: number;
  BloodType?: string;
}

export interface IEmployeeViewModel {
  Id?: string;
  ContractDate?: string;
  Salary?: number;
}

export interface IDoctorViewModel {
  Id?: string;
  Specialty?: string;
  CRM?: string;
}
