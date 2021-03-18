import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../common/user';
import * as moment from "moment";
import { shareReplay, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService 
{
	private serverURL = "http://localhost:8080";
    private serverAuthURL = "http://localhost:8080/authenticate";
	authRequest: any;
    loginErrorMessage: string;

	constructor(private http: HttpClient) 
    {
        // used to communicate between login-test component and auth component (set by interceptor when token expired)
        this.loginErrorMessage = ""; 
    }

    isLoggedIn(): boolean
    {
        const helper = new JwtHelperService();
        const token = localStorage.getItem("id_token");
        const offset = new Date().getTimezoneOffset();

        if(token == null) // user has logged out (and thus cleared token)
            return false;

        // returns false if jwt token is there in memory but expired (user did not logout but stayed idle for too long)
        return (!helper.isTokenExpired(token, offset * 60));
    }

    register(userName: string, password: string)
    {
        let params = new HttpParams()
            .set('userName', userName)
            .set('password', password);
        
        return this.http.post(`{this.serverURL}/register`, {}, {params, responseType: 'text'});
    }

    setLoginErrorMessage(message: string)
    {
        this.loginErrorMessage = message;
    }

    getLoginErrorMessage(): string
    {
        return this.loginErrorMessage;
    }

	login(userName: string, password: string)
	{
		this.authRequest = {
			"userName": userName,
			"password": password
		};

		return this.http.post<User>(this.serverAuthURL, this.authRequest)
		.pipe(tap(res => this.setSession(res)),
			shareReplay());
	}

    logout()
    {
        if(!this.isLoggedIn())
            return of("No user logged in currently.");

        return this.http.get(this.serverURL + "/logout_handle", {responseType: 'text'})
            .pipe(tap(res => this.resetSession()));
    }

    resetSession()
    {
        localStorage.setItem('id_token', "");
    }

	setSession(jwtToken: any)
	{
        const expiresAt = moment().add(jwtToken.expiresIn,'second');

        localStorage.setItem('id_token', jwtToken.jwt);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    } 

	loginTest()
	{
		return this.http.get(this.serverURL + "/login_test", {responseType: 'text'});
	}
}