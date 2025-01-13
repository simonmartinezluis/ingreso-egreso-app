import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerFormGroup: FormGroup;

  constructor(private readonly formBuilder: FormBuilder, private readonly authService: AuthService, private readonly router: Router) {
    this.registerFormGroup = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.registerFormGroup = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  createUser() {
    if (this.registerFormGroup.invalid) { return; }
    const { nombre, correo, password } = this.registerFormGroup.value;
    this.authService.createUserInFirebase(nombre, correo, password)
      .then(response => { this.router.navigate(['/']) })
      .catch(error => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message
        });
      });
  }
}
