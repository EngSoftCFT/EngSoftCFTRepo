import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FilterToParams } from "src/app/shared/Functions/filter-functions";

@Injectable({
  providedIn: "root",
})
export class BaseApiService {
  constructor(private api: HttpClient) {}

  urlPath: string = null;

  getFiltered<TResult>(filter: object, urlPath: string = this.urlPath): Observable<TResult[]> {
    if (!this.urlPath) return null;
    return this.api.get<TResult[]>(this.urlPath, { params: FilterToParams(filter) });
  }

  get<TResult>(id: number, urlPath: string = this.urlPath): Observable<TResult> {
    if (!this.urlPath) return null;
    return this.api.get<TResult>(this.urlPath + `/${id}`);
  }

  post<TResult>(body: TResult, urlPath: string = this.urlPath): Observable<TResult> {
    if (!urlPath) return null;
    return this.api.post<TResult>(urlPath, body);
  }

  put<TResult>(id: number, body: TResult, urlPath: string = this.urlPath): Observable<TResult> {
    if (!this.urlPath) return null;
    return this.api.put<TResult>(this.urlPath + `/${id}`, body);
  }

  delete<TResult>(id: number, urlPath: string = this.urlPath): Observable<TResult> {
    if (!this.urlPath) return null;
    return this.api.delete<TResult>(this.urlPath + `/${id}`);
  }
}
