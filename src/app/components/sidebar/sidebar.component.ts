import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
    { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' },
    { path: '/banco', title: 'Banco',  icon:'ni-briefcase-24 text-blue', class: '' },
    { path: '/moeda', title: 'Moeda',  icon:'ni-money-coins text-green', class: '' },
    { path: '/conta', title: 'Conta',  icon:'ni-credit-card text-pink', class: '' },
    {path: '/pais', title: 'Pais', icon: 'ni-world text-blue', class: ''},
    {path: '/actividade', title: 'Actividade', icon: 'ni-world text-blue', class: ''},
    {path: '/coordenador', title: 'Coordenador', icon: 'ni-user-run text-blue', class: ''},
    {path: '/beneficiario', title: 'Beneficiário', icon: 'ni-circle-08 text-blue', class: ''},
    {path: '/financiador', title: 'Financiador', icon: 'ni-circle-08 text-blue', class: ''},
    { path: '/unidadeOrganica', title: 'Unidade Orgânica',  icon:'ni-building text-yellow', class: '' },

    { path: '/rubricaEstado', title: 'Rubrica do Estado',  icon:'ni-collection text-red', class: '' },
    { path: '/financiamento', title: 'Financiamento',  icon:'ni-money-coins text-green', class: '' },
    { path: '/projecto', title: 'Projecto',  icon:'ni-money-coins text-green', class: '' },
    { path: '/requisicaoRubrica', title: 'Requisições',  icon:'ni-single-copy-04 text-green', class: '' },
    {path: '/subProjecto', title: 'SubProjecto', icon: 'ni-tag text-blue', class: ''},
  

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
