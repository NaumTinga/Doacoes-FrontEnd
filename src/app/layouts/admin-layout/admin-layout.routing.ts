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
import {FinanciadorComponent} from "../../pages/financiador/financiador.component";
import {PersistFinanciadorComponent} from "../../pages/financiador/persist.financiador.component";
import {FinanciamentoComponent} from "../../pages/financiamento/financiamento.component";
import {PersistFinanciamentoComponent} from "../../pages/financiamento/persist.financiamento.component";
import {ProjectoComponent} from "../../pages/projecto/projecto.component";
import {PersistProjectoComponent} from "../../pages/projecto/persist.projecto.component";
import {ShowBeneficiarioComponent} from "../../pages/beneficiario/show.beneficiario.component";
import {ShowFinanciadorComponent} from "../../pages/financiador/show.financiador.component";
import {ShowProjectoComponent} from "../../pages/projecto/show.projecto.component";
import {ShowRubricaProjectoComponent} from "../../pages/projecto/rubricaProjecto/show.rubricaProjecto.component";
import {SubRubricaComponent} from "../../pages/subRubrica/subRubrica.component";
import {PersistRequisicaoRubrica} from "../../pages/requisicao/requisicao_rubrica/persist.requisicao_rubrica.component";
import {CambioComponent} from "../../pages/cambio/cambio.component";
import {PersistCambioComponent} from "../../pages/cambio/perisist.cambio.component";
import {RequisicaoRubricaComponent} from "../../pages/requisicao/requisicao_rubrica/requisicao_rubrica.component";
import {FornecedorComponent} from "../../pages/fornecedor/fornecedor.component";
import {PersistFornecedorComponent} from "../../pages/fornecedor/persist.fornecedor.component";



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

  // Actividade Routes
    {path: 'actividade', component: ActividadeComponent},
    {path: 'persist-actividade', component: PersistActividadeComponent},
    {path: 'edit-actividade/:id', component: PersistActividadeComponent},

  // Coordenador Routes
    {path: 'coordenador', component: CoordenadorComponent},
    {path: 'persist-coordenador', component: PersistCoordenadorComponent},
    {path: 'edit-coordenador/:id', component: PersistCoordenadorComponent},

  // Beneficiario Routes
    {path: 'beneficiario', component: BeneficiarioComponent},
    {path: 'persist-beneficiario', component: PersistBeneficiarioComponent},
    {path: 'edit-beneficiario/:id', component: PersistBeneficiarioComponent},
    {path: 'view-beneficiario/:id', component: ShowBeneficiarioComponent},

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

  // Financiador Routes
    { path: 'financiador',           component: FinanciadorComponent },
    { path: 'persist-financiador',           component: PersistFinanciadorComponent },
    { path: 'edit-financiador/:id',           component: PersistFinanciadorComponent },
    { path: 'view-financiador/:id',           component: ShowFinanciadorComponent },

  // Financiamento Routes
    { path: 'financiamento',           component: FinanciamentoComponent },
    { path: 'persist-financiamento',           component: PersistFinanciamentoComponent },
    { path: 'edit-financiamento/:id',           component: PersistFinanciamentoComponent },

  // Projecto Routes
    { path: 'projecto',           component: ProjectoComponent },
    { path: 'persist-projecto',           component: PersistProjectoComponent },
    { path: 'edit-projecto/:id',           component: PersistProjectoComponent },
    { path: 'view-projecto/:id',           component: ShowProjectoComponent },

  // Rubrica Projecto Routes
    { path: 'rubricaProjecto',           component: ShowRubricaProjectoComponent },
    { path: 'edit-rubricaProjecto/:id',           component: ShowRubricaProjectoComponent },
    { path: 'view-rubricaProjecto/:id',           component: ShowRubricaProjectoComponent },

  // Sub Rubrica Routes
    { path: 'view-subRubrica/:id',           component: SubRubricaComponent },

  // Requisição Rubrica Routes
    { path: 'requisicao-rubrica', component: RequisicaoRubricaComponent },
    { path: 'persist-requisicao-rubrica', component: PersistRequisicaoRubrica },
    { path: 'edit-requisicao-rubrica/:id', component: PersistRequisicaoRubrica },

  // Cambio  Routes
    { path: 'cambio', component: CambioComponent },
    { path: 'persist-cambio', component: PersistCambioComponent },
    { path: 'edit-cambio/:id', component: PersistCambioComponent },

  // Fornecedor Routes
    { path: 'fornecedor', component: FornecedorComponent },
    { path: 'persist-fornecedor', component: PersistFornecedorComponent },
    { path: 'edit-fornecedor/:id', component: PersistFornecedorComponent },
    { path: 'view-fornecedor/:id', component: PersistFornecedorComponent },


];
