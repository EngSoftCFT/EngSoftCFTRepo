export class Appointment {
  Date: Date;
  Name: string;
  Email: string;
  Telephone: string;
  DoctorId: string;

  constructor(obj?: Partial<Appointment>) {
    if (obj)
      for (const prop of Object.keys(obj)) {
        this[prop] = obj[prop];
      }
  }
}
