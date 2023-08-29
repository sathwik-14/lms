import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { TUI_ARROW } from '@taiga-ui/kit';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'LMS';
  isAuthenticated$: any;
  open = false;
  links = [
    { name: 'Employees', href: '/admin' },
    { name: 'Holidays', href: '/holidays' },
    { name: 'Leaves', href: '/leaves' },
  ];
  elem: any;
  constructor(private auth: AuthService, private router: Router) {
    if (this.auth.isAuthentiated()) this.isLoggedIn = true;
    this.isAuthenticated$ = this.auth.getAuthEmitter();
  }
  isLoggedIn = false;

  redirect(link: string) {
    this.toggle(false);
    this.router.navigate([`/${link}`]);
  }

  toggle(open: any): void {
    this.open = open;
  }

  logout() {
    localStorage.removeItem('token');
    this.auth.isAuthentiated();
    this.router.navigate(['/login']);
  }
}
