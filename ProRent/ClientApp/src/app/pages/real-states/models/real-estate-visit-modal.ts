import { RealEstateVisistDTO } from "./../../../shared/models/RealEstateVisits/real-estate-visist-dto.model";
import { isNullOrUndefined } from "src/app/shared/Functions/value-checks";

export class RealEstateVisitModal {
  title: string = "";
  disableEdition: boolean = false;
  filter?: RealEstateVisitModal;
  realEstateVisit: RealEstateVisistDTO;
  realEstateId: number = 0;

  constructor(obj: Partial<RealEstateVisitModal> = {}) {
    for (const prop of Object.keys(obj)) {
      this[prop] = obj[prop];
    }

    if (isNullOrUndefined(this.realEstateVisit)) this.realEstateVisit = new RealEstateVisistDTO();
  }
}
