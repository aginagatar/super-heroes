import { Injectable } from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'forms',
    title: 'Navegación',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'tables',
        title: 'Tabla - Listado',
        type: 'item',
        url: '/tabla-listado',
        classes: 'nav-item',
        icon: 'feather icon-server',
      },
      {
        id: 'forms-element',
        title: 'Formulario',
        type: 'item',
        url: '/formulario',
        classes: 'nav-item',
        icon: 'feather icon-file-text',
      }
    ]
  }
];

@Injectable()
export class NavigationItem {
  get() {
    return NavigationItems;
  }
}
