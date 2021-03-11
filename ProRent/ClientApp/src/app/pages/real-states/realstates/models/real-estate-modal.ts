import { isNullOrUndefined } from "src/app/shared/Functions/value-checks";
import { RealEstateDTO } from "src/app/shared/models/RealEstate/real-estate-dto.model";
import { RealEstateFilter } from "./../../../../shared/models/RealEstate/real-estate-filter";
export class RealEstateModal {
  title: string = "";
  disableEdition: boolean = false;
  filter?: RealEstateFilter;
  realEstate: RealEstateDTO;

  constructor(obj: Partial<RealEstateModal> = {}) {
    for (const prop of Object.keys(obj)) {
      this[prop] = obj[prop];
    }

    if (isNullOrUndefined(this.realEstate))
      this.realEstate = new RealEstateDTO();
  }
}
