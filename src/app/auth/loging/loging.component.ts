import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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

  constructor(private readonly formBuilder: FormBuilder, private readonly authService: AuthService, private readonly router: Router, private readonly cdr: ChangeDetectorRef) {
    this.loginFormGroup = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  async login() {
    try {
      if (this.loginFormGroup.valid) {
        Swal.fire({ title: 'Espere por favor', didOpen: () => { Swal.showLoading() } });
        const { email, password } = this.loginFormGroup.value;
        await this.authService.loginFirebase(email, password);
        Swal.close();
        this.router.navigate(['/']);
      }
    } catch (error: any) {
      Swal.close();
      Swal.fire({ title: 'Error', icon: 'error', text: error.message });
    }
  }
}

