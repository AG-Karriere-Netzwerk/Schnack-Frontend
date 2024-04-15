import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from "@angular/common/http";

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const jwt = localStorage.getItem("schnack-jwt");

  if (jwt) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwt}`
      }
    });
  }

  return next(req);
};
