import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthServiceService } from './auth-service.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor 
{
  constructor(private router: Router, private authService: AuthServiceService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
  {
    const helper = new JwtHelperService();
    const token = localStorage.getItem("id_token");
    const offset = new Date().getTimezoneOffset();
    console.log(offset);

    if(token) 
    {
        if(helper.isTokenExpired(token, offset * 60)) // jwt token is there in memory but expired (user did not logout but stayed idle for too long)
            return next.handle(req).pipe(tap((event: HttpEvent<any>) => 
                {
                   console.log("success");
                },
                (err: any) =>
                {
                    if (err instanceof HttpErrorResponse) 
                    {
                        if(err.message.startsWith("JWT expired") || err.status == 401) 
                        {
                            this.authService.setLoginErrorMessage("Login expired. Please login again");
                            this.router.navigateByUrl("login");
                            console.log("Login expired.")
                        }
                    }
                }));

        const cloned = req.clone({
            headers: req.headers.set("Authorization",
                "Bearer " + token)
        });

        return next.handle(cloned);
    }
    else // fresh login request (after user has logged out and thus cleared the previously stored token) / registration request
    {
        return next.handle(req);
    }
  }
}