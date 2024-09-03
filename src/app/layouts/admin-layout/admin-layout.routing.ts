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
import {AssinanteComponent} from "../../pages/assinante/assinante.component";
import {PersistAssinanteComponent} from "../../pages/assinante/persist.assinante.component";

import { SubProjectoComponent} from "../../pages/subProjecto/subProjecto.component";
import { PersistSubProjectoComponent} from 'src/app/pages/subProjecto/persist.subProjecto.component';
import { ParametrosComponent } from 'src/app/pages/parametros/parametros.component';
import {OrdemPagamentoComponent} from "../../pages/ordemPagamento/ordem-pagamento";
import {PersistOrdemPagamentoComponent} from "../../pages/ordemPagamento/persist-ordem-pagamento";
import {AuthGuard} from "../../services/authentication/auth.guard";


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'user-profile',   component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'tables',         component: TablesComponent, canActivate: [AuthGuard] },
    { path: 'icons',          component: IconsComponent,  canActivate: [AuthGuard] },
    { path: 'maps',           component: MapsComponent, canActivate: [AuthGuard] },

  //Banco Routes
    { path: 'banco',           component: BancoComponent, canActivate: [AuthGuard]  },
    { path: 'persist-banco',           component: PersistBancoComponent, canActivate: [AuthGuard]  },
    { path: 'edit-banco/:id',           component: PersistBancoComponent, canActivate: [AuthGuard] },

  // Moeda Routes
    { path: 'moeda',           component: MoedaComponent, canActivate: [AuthGuard] },
    { path: 'persist-moeda',   component: PersistMoedaComponent, canActivate: [AuthGuard] },
    { path: 'edit-moeda/:id',   component: PersistMoedaComponent, canActivate: [AuthGuard] },

  // Conta Routes
    { path: 'conta',           component: ContaComponent, canActivate: [AuthGuard] },
    { path: 'persist-conta',           component: PersistContaComponent, canActivate: [AuthGuard] },
    { path: 'edit-conta/:id',           component: PersistContaComponent, canActivate: [AuthGuard] },

  // Actividade Routes
    {path: 'actividade', component: ActividadeComponent, canActivate: [AuthGuard]},
    {path: 'persist-actividade', component: PersistActividadeComponent, canActivate: [AuthGuard]},
    {path: 'edit-actividade/:id', component: PersistActividadeComponent, canActivate: [AuthGuard]},

  // Coordenador Routes
    {path: 'coordenador', component: CoordenadorComponent, canActivate: [AuthGuard]},
    {path: 'persist-coordenador', component: PersistCoordenadorComponent, canActivate: [AuthGuard]},
    {path: 'edit-coordenador/:id', component: PersistCoordenadorComponent, canActivate: [AuthGuard]},

  // Beneficiario Routes
    {path: 'beneficiario', component: BeneficiarioComponent, canActivate: [AuthGuard]},
    {path: 'persist-beneficiario', component: PersistBeneficiarioComponent, canActivate: [AuthGuard]},
    {path: 'edit-beneficiario/:id', component: PersistBeneficiarioComponent, canActivate: [AuthGuard]},

  // Uidade Organica Routes
    { path: 'unidadeOrganica',           component: UnidadeOrganicaComponent, canActivate: [AuthGuard] },
    { path: 'persist-unidadeOrganica',           component: PersistUnidadeOrganicaComponent, canActivate: [AuthGuard] },
    { path: 'edit-unidadeOrganica/:id',           component: PersistUnidadeOrganicaComponent, canActivate: [AuthGuard] },

  // Pais Routes
    { path: 'pais',           component: PaisComponent, canActivate: [AuthGuard] },
    { path: 'persist-pais',           component: PersistPaisComponent, canActivate: [AuthGuard] },
    { path: 'edit-pais/:id',           component: PersistPaisComponent, canActivate: [AuthGuard] },

  // Rubrica Estado Routes
    { path: 'rubricaEstado',           component: RubricaEstadoComponent, canActivate: [AuthGuard] },
    { path: 'persist-rubricaEstado',           component: PersistRubricaEstadoComponent, canActivate: [AuthGuard] },
    { path: 'edit-rubricaEstado/:id',           component: PersistRubricaEstadoComponent, canActivate: [AuthGuard] },

  // Financiador Routes
    { path: 'financiador',           component: FinanciadorComponent, canActivate: [AuthGuard] },
    { path: 'persist-financiador',           component: PersistFinanciadorComponent, canActivate: [AuthGuard] },
    { path: 'edit-financiador/:id',           component: PersistFinanciadorComponent, canActivate: [AuthGuard] },
    { path: 'view-financiador/:id',           component: ShowFinanciadorComponent, canActivate: [AuthGuard] },

  // Financiamento Routes
    { path: 'financiamento',           component: FinanciamentoComponent, canActivate: [AuthGuard] },
    { path: 'persist-financiamento',           component: PersistFinanciamentoComponent, canActivate: [AuthGuard] },
    { path: 'edit-financiamento/:id',           component: PersistFinanciamentoComponent, canActivate: [AuthGuard] },
 // SubProjecto Routes
 {path: 'subProjecto', component: SubProjectoComponent, canActivate: [AuthGuard]},
 {path: 'persist-subProjecto', component: PersistSubProjectoComponent, canActivate: [AuthGuard]},

  // Projecto Routes
    { path: 'projecto',           component: ProjectoComponent, canActivate: [AuthGuard] },
    { path: 'persist-projecto',           component: PersistProjectoComponent, canActivate: [AuthGuard] },
    { path: 'edit-projecto/:id',           component: PersistProjectoComponent, canActivate: [AuthGuard] },
    { path: 'view-projecto/:id',           component: ShowProjectoComponent, canActivate: [AuthGuard] },

  // Rubrica Projecto Routes
    { path: 'rubricaProjecto',           component: ShowRubricaProjectoComponent, canActivate: [AuthGuard] },
    { path: 'edit-rubricaProjecto/:id',           component: ShowRubricaProjectoComponent, canActivate: [AuthGuard] },
    { path: 'view-rubricaProjecto/:id',           component: ShowRubricaProjectoComponent, canActivate: [AuthGuard] },

  // Sub Rubrica Routes
    { path: 'view-subRubrica/:id',           component: SubRubricaComponent, canActivate: [AuthGuard] },

  // Requisição Rubrica Routes
    { path: 'requisicao-rubrica', component: RequisicaoRubricaComponent, canActivate: [AuthGuard] },
    { path: 'persist-requisicao-rubrica', component: PersistRequisicaoRubrica, canActivate: [AuthGuard] },
    { path: 'edit-requisicao-rubrica/:id', component: PersistRequisicaoRubrica, canActivate: [AuthGuard] },

  // Cambio  Routes
    { path: 'cambio', component: CambioComponent, canActivate: [AuthGuard] },
    { path: 'persist-cambio', component: PersistCambioComponent, canActivate: [AuthGuard] },
    { path: 'edit-cambio/:id', component: PersistCambioComponent, canActivate: [AuthGuard] },

  // Fornecedor Routes
    { path: 'fornecedor', component: FornecedorComponent, canActivate: [AuthGuard] },
    { path: 'persist-fornecedor', component: PersistFornecedorComponent, canActivate: [AuthGuard] },
    { path: 'edit-fornecedor/:id', component: PersistFornecedorComponent, canActivate: [AuthGuard] },
    { path: 'view-fornecedor/:id', component: PersistFornecedorComponent, canActivate: [AuthGuard] },

  // Assinante Routes
    { path: 'assinante', component: AssinanteComponent, canActivate: [AuthGuard] },
    { path: 'persist-assinante', component: PersistAssinanteComponent, canActivate: [AuthGuard] },
    { path: 'edit-assinante/:id', component: PersistAssinanteComponent, canActivate: [AuthGuard] },
    { path: 'view-assinante/:id', component: PersistAssinanteComponent, canActivate: [AuthGuard] },

  //Parametros Routes
    {path: 'parametros', component: ParametrosComponent, canActivate: [AuthGuard]},

  // Ordem de Pagamento Routes
    {path: 'ordem-pagamento', component: OrdemPagamentoComponent, canActivate: [AuthGuard]},
    {path: 'persist-ordem-pagamento', component: PersistOrdemPagamentoComponent, canActivate: [AuthGuard]},
];
