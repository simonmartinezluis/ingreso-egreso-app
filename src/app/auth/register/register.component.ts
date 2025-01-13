import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerFormGroup: FormGroup;
  @ViewChild('modalErrorSwal') public readonly modalErrorSwal!: SwalComponent;
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
    if (this.registerFormGroup.invalid) { return; }
    const { nombre, correo, password } = this.registerFormGroup.value;
    this.authService.createUserInFirebase(nombre, correo, password)
      .then(response => { this.router.navigate(['/']) })
      .catch(error => {
        this.errorMessage = error.message;
        this.cdr.detectChanges();
        this.modalErrorSwal.fire();
      });
  }
}
