import { HttpParams } from "@angular/common/http";

export function FilterToParams(filter: object) : HttpParams {
  let searchParams = new HttpParams();
  for (const key of Object.keys(filter)) {
    let currentValue = filter[key];

    if (currentValue == null) continue;

    if (currentValue instanceof Date) currentValue = currentValue.toISOString();

    searchParams = searchParams.append(key, filter[key].toString());
  }

  return searchParams;
}
