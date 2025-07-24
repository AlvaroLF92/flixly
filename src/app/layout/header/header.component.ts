import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PrivateMenuComponent } from '../private-menu/private-menu.component';
import { PublicMenuComponent } from '../public-menu/public-menu.component';
import { SharedModule } from '../../core/shared/shared.module';
@Component({
  selector: 'app-header',
  imports: [
    SharedModule,
    RouterModule,
    CommonModule,
    PrivateMenuComponent,
    PublicMenuComponent,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isAuthenticated$: Observable<boolean>;
  userName$: Observable<string>;

  constructor(private authService: AuthService) {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    this.userName$ = this.authService.userName$;
  }

  logout() {
    this.authService.logOut();
  }
}
