import { RealEstateType } from "../../enums/real-estate-type.enum";

export class RealEstateFilter {
  type?: RealEstateType;
  name?: string;
  address?: string;
  maxArea?: number;
  minArea?: number;
  maxRentValue?: number;
  minRentValue?: number;
}
