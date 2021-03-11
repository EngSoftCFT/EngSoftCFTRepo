import { RealEstateTypeToString } from "src/app/shared/enums/real-estate-type.enum";
import { RealEstateType } from "src/app/shared/enums/real-estate-type.enum";
export class RealEstateDTO {
  type: string = RealEstateTypeToString(RealEstateType.HOUSE);
  name: string;
  number: number;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  bedRoomQt: number;
  suiteQt: number;
  livingRoomQt: number;
  garageParkingSpace: number;
  area: number;
  closet: boolean = false;
  description?: string;
  floor?: number;
  condominiumFee?: number;
  rentValue: number;
  doorman?: boolean;

  constructor(obj: Partial<RealEstateDTO> = {}) {
    for (const prop of Object.keys(obj)) {
      this[prop] = obj[prop];
    }
  }
}
