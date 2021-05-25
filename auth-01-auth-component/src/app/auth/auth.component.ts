import { AuthService, AuthResponseData } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {

  isLoginMode = true;
  isLoading = false;
  error = null;

  constructor(private authService: AuthService){}

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
    // console.log(form.value);
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    let authObsers: Observable<AuthResponseData>;

    if(this.isLoginMode){
      authObsers = this.authService.login(email, password);
    } else {
      authObsers =  this.authService.signUp(email, password)
    }
    authObsers.subscribe(resData =>{
      console.log(resData);
      this.isLoading = false;
    }, errorMessage => {
      console.log(errorMessage);
      this.error = errorMessage;
      this.isLoading = false;
    });

    form.reset();
  }
}
