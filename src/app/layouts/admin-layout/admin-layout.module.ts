import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import {NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BancoComponent} from "../../pages/banco/banco.component";
import {PersistBancoComponent} from "../../pages/banco/persist.banco.component";
import {MoedaComponent} from "../../pages/moeda/moeda.component";
import {PersistMoedaComponent} from "../../pages/moeda/persist.moeda.component";
import {ContaComponent} from "../../pages/conta/conta.component";
import {PersistContaComponent} from "../../pages/conta/persist.conta.component";
import { PaisComponent } from 'src/app/pages/pais/pais.component';
import { ActividadeComponent } from 'src/app/pages/actividade/actividade.component';
import { PersistActividadeComponent } from 'src/app/pages/actividade/persist.actividade.component';
import { CoordenadorComponent } from 'src/app/pages/coordenador/coordenador.component';
import { PersistCoordenadorComponent } from 'src/app/pages/coordenador/persist.coordenador.component';
import { BeneficiarioComponent } from 'src/app/pages/beneficiario/beneficiario.component';
import { PersistBeneficiarioComponent } from 'src/app/pages/beneficiario/persist.beneficiario.component';
import {UnidadeOrganicaComponent} from "../../pages/unidadeOrganica/unidadeOrganica.component";
import {PersistUnidadeOrganicaComponent} from "../../pages/unidadeOrganica/persist.unidadeOrganica.component";
import {PersistPaisComponent} from "../../pages/pais/persist.pais.component";
import {RubricaEstadoComponent} from "../../pages/rubricaEstado/rubricaEstado.component";
import {PersistRubricaEstadoComponent} from "../../pages/rubricaEstado/persist.rubricaEstado.component";
import {FinanciadorComponent} from "../../pages/financiador/financiador.component";
import {PersistFinanciadorComponent} from "../../pages/financiador/persist.financiador.component";
import {FinanciamentoComponent} from "../../pages/financiamento/financiamento.component";
import {PersistFinanciamentoComponent} from "../../pages/financiamento/persist.financiamento.component";
import {ProjectoComponent} from "../../pages/projecto/projecto.component";
import {PersistProjectoComponent} from "../../pages/projecto/persist.projecto.component";
import {ShowBeneficiarioComponent} from "../../pages/beneficiario/show.beneficiario.component";
import {MatTabsModule} from "@angular/material/tabs";


// import { ToastrModule } from 'ngx-toastr';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    NgbModalModule,
    MatTabsModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    BancoComponent,
    PersistBancoComponent,
    MoedaComponent,
    PersistMoedaComponent,
    ContaComponent,
    PersistContaComponent,
    ActividadeComponent,
    PersistActividadeComponent,
    CoordenadorComponent,
    PersistCoordenadorComponent,
    BeneficiarioComponent,
    PersistBeneficiarioComponent,
    UnidadeOrganicaComponent,
    PersistUnidadeOrganicaComponent,
    PaisComponent,
    PersistPaisComponent,
    RubricaEstadoComponent,
    PersistRubricaEstadoComponent,
    FinanciadorComponent,
    PersistFinanciadorComponent,
    FinanciamentoComponent,
    PersistFinanciamentoComponent,
    ProjectoComponent,
    PersistProjectoComponent,
    ShowBeneficiarioComponent,
  ],
})

export class AdminLayoutModule {}
