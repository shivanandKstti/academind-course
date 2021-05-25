import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordChecker } from './custom-validator/password-checker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  registerForm: FormGroup;
  submited = false;

  constructor(private formBuilder: FormBuilder){}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      acceptTandC: [false, Validators.requiredTrue]
    }, {
        Validators: PasswordChecker("password", "confirmPassword"),
    });
  }

  get h(){
    return this.registerForm.controls;
  }
  onSubmit(){
    this.submited = true;
    if (this.registerForm.invalid){
      return;
    }

    console.table(this.registerForm.value);
    console.log(this.registerForm);
    alert(`success sign up \n ${JSON.stringify(this.registerForm.value)}`)
  }

  onReset(){
    this.submited = false;
    this.registerForm.reset();
  }
}
  