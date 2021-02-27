import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'cil-chart-line',
    badge: {
      variant: 'info',
      text: ''
    }
  },
  {
    name: 'Seguridad',
    url: '/seguridad',
    icon: 'cil-lock-locked',
    children: [
      {
        name: 'Usuarios',
        url: '/usuario',
        icon: 'cil-user',
      },
      {
        name: 'Categorias',
        url: '/categoria',
        icon: 'cil-storage',
      },
      {
        name: 'Accesos',
        url: '/acceso',
        icon: 'cil-lock-unlocked',
      },
      {
        name: 'Series',
        url: '/serie',
        icon: 'cil-spreadsheet',
      }
    ]
  },
  {
    name: 'Cotizador',
    url: '/cotizador',
    icon: 'cil-task',
    children: [
      {
        name: 'Manual',
        url: '/cotizadormanual',
        icon: 'cil-clipboard',
      },
      {
        name: 'Automatico',
        url: '/cotizadorautomatico',
        icon: 'cil-clone',
      }
    ]
  },
  {
    name: 'Inventarios',
    url: '/inventarios',
    icon: 'cil-inbox',
    children: [
      {
        name: 'Productos',
        url: '/producto',
        icon: 'cil-tablet',
      },
      {
        name: 'Proveedores',
        url: '/proveedor',
        icon: 'cil-factory',
      },
      {
        name: 'Bodegas',
        url: '/bodega',
        icon: 'cil-factory',
      }
    ]
  },
  {
    name: 'Entidades',
    url: '/entidades',
    icon: 'cil-briefcase',
    children: [
      {
        name: 'Clientes',
        url: '/cliente',
        icon: 'cil-contact',
      },
      {
        name: 'Contactos',
        url: '/contacto',
        icon: 'cil-voice-over-record',
      },
      {
        name: 'Razon',
        url: '/razonsocial',
        icon: 'cil-file',
      }
    ]
  }
];
