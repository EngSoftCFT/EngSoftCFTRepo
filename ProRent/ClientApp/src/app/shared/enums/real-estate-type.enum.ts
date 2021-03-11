export enum RealEstateType {
  HOUSE = 0,
  APARTMENT,
}

export function RealEstateTypeToString(type: RealEstateType) {
  switch (type) {
    case RealEstateType.HOUSE:
      return "Casa";
    case RealEstateType.APARTMENT:
      return "Apartamento";
    default:
      return "";
      break;
  }
}
