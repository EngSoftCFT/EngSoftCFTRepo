export class RealEstateVisitsFilter {
  maxDate?: Date;
  minDate?: Date;

  public set dateRange(range: Date[]) {
    this.minDate = range[0];
    this.maxDate = range[1];
  }

  public get dateRange(): Date[] {
    return [this.minDate, this.maxDate];
  }

  constructor(obj: Partial<RealEstateVisitsFilter> = {}) {
    for (const prop of Object.keys(obj)) {
      this[prop] = obj[prop];
    }
  }
}
