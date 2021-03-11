export function numberToStringRounding(num: number,minDecimalPlaces:number = 0, maxDecimalPlaces: number = 3): string {
  if (num == null) return "";
  return num.toLocaleString("default", {
    minimumFractionDigits: minDecimalPlaces,
    maximumFractionDigits: maxDecimalPlaces,
  });
}

// Limits the maximum number of decimal places without filling then case is not needed
export function rounder(num: number, decimalPlaces: number = 3): number {
  return Math.round(num * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
}
