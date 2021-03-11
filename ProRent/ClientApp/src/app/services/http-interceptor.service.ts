import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpEvent,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";

import { environment } from "./../../environments/environment";

import { Observable, of, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";

import { ToastService } from "src/app/services/toast.service";

@Injectable({
  providedIn: "root",
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(protected toast: ToastService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let urlCodeChanger: string;
    if (req.url !== "") {
      urlCodeChanger = req.url[0];
    }

    if (urlCodeChanger === "@") {
      return next.handle(req.clone({ url: req.url.substr(1) }));
    }

    if (urlCodeChanger === "#" || urlCodeChanger !== "/") {
      const noChangeReq = req.clone({ url: req.url.substr(1) });
      return next.handle(noChangeReq).pipe(
        tap((evt) => {
          if (evt instanceof HttpResponse) {
            // if (evt.body && evt.body.success) this.toast.toastrSuccess("Sucesso");
          }
        }),
        catchError((err: any) => {
          if (err instanceof HttpErrorResponse) {
            try {
              this.toast.toastrError(err.error, "X");
            } catch (e) {
              this.toast.toastrError({ code: "An error occurred" });
            }
          }
          return of(err);
        })
      );
    }
    const baseUrl =
      environment.apiEndpoint.slice(-1) === "/"
        ? environment.apiEndpoint.slice(0, -1)
        : environment.apiEndpoint;

    const apiReq = req.clone({ url: `${baseUrl}${req.url}` });

    return next.handle(apiReq).pipe(
      tap((evt) => {
        if (evt instanceof HttpResponse) {
          // if (evt.body && evt.body.success) this.toast.toastrSuccess("Sucesso");
        }
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          try {
            const errorMsg = err.error ?? err.message;
            this.toast.toastrError(errorMsg, "X");
          } catch (e) {
            this.toast.toastrError({ code: "An error occurred" });
          }
        }
        return throwError(err);
      })
    );
  }
}
