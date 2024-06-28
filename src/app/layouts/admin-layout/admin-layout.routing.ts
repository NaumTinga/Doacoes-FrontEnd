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
import {UnidadeOrganicaComponent} from "../../pages/unidadeOrganica/unidadeOrganica.component";
import {PersistUnidadeOrganicaComponent} from "../../pages/unidadeOrganica/persist.unidadeOrganica.component";

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },

  //Banco Routes
    { path: 'banco',           component: BancoComponent },
    { path: 'persist-banco',           component: PersistBancoComponent },
    { path: 'edit-banco/:id',           component: PersistBancoComponent },

  // Moeda Routes
    { path: 'moeda',           component: MoedaComponent },
    { path: 'persist-moeda',   component: PersistMoedaComponent },
    { path: 'edit-moeda/:id',   component: PersistMoedaComponent },

  // Conta Routes
    { path: 'conta',           component: ContaComponent },
    { path: 'persist-conta',           component: PersistContaComponent },
    { path: 'edit-conta/:id',           component: PersistContaComponent },

  // Uidade Organica Routes
    { path: 'unidadeOrganica',           component: UnidadeOrganicaComponent },
    { path: 'persist-unidadeOrganica',           component: PersistUnidadeOrganicaComponent },
    { path: 'edit-unidadeOrganica/:id',           component: PersistUnidadeOrganicaComponent },
];
