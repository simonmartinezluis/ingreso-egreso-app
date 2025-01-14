import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ingreso-egreso-app';

  constructor(private readonly authService: AuthService) {
    this.authService.initAuthListener();
  }
}
