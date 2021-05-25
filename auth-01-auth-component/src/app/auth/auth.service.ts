import { User } from './user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';


export interface AuthResponseData {
    kind?: string;
    idToken:string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}
@Injectable({
    providedIn:'root'
})
export class AuthService {

    user = new Subject<User>();

    constructor(private http: HttpClient){}

    signUp(email:string, password: string){

        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyClfuPyew633-TaKb3gxSTkHiezxYo_0r0', {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError));
    }

    login(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyClfuPyew633-TaKb3gxSTkHiezxYo_0r0',{
            email: email,
            password: password,
            returnSecureToken: true,
        }).pipe(catchError(this.handleError), tap(resData => {
            const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
            const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);
            this.user.next(user);
        }));
    }

    private handleError(errorRes: HttpErrorResponse){
        let errorMessage = 'An unknow error occurred';
        if(!errorRes.error || !errorRes.error.error){
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'Incorrect password';
                break;
            
        }
        return throwError(errorMessage);
    }
}