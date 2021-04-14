import { PaginationFilter } from "src/libs/util/base-api/src/lib/models/PaginationFilter";

export class UserFilter extends PaginationFilter {
  Email: string;
  Name: string;
  Address: string;
  UserTypes: string[];

  constructor(obj?: Partial<UserFilter>) {
    super();

    if (obj)
      for (const prop of Object.keys(obj)) {
        this[prop] = obj[prop];
      }
  }
}
