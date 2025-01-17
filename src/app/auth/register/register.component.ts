import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { endLoading, startLoading } from 'src/app/shared/ui.actions';
import { AuthService } from 'src/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerFormGroup: FormGroup;
  globalStateLoading: Subscription;
  loading: boolean = false;


  constructor(private readonly formBuilder: FormBuilder, private readonly authService: AuthService, private readonly router: Router,
    private readonly cdr: ChangeDetectorRef, private readonly store: Store<AppState>) {
    this.registerFormGroup = this.formBuilder.group({});
    this.globalStateLoading = new Subscription();
  }

  ngOnInit(): void {
    this.registerFormGroup = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.globalStateLoading = this.store.select('ui').subscribe(ui => { this.loading = ui.isLoading })
  }

  ngOnDestroy(): void {
    this.globalStateLoading.unsubscribe();
  }

  async createUser() {
    try {
      if (this.registerFormGroup.valid) {
        this.store.dispatch(startLoading());
        // Swal.fire({ title: 'Espere por favor', didOpen: () => { Swal.showLoading() } });
        const { nombre, correo, password } = this.registerFormGroup.value;
        await this.authService.createUserInFirebase(nombre, correo, password);
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
