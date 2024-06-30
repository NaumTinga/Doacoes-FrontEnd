import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import {BancoComponent} from "../../pages/banco/banco.component";
import {PersistBancoComponent} from "../../pages/banco/persist.banco.component";
import {MoedaComponent} from "../../pages/moeda/moeda.component";
import {PersistMoedaComponent} from "../../pages/moeda/persist.moeda.component";
import {ContaComponent} from "../../pages/conta/conta.component";
import {PersistContaComponent} from "../../pages/conta/persist.conta.component";
import { PaisComponent } from 'src/app/pages/pais/pais.component';
import { ActividadeComponent } from 'src/app/pages/actividade/actividade.component';
import { PersistActividadeComponent } from 'src/app/pages/actividade/persist.actividade.component';
//import { CoordenadorComponent } from 'src/app/pages/coordenador/coordenador.component';
import { CoordenadorComponent } from 'src/app/pages/coordenador/coordenador.component';
import { PersistCoordenadorComponent } from 'src/app/pages/coordenador/persist.coordenador.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'banco',           component: BancoComponent },
    { path: 'persist-banco',           component: PersistBancoComponent },
    { path: 'edit-banco/:id',           component: PersistBancoComponent },
    { path: 'moeda',           component: MoedaComponent },
    { path: 'persist-moeda',   component: PersistMoedaComponent },
    { path: 'edit-moeda/:id',   component: PersistMoedaComponent },
    { path: 'conta',           component: ContaComponent },
    { path: 'persist-conta',           component: PersistContaComponent },
    { path: 'edit-conta/:id',           component: PersistContaComponent },
    {path: 'pais', component: PaisComponent},
    {path: 'actividade', component: ActividadeComponent},
    {path: 'persist-actividade', component: PersistActividadeComponent},
    {path: 'edit-actividade/:id', component: PersistActividadeComponent},
    {path: 'coordenador', component: CoordenadorComponent},
    {path: 'persist-coordenador', component: PersistCoordenadorComponent},
    {path: 'edit-coordenador/:id', component: PersistCoordenadorComponent}
//    {path: 'edit-coordenador/:id', component: CoordenadorComponent},
  //  {path:'persist-coordenador', component: CoordenadorComponent}
];
