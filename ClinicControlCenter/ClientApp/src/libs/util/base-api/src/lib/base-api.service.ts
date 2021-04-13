import { IPaginationFilter } from "./models/PaginationFilter";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IPaginationResult } from "./models/PaginationResult";
import { FilterToParams } from "./utils/filter-functions";
import { environment } from "src/environments/environment";
import { IsArrayWithValues, isNullOrUndefined } from "src/libs/util/utils/src";

@Injectable({
  providedIn: "root",
})
export class BaseApiService {
  constructor(private api: HttpClient) {
    this.setApiBase(environment.BASE_API_URL);
  }

  private apiPath: string = null;
  private apiBaseUrl: string;

  setApiBase(url: string) {
    this.apiBaseUrl = url;
    if (IsArrayWithValues(this.apiBaseUrl) && this.apiBaseUrl.slice(-1) === "/")
      this.apiBaseUrl = this.apiBaseUrl.substr(0, this.apiBaseUrl.length - 1);
  }

  setRequestPath(path: string) {
    if (IsArrayWithValues(path) && path[0] !== "/") this.apiBaseUrl = "";

    this.apiPath = path;
  }

  getRequestUrl(
    apiPath: string = this.apiPath,
    apiBase: string = this.apiBaseUrl
  ) {
    if (!apiPath) return null;

    return `${apiBase}${apiPath}`;
  }

  getFiltered<TResult>(
    filter: object,
    urlPath: string = this.apiPath
  ): Observable<TResult[]> {
    const requestUrl = this.getRequestUrl(urlPath);
    if (isNullOrUndefined(requestUrl)) return null;

    return this.api.get<TResult[]>(requestUrl, {
      params: FilterToParams(filter),
    });
  }

  getPaginated<TResult>(
    filter: IPaginationFilter,
    urlPath: string = this.apiPath
  ): Observable<IPaginationResult<TResult>> {
    const requestUrl = this.getRequestUrl(urlPath);
    if (isNullOrUndefined(requestUrl)) return null;

    return this.api.get<IPaginationResult<TResult>>(requestUrl, {
      params: FilterToParams(filter),
    });
  }

  get<TResult>(
    id: number,
    urlPath: string = this.apiPath
  ): Observable<TResult> {
    const requestUrl = this.getRequestUrl(urlPath);
    if (isNullOrUndefined(requestUrl)) return null;

    return this.api.get<TResult>(requestUrl + `/${id}`);
  }

  post<TResult>(
    body: TResult,
    urlPath: string = this.apiPath
  ): Observable<TResult> {
    const requestUrl = this.getRequestUrl(urlPath);
    if (isNullOrUndefined(requestUrl)) return null;

    return this.api.post<TResult>(requestUrl, body);
  }

  put<TResult>(
    id: number | string,
    body: TResult,
    urlPath: string = this.apiPath
  ): Observable<TResult> {
    const requestUrl = this.getRequestUrl(urlPath);
    if (isNullOrUndefined(requestUrl)) return null;

    return this.api.put<TResult>(requestUrl + `/${id}`, body);
  }

  delete<TResult>(
    id: number | string,
    urlPath: string = this.apiPath
  ): Observable<TResult> {
    const requestUrl = this.getRequestUrl(urlPath);
    if (isNullOrUndefined(requestUrl)) return null;

    return this.api.delete<TResult>(requestUrl + `/${id}`);
  }
}
