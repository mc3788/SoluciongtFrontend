import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { LoginComponent } from './views/login/login.component';
import {AuthGuardService} from './services/auth-guard.service';
import {AppComponent} from './app.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: '',
    component: AppComponent,
    pathMatch: 'full',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuardService],
    runGuardsAndResolvers: 'always',
    data: {
      title: 'Home'
    },
    children: [
      { path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)},
      { path: 'usuario',
        loadChildren: () => import('./views/usuario/usuario.module').then(m => m.UsuarioModule)},
      { path: 'categoria',
        loadChildren: () => import('./views/categoria/categoria.module').then(m => m.CategoriaModule)},
      { path: 'marca',
        loadChildren: () => import('./views/marca/marca.module').then(m => m.MarcaModule)},
      { path: 'serie',
        loadChildren: () => import('./views/letra/letra.module').then(m => m.LetraModule) },
      { path: 'cotizadormanual',
        loadChildren: () => import('./views/cotizadormanual/cotizadormanual.module').then(m => m.CotizadormanualModule) },
      { path: 'cotizadorautomatico',
        loadChildren: () => import('./views/cotizadorautomatico/cotizadorautomatico.module').then(m => m.CotizadorautomaticoModule) },
      { path: 'producto',
      loadChildren: () => import('./views/producto/producto.module').then(m => m.ProductoModule) },
      { path: 'bodega',
        loadChildren: () => import('./views/bodega/bodega.module').then(m => m.BodegaModule) },
      { path: 'cliente',
        loadChildren: () => import('./views/cliente/cliente.module').then(m => m.ClienteModule) },
      { path: 'acceso',
        loadChildren: () => import('./views/acceso/acceso.module').then(m => m.AccesoModule) },
      { path: 'contacto',
        loadChildren: () => import('./views/contacto/contacto.module').then(m => m.ContactoModule) },
      { path: 'razonsocial',
        loadChildren: () => import('./views/razonsocial/razonsocial.module').then(m => m.RazonsocialModule) },
      { path: 'proveedor',
        loadChildren: () => import('./views/proveedor/proveedor.module').then(m => m.ProveedorModule) }
    ]
  },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
