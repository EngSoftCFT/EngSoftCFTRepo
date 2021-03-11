import { isNullOrUndefined } from "src/app/shared/Functions/value-checks";
import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class ToastService {
  constructor(private _snackBar: MatSnackBar) {}

  toastrError(error, action: string = "X", variableName: string = "") {
    const config = new MatSnackBarConfig();
    config.verticalPosition = "top";
    config.horizontalPosition = "right";
    config.duration = 0;
    config.panelClass = ["toast-error"];

    let message = "Erro desconhecido";
    if (typeof error === "string") message = error;
    if (!isNullOrUndefined(error.message)) message = error.message;

    this._snackBar.open(message, action, config);
  }
  toastrSuccess(message, action: string = "") {
    const config = new MatSnackBarConfig();
    config.verticalPosition = "top";
    config.horizontalPosition = "right";
    config.duration = 5000;
    config.panelClass = ["toast-success"];
    this._snackBar.open(message, action, config);
  }

  toastrWarning(error, action: string = "", variableName: string = "") {
    const config = new MatSnackBarConfig();
    config.verticalPosition = "top";
    config.horizontalPosition = "right";
    config.duration = 3000;
    config.panelClass = ["toast-warning"];

    let message = "Erro desconhecido";
    if (typeof error === "string") message = error;
    if (!isNullOrUndefined(error.message)) message = error.message;

    this._snackBar.open(message, action, config);
  }
}
