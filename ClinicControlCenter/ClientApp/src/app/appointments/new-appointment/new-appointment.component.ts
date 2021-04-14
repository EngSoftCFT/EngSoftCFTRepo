import {
  IsArrayWithValues,
  isNullOrUndefined,
  isString,
} from "src/libs/util/utils/src";
import { Appointment } from "./../../../libs/domain/models/appointment/Appointment.model";
import { IAutoCompleteDoctorViewModel } from "../../../libs/domain/models/user/AutoCompleteDoctorViewModel.model";
import { merge, Observable, Subject, Subscriber } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { map, startWith } from "rxjs/operators";
import { IAppointmentTimeViewModel } from "src/libs/domain/models/appointment/AppointmentTimes.model";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BaseApiService } from "src/libs/util/base-api/src";
import { UserFilter } from "src/app/system-management/models/UserFilter";
import { USER_ROLES } from "src/libs/util/user-controller/src";
import { IUserViewModel } from "src/app/system-management/models/UserViewModel.model";

// TODO: Remove this mock and add proper api callback
const doctorOptionsMock = [...Array(30).keys()].map((i) => {
  return {
    test: "test",
    Name: `Doctor${i}`,
    Id: `Doctor${i}Id`,
    Specialty: `Doctor${i}Specialty`,
  } as IAutoCompleteDoctorViewModel;
});

function generateAppointmentsTimeMock(
  doctorId: string,
  date: Date
): IAppointmentTimeViewModel[] {
  const dateISOString = date.toISOString();
  const indexOfT = dateISOString.indexOf("T");
  const dateOnlyString = dateISOString.substring(0, indexOfT);

  const mockAppointmentTimes: IAppointmentTimeViewModel[] = [];

  for (let i = 8; i <= 17; i++) {
    const hourString = i.toLocaleString(navigator.language, {
      minimumIntegerDigits: 2,
    });
    mockAppointmentTimes.push({
      DoctorId: doctorId,
      AppointmentTime: `${dateOnlyString}T${hourString}:00:00`,
      IsAvailable: true,
    });
  }

  return mockAppointmentTimes;
}

@Component({
  templateUrl: "./new-appointment.component.html",
  styleUrls: ["./new-appointment.component.scss"],
})
export class NewAppointmentComponent implements OnInit {
  formGroup: FormGroup;
  doctorInputFormControl: FormControl = new FormControl();
  appointmentDateFormControl: FormControl = new FormControl(new Date());
  appointmentTimeFormControl: FormControl = new FormControl();

  baseDoctorOptions: IAutoCompleteDoctorViewModel[] = [];
  doctorOptions: Observable<IAutoCompleteDoctorViewModel[]>;
  appointmentTimeOptions: Observable<IAppointmentTimeViewModel[]>;
  appointmentTimeSubject: Subject<Date>;

  appointmentDto: Appointment;

  constructor(
    formBuilder: FormBuilder,
    private api: BaseApiService,
    private snackBar: MatSnackBar
  ) {
    api.setRequestPath("/api/Appointments");

    this.appointmentDto = new Appointment();

    this.appointmentTimeSubject = new Subject();

    this.formGroup = formBuilder.group({
      doctorInputFormControl: this.doctorInputFormControl,
      appointmentDateFormControl: this.appointmentDateFormControl,
      appointmentTimeFormControl: this.appointmentTimeFormControl,
    });
  }

  async ngOnInit() {
    const doctorData = await this.getDoctorAutoCompleteData();

    this.doctorOptions = this.doctorInputFormControl.valueChanges.pipe(
      startWith(""),
      map((value) => this.doctorAutoCompleteFilter(value, doctorData))
    );

    this.appointmentTimeOptions = merge(
      this.appointmentDateFormControl.valueChanges,
      this.appointmentTimeSubject.asObservable()
    ).pipe(
      startWith(""),
      map((value) => this.appointmentTimesFilter(value))
    );
  }

  async getDoctorAutoCompleteData() {
    if (IsArrayWithValues(this.baseDoctorOptions))
      return this.baseDoctorOptions;

    const showOnlyDoctorFilter = new UserFilter({
      UserTypes: [USER_ROLES.DOCTOR_ROLE],
    });

    let userData: IUserViewModel[] = [];

    try {
      const result = await this.api
        .getPaginated<IUserViewModel>(
          showOnlyDoctorFilter,
          "/api/UserManagement"
        )
        .toPromise();
      userData = result.Items ?? [];
    } catch (error) {
      console.error(error);
    }

    const doctors: IAutoCompleteDoctorViewModel[] = userData
      .filter((x) => x.IsDoctor)
      .map((x) => {
        return {
          Id: x.Id,
          Name: x.FullName ?? x.Email,
          Specialty: x.Doctor?.Specialty,
          CRM: x.Doctor?.CRM,
        };
      });
    this.baseDoctorOptions = doctors;
    return this.baseDoctorOptions;
  }

  doctorAutoCompleteFilter(
    input: string | IAutoCompleteDoctorViewModel,
    doctorsData: IAutoCompleteDoctorViewModel[]
  ): IAutoCompleteDoctorViewModel[] {
    if ((input as IAutoCompleteDoctorViewModel)?.Id)
      return [input as IAutoCompleteDoctorViewModel];

    if (!isString(input)) return [];

    const value = input as string;
    const filterValue = value.toLowerCase();

    return doctorsData.filter((doctor) => {
      const doctorName = doctor.Name?.toLowerCase();
      const doctorSpecialty = doctor.Specialty?.toLowerCase();

      if (doctorName.includes(filterValue)) return true;
      if (doctorSpecialty?.includes(filterValue)) return true;

      return false;
    });
  }

  doctorAutoCompleteDisplay(doctor: IAutoCompleteDoctorViewModel): string {
    return doctor?.Name ? doctor.Name : "";
  }

  appointmentTimesFilter(date: string): IAppointmentTimeViewModel[] {
    const selectedDateTicks = Date.parse(date);
    const doctorId = this.appointmentDto.DoctorId;

    if (isNaN(selectedDateTicks) || isNullOrUndefined(doctorId)) return [];

    const selectedDate = new Date(selectedDateTicks);
    const selectedYear = selectedDate.getFullYear();
    const selectedMonth = selectedDate.getMonth();
    const selectedDay = selectedDate.getDate();

    const availableTimes = generateAppointmentsTimeMock(doctorId, selectedDate);
    console.log(availableTimes);
    return availableTimes;
    // Proper Result;
    // return appointmentTimesMock.filter((availableTimes) => {
    //   if (
    //     availableTimes.DoctorId !== doctorId ||
    //     availableTimes.IsAvailable === false
    //   )
    //     return false;

    //   const availableTimeDate = new Date(availableTimes.AppointmentTime);
    //   const availableTimeYear = availableTimeDate.getFullYear();
    //   const availableTimeMonth = availableTimeDate.getMonth();
    //   const availableTimeDay = availableTimeDate.getDate();

    //   return (
    //     availableTimeYear === selectedYear &&
    //     availableTimeMonth === selectedMonth &&
    //     availableTimeDay === selectedDay
    //   );
    // });
  }

  appointmentTimesDisplay(appointment: IAppointmentTimeViewModel): string {
    const appointmentTime = new Date(appointment.AppointmentTime);
    const display = appointmentTime.toLocaleTimeString();
    return display;
  }

  setDtoDoctorId(doctor: IAutoCompleteDoctorViewModel) {
    this.appointmentDto.DoctorId = doctor.Id;
    this.appointmentTimeSubject.next(new Date());
  }

  setDtoAppointmentTime(option: IAppointmentTimeViewModel) {
    const selectedDate = new Date(this.appointmentDateFormControl.value);
    this.appointmentDto.Date = selectedDate;

    const selectedTime = new Date(option.AppointmentTime);
    const selectedHours = selectedTime.getHours();
    const selectedMinutes = selectedTime.getMinutes();

    this.appointmentDto.Date.setHours(selectedHours);
    this.appointmentDto.Date.setMinutes(selectedMinutes);
  }

  submit() {
    if (
      isNullOrUndefined(this.appointmentDto.Date) ||
      isNullOrUndefined(this.appointmentDto.Name) ||
      isNullOrUndefined(this.appointmentDto.Email) ||
      isNullOrUndefined(this.appointmentDto.DoctorId)
    )
      this.api.post<Appointment>(this.appointmentDto).subscribe((result) => {
        if (result != null)
          this.snackBar.open("Appointment Created", "X", {
            duration: 1000,
            horizontalPosition: "right",
            verticalPosition: "top",
          });
      });
    else {
      this.snackBar.open("Fields Missing", "X", {
        duration: 1000,
        horizontalPosition: "right",
        verticalPosition: "top",
      });
    }
  }
}
