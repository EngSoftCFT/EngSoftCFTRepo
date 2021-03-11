import { OwlDateTimeIntl } from "ng-pick-datetime";
import { Injectable } from "@angular/core";
@Injectable()
export class SetPickerLabels extends OwlDateTimeIntl {
  /** A label for the cancel button */
  public cancelBtnLabel = "Cancelar";
  /** A label for the set button */
  public setBtnLabel = "Definir";
  /** A label for the range 'from' in picker info */
  public rangeFromLabel = "De";
  /** A label for the range 'to' in picker info */
  public rangeToLabel = "Até";
}
