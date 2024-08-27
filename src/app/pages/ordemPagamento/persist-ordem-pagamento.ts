import {Component, OnInit} from "@angular/core";
import {OrdemPagamento} from "../../models/ordemPagamento/ordemPagamento";
import {OrdemPagamentoService} from "../../services/ordemPagamento/ordemPagamento.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Conta} from "../../models/conta/conta";
import {TipoOperacaoEnum} from "../../models/enums/tipoOperacao.enum";
import {Beneficiario} from "../../models/beneficiario/beneficiario.model";
import {Fornecedor} from "../../models/fornecedor/fornecedor";
import {BeneficiarioService} from "../../services/beneficiario/beneficiario.service";
import {FornecedorService} from "../../services/fornecedor/fornecedor.service";
import {Assinante} from "../../models/assinante/assinante";
import {AssinanteService} from "../../services/assinante/assinante.service";
import {RequisicaoRubrica} from "../../models/requisicao/requisicaoRubrica";

@Component(
  {
    selector: "app-perisist-ordem-pagamento",
    templateUrl: "./persist-ordem-pagamento.html",
  }
)
export class PersistOrdemPagamentoComponent implements OnInit {
  ordemPagamento: OrdemPagamento = new OrdemPagamento();
  contas: Conta[] = [];
  contas_fornecedor: Conta[] = [];
  tipoOperacaoOptions = Object.values(TipoOperacaoEnum);
  beneficiarios: Beneficiario[] = [];
  beneficiarioContas: Conta [] = [];
  fornecedores: Fornecedor[] = [];
  assinantes: Assinante[] = [];
  isEdit: boolean = false;
  selectedTipo: string;
  requisicoes: RequisicaoRubrica[] = [];

  constructor(private ordemPagamentoService: OrdemPagamentoService,
              private beneficiarioService: BeneficiarioService,
              private fornecedorService: FornecedorService,
              private assinanteService: AssinanteService,
              private router: Router,
              private route: ActivatedRoute,) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state && navigation.extras.state['requisicoes']) {
      this.requisicoes = navigation.extras.state['requisicoes'];
    }
  }

  ngOnInit() {
    this.loadBeneficiarios();
    this.loadFornecedores();
    this.loadAssinantes();
    console.log('Requisicoes selecionadas para emitir OP: ',this.requisicoes)
  }

  loadBeneficiarios() {
    this.beneficiarioService.getBeneficiarios().subscribe((data) => {
      this.beneficiarios = data;
    })
  }

  loadFornecedores() {
    this.fornecedorService.getFornecedores().subscribe((data) => {
      this.fornecedores = data;
    })
  }

  loadAssinantes() {
    this.assinanteService.getAssinantes().subscribe((data) => {
      this.assinantes = data;
    })
  }

  loadBeneficiarioConta(id: number){
    this.beneficiarioService.getBeneficiarioContas(id).subscribe((data) => {
      this.contas = data;
    })
  }

  onTipoChange(tipo: string) {
    this.selectedTipo = tipo;
  }

  // Puxar as requisicoes para aqui,
  // Selecionar os beneficiarios e pegar id e puxar as contas
  // Só emitir OP do mesmo beneficiario nas mesmas datas


  save() {
    if (this.isEdit) {

    }

  }
}
