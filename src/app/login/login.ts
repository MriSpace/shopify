import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { nospaceValidator } from '../validators/nospace.validator';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true
})
export class Login {

  myForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(8), nospaceValidator, Validators.pattern(/^(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/)]),
    password: new FormControl('', Validators.required)

  });

  constructor(private router: Router) { }


  submitForm() {
    if (this.myForm.invalid) return;
    this.router.navigate(['/home']);
  }
}
  


