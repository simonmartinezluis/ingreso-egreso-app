import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(private readonly authService: AuthService, private readonly router: Router) {

  }

  logout() {
    Swal.fire({
      title: 'Cerrando Sesión',
      didOpen: () => { Swal.showLoading() }
    });
    this.authService.logout()
      .then(() => {
        Swal.close();
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        Swal.close();
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: error.message
        });
      })
  }
}
