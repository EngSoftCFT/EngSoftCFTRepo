import { isNullOrUndefined } from "src/app/shared/Functions/value-checks";
import { IRealEstateViewModel } from "./../RealEstate/real-estate-viewmodel.model";
export class RealEstateVisistDTO {
  id: number;
  realEstate?: IRealEstateViewModel;
  realEstateId: number;
  visitTime: string;

  public get visitTimeDate() {
    return isNullOrUndefined(this.visitTime) ? null : new Date(this.visitTime);
  }

  public set visitTimeDate(date: Date) {
    this.visitTime = date.toISOString();
  }

  constructor(obj: Partial<RealEstateVisistDTO> = {}) {
    for (const prop of Object.keys(obj)) {
      this[prop] = obj[prop];
    }
  }
}
