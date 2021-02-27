import {Component, OnInit, ViewChild} from '@angular/core';

import { navItems } from '../../_nav';
import {AuthService} from '../../services/auth.service';
import {Router, RouterOutlet, ActivationStart} from '@angular/router';
import {INavData} from '@coreui/angular';
import {Acceso} from '../../interface/bo/Acceso';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent  implements OnInit{
  minimized = false;
  public navItems: INavData[] = [];
  private items = [...navItems];
  private accesos: Acceso[];

  @ViewChild(RouterOutlet) outlet: RouterOutlet;

  constructor( private authService: AuthService,
               private router: Router ) {

  }

  async ngOnInit() {
    this.router.events.subscribe(e => {
      if (e instanceof ActivationStart && e.snapshot.outlet === 'administration') {
        this.outlet.deactivate();
      }
    });

    await this.authService.getAccess().then( ( access) => {
      this.accesos = access;
      this.loadMenu();
    }).catch( ( error ) => {
      console.error( 'Error getting access.', error );
    });
  }


  loadMenu( ) {
    this.navItems = this.items.filter( m => {
      if ( m.children ) {
        m.children = m.children.filter(( c => this.accesos.find( a => c.name === a.opcion) ) );
        return m.children.length > 0;
      } else {
            return this.accesos.find( a => m.name === a.opcion );
      }

    });

  }

  toggleMinimize(e) {
    this.minimized = e;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
