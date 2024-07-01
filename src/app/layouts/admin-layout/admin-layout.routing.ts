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
import { ActividadeComponent } from 'src/app/pages/actividade/actividade.component';
import { PersistActividadeComponent } from 'src/app/pages/actividade/persist.actividade.component';
//import { CoordenadorComponent } from 'src/app/pages/coordenador/coordenador.component';
import { CoordenadorComponent } from 'src/app/pages/coordenador/coordenador.component';
import { PersistCoordenadorComponent } from 'src/app/pages/coordenador/persist.coordenador.component';
import { BeneficiarioComponent } from 'src/app/pages/beneficiario/beneficiario.component';
import { PersistBeneficiarioComponent } from 'src/app/pages/beneficiario/persist.beneficiario.component';
import {UnidadeOrganicaComponent} from "../../pages/unidadeOrganica/unidadeOrganica.component";
import {PersistUnidadeOrganicaComponent} from "../../pages/unidadeOrganica/persist.unidadeOrganica.component";
import {PaisComponent} from "../../pages/pais/pais.component";
import {PersistPaisComponent} from "../../pages/pais/persist.pais.component";
import {RubricaEstadoComponent} from "../../pages/rubricaEstado/rubricaEstado.component";
import {PersistRubricaEstadoComponent} from "../../pages/rubricaEstado/persist.rubricaEstado.component";



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
  
    {path: 'actividade', component: ActividadeComponent},
    {path: 'persist-actividade', component: PersistActividadeComponent},
    {path: 'edit-actividade/:id', component: PersistActividadeComponent},
    {path: 'coordenador', component: CoordenadorComponent},
    {path: 'persist-coordenador', component: PersistCoordenadorComponent},
    {path: 'edit-coordenador/:id', component: PersistCoordenadorComponent},
    {path: 'beneficiario', component: BeneficiarioComponent},
    {path: 'persist-beneficiario', component: PersistBeneficiarioComponent},
    {path: 'edit-beneficiario/:id', component: PersistBeneficiarioComponent},
//    {path: 'edit-coordenador/:id', component: CoordenadorComponent},
  //  {path:'persist-coordenador', component: CoordenadorComponent}

  // Uidade Organica Routes
    { path: 'unidadeOrganica',           component: UnidadeOrganicaComponent },
    { path: 'persist-unidadeOrganica',           component: PersistUnidadeOrganicaComponent },
    { path: 'edit-unidadeOrganica/:id',           component: PersistUnidadeOrganicaComponent },

  // Pais Routes
    { path: 'pais',           component: PaisComponent },
    { path: 'persist-pais',           component: PersistPaisComponent },
    { path: 'edit-pais/:id',           component: PersistPaisComponent },

  // Rubrica Estado Routes
    { path: 'rubricaEstado',           component: RubricaEstadoComponent },
    { path: 'persist-rubricaEstado',           component: PersistRubricaEstadoComponent },
    { path: 'edit-rubricaEstado/:id',           component: PersistRubricaEstadoComponent },


];
