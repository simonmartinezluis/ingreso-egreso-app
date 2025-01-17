import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { endLoading, startLoading } from 'src/app/shared/ui.actions';
import { AuthService } from 'src/services/auth.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-loging',
  templateUrl: './loging.component.html',
  styleUrls: ['./loging.component.scss']
})
export class LogingComponent implements OnInit, OnDestroy {

  loginFormGroup: FormGroup;
  loading: boolean = false;
  globalStateLoading: Subscription;

  constructor(private readonly formBuilder: FormBuilder, private readonly authService: AuthService,
    private readonly router: Router, private readonly store: Store<AppState>) {
    this.loginFormGroup = this.formBuilder.group({});
    this.globalStateLoading = new Subscription();
  }

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.globalStateLoading = this.store.select('ui').subscribe(ui => { this.loading = ui.isLoading })
  }

  ngOnDestroy(): void {
    this.globalStateLoading.unsubscribe();
  }

  async login() {
    try {
      if (this.loginFormGroup.valid) {
        this.store.dispatch(startLoading());
        // Swal.fire({ title: 'Espere por favor', didOpen: () => { Swal.showLoading() } });
        const { email, password } = this.loginFormGroup.value;
        await this.authService.loginFirebase(email, password);
        // Swal.close();
        this.store.dispatch(endLoading());
        this.router.navigate(['/']);
      }
    } catch (error: any) {
      // Swal.close();
      Swal.fire({ title: 'Error', icon: 'error', text: error.message });
    }
  }
}

