import { isNullOrUndefined, isString } from "src/libs/util/utils/src";
import { Appointment } from "./../../../libs/domain/models/appointment/Appointment.model";
import { IDoctorViewModel } from "../../../libs/domain/models/user/DoctorViewModel.model";
import { merge, Observable, Subject, Subscriber } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { map, startWith } from "rxjs/operators";
import { IAppointmentTimeViewModel } from "src/libs/domain/models/appointment/AppointmentTimes.model";

// TODO: Remove this mock and add proper api callback
const doctorOptionsMock = [...Array(30).keys()].map((i) => {
  return {
    test: "test",
    Name: `Doctor${i}`,
    Id: `Doctor${i}Id`,
    Specialty: `Doctor${i}Specialty`,
  } as IDoctorViewModel;
});

const appointmentTimesMock: IAppointmentTimeViewModel[] = [
  {
    DoctorId: "Doctor1Id",
    AppointmentTime: "2021-04-11T13:00:00Z",
    IsAvailable: true,
  },
  {
    DoctorId: "Doctor1Id",
    AppointmentTime: "2021-04-11T14:00:00Z",
    IsAvailable: true,
  },
  {
    DoctorId: "Doctor1Id",
    AppointmentTime: "2020-01-01T15:00:00Z",
    IsAvailable: true,
  },
  {
    DoctorId: "Doctor1Id",
    AppointmentTime: "2020-01-01T16:00:00Z",
    IsAvailable: true,
  },
];

@Component({
  templateUrl: "./new-appointment.component.html",
  styleUrls: ["./new-appointment.component.scss"],
})
export class NewAppointmentComponent implements OnInit {
  formGroup: FormGroup;
  doctorInputFormControl: FormControl = new FormControl();
  appointmentDateFormControl: FormControl = new FormControl(new Date());
  appointmentTimeFormControl: FormControl = new FormControl();

  doctorOptions: Observable<IDoctorViewModel[]>;
  appointmentTimeOptions: Observable<IAppointmentTimeViewModel[]>;
  appointmentTimeSubject: Subject<Date>;

  appointmentDto: Appointment;

  constructor(formBuilder: FormBuilder) {
    this.appointmentDto = new Appointment();

    this.appointmentTimeSubject = new Subject();

    this.formGroup = formBuilder.group({
      doctorInputFormControl: this.doctorInputFormControl,
      appointmentDateFormControl: this.appointmentDateFormControl,
      appointmentTimeFormControl: this.appointmentTimeFormControl,
    });

    this.doctorOptions = this.doctorInputFormControl.valueChanges.pipe(
      startWith(""),
      map((value) => this.doctorAutoCompleteFilter(value))
    );

    this.appointmentTimeOptions = merge(
      this.appointmentDateFormControl.valueChanges,
      this.appointmentTimeSubject.asObservable()
    ).pipe(
      startWith(""),
      map((value) => this.appointmentTimesFilter(value))
    );
  }

  ngOnInit(): void {}

  doctorAutoCompleteFilter(
    input: string | IDoctorViewModel
  ): IDoctorViewModel[] {
    if ((input as IDoctorViewModel)?.Id) return [input as IDoctorViewModel];

    if (!isString(input)) return [];

    const value = input as string;
    const filterValue = value.toLowerCase();

    return doctorOptionsMock.filter((doctor) => {
      const doctorName = doctor.Name.toLowerCase();
      const doctorSpecialty = doctor.Specialty.toLowerCase();

      if (doctorName.includes(filterValue)) return true;
      if (doctorSpecialty.includes(filterValue)) return true;

      return false;
    });
  }

  doctorAutoCompleteDisplay(doctor: IDoctorViewModel): string {
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

    return appointmentTimesMock.filter((availableTimes) => {
      if (
        availableTimes.DoctorId !== doctorId ||
        availableTimes.IsAvailable === false
      )
        return false;

      const availableTimeDate = new Date(availableTimes.AppointmentTime);
      const availableTimeYear = availableTimeDate.getFullYear();
      const availableTimeMonth = availableTimeDate.getMonth();
      const availableTimeDay = availableTimeDate.getDate();

      return (
        availableTimeYear === selectedYear &&
        availableTimeMonth === selectedMonth &&
        availableTimeDay === selectedDay
      );
    });
  }

  appointmentTimesDisplay(appointment: IAppointmentTimeViewModel): string {
    const appointmentTime = new Date(appointment.AppointmentTime);
    const display = appointmentTime.toLocaleTimeString();
    return display;
  }

  setDtoDoctorId(doctor: IDoctorViewModel) {
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
}
