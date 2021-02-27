import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {AuthService} from './services/auth.service';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  // title = 'CoreUI 2 for Angular 8';
  constructor(private router: Router, private authService: AuthService) {
    this.authService.loadSession().then( () => {
      if ( this.authService.token && this.authService.token !== '' ) {
        this.authService.logged = true;
        this.authService.getAccess().then( () => {
          router.navigate(['/dashboard']);
        }).catch( () => {
          this.authService.logged = false;
          router.navigate(['/login']);
        });

      } else {
        this.authService.logged = false;
        router.navigate(['/login']);
      }
    }).catch( () => {
      this.authService.logout();
      router.navigate(['/login']);
    });
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
