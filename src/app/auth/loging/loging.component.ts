import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { AuthService } from 'src/services/auth.service';


@Component({
  selector: 'app-loging',
  templateUrl: './loging.component.html',
  styleUrls: ['./loging.component.scss']
})
export class LogingComponent implements OnInit {

  loginFormGroup: FormGroup;
  @ViewChild('modalErrorSwal') public readonly modalErrorSwal!: SwalComponent;
  errorMessage!: string;

  constructor(private readonly formBuilder: FormBuilder, private readonly authService: AuthService, private readonly router: Router, private readonly cdr: ChangeDetectorRef) {
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
          this.errorMessage = error.message;
          this.cdr.detectChanges();
          this.modalErrorSwal.fire();
        })
    }
  }
}
