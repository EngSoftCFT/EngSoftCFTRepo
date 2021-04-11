import { IDoctorViewModel } from "./../../../libs/domain/models/user/IDoctorViewModel.model";
import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { map, startWith } from "rxjs/operators";

@Component({
  templateUrl: "./new-appointment.component.html",
  styleUrls: ["./new-appointment.component.scss"],
})
export class NewAppointmentComponent implements OnInit {
  formGroup: FormGroup;
  doctorInputFormControl: FormControl = new FormControl();
  appointmentDateFormControl: FormControl = new FormControl();

  // TODO: Remove this mock and add proper api callback
  doctorOptionsMock = [...Array(30).keys()].map((i) => {
    return {
      test: "test",
      Name: `Doctor${i}`,
      Id: `Doctor${i}Id`,
      Specialty: `Doctor${i}Specialty`,
    } as IDoctorViewModel;
  });

  doctorOptions: Observable<IDoctorViewModel[]>;

  constructor(formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({
      doctorInputFormControl: this.doctorInputFormControl,
    });

    this.doctorOptions = this.doctorInputFormControl.valueChanges.pipe(
      startWith(""),
      map((value) => this.doctorAutoCompleteFilter(value))
    );
  }

  ngOnInit(): void {}

  doctorAutoCompleteFilter(value: string): IDoctorViewModel[] {
    const filterValue = value.toLowerCase();

    return this.doctorOptionsMock.filter((doctor) => {
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
}
