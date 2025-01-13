import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import Swal from 'sweetalert2'
  

@Component({
  selector: 'app-loging',
  templateUrl: './loging.component.html',
  styleUrls: ['./loging.component.scss']
})
export class LogingComponent implements OnInit {

  loginFormGroup: FormGroup;

  constructor(private readonly formBuilder: FormBuilder, private readonly authService: AuthService, private readonly router: Router) {
    this.loginFormGroup = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  login() {
    if (this.loginFormGroup.valid) {
      const { email, password } = this.loginFormGroup.value;
      this.authService.loginWithFirebase(email, password)
        .then(() => this.router.navigate(['/']))
        .catch(error => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message
          });
        })
    }
  }
}
