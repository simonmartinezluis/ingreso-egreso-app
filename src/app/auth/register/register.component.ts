import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
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
  errorMessage!: string;

  constructor(private readonly formBuilder: FormBuilder, private readonly authService: AuthService, private readonly router: Router, private readonly cdr: ChangeDetectorRef) {
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
    if (this.registerFormGroup.valid) {
      const { nombre, correo, password } = this.registerFormGroup.value;
      Swal.fire({
        title: 'Espere por favor',
        didOpen: () => { Swal.showLoading() }
      });
      this.authService.createUserInFirebase(nombre, correo, password)
        .then(() => {
          Swal.close();
          this.router.navigate(['/']);
        })
        .catch(error => {
          Swal.close();
          Swal.fire({
            title: 'Error',
            icon: 'error',
            text: error.message
          });
        });
    }
  }
}
