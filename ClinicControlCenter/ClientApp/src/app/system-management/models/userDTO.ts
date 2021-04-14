export class UserDTO {
  Password?: string;
  UserName?: string;
  Email: string;
  FullName: string;
  Telephone: string = "";
  CEP: string = "";
  Street: string = "";
  Neighborhood: string = "";
  City: string = "";
  State: string = "";

  constructor(obj?: Partial<UserDTO>) {
    if (obj)
      for (const prop of Object.keys(obj)) {
        this[prop] = obj[prop];
      }
  }
}
