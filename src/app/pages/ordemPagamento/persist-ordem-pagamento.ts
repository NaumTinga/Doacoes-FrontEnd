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
import Swal from "sweetalert2";
import {ContaService} from "../../services/conta/conta.service";

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
  serverErrors = {};
  isEdit: boolean = false;
  selectedTipo: string;
  requisicoes: RequisicaoRubrica[] = [];

  constructor(private ordemPagamentoService: OrdemPagamentoService,
              private beneficiarioService: BeneficiarioService,
              private fornecedorService: FornecedorService,
              private assinanteService: AssinanteService,
              private contaService: ContaService,
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
    this.loadContas();

    // Automatically set the descricao from requisicoes
    this.updateDescricao();
    console.log('Requisicoes selecionadas para emitir OP: ', this.requisicoes)
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

  loadContas(){
    this.contaService.getContas().subscribe((data) => {
      this.contas = data;
    })
  }

  loadBeneficiarioConta(id: number) {
    this.beneficiarioService.getBeneficiarioContas(id).subscribe((data) => {
      this.contas = data;
    })
  }

  onTipoChange(tipo: string) {
    this.selectedTipo = tipo;
  }


  // Update descricao based on selected requisicoes
  updateDescricao() {
    if (this.requisicoes.length > 0) {
      const descricaoConcatenada = this.requisicoes.map(req => req.descricao).join(", ");
      this.ordemPagamento.descricao = descricaoConcatenada;
    }
  }


  // Calculate total valor from requisicoes
  getTotalValorConvertido(): number {
    return this.requisicoes.reduce((sum, req) => sum + req.valor_convertido, 0);
  }


  // Get the sub_rubrica from the first requisicao (assuming all are the same)
  getSubRubrica(): string {
    // Check if requisicoes are present and sub_rubrica has a property that can be converted to string
    return this.requisicoes.length > 0 ? this.requisicoes[0].sub_rubrica.nome : '';
  }


  save() {
    this.serverErrors = {};
    // Calculate total valor_convertido from requisicoes
    const totalValorConvertido = this.requisicoes.reduce((total, req) => total + req.valor_convertido, 0);
    // Set the ordemPagamento valor and descricao
    this.ordemPagamento.valor = totalValorConvertido;

    // Ensure descricao is up-to-date
    this.updateDescricao();

    console.log('Total despesa: ',this.ordemPagamento.valor)
    console.log('Descricao: ',this.ordemPagamento.descricao)

    if (this.isEdit) {
      this.ordemPagamentoService.update(this.ordemPagamento).subscribe(() => {
          Swal.fire({
            title: 'Sucesso',
            text: 'Ordem de Pagamento actualizada!',
            icon: 'success',
            confirmButtonText: 'OK',
            buttonsStyling: false,
            customClass: {
              confirmButton: 'btn btn-success'
            }
          }).then(() => {
            this.router.navigate(['/ordem-pagamento']);
          });
        },
        (error) => {
          Swal.fire({
            title: 'Error',
            text: 'Erro ao Actualizar a Requisição!',
            icon: 'error',
            confirmButtonText: 'OK',
            buttonsStyling: false,
            customClass: {
              confirmButton: 'btn btn-danger'
            }
          });
        })
    } else {
      this.ordemPagamentoService.save(this.ordemPagamento).subscribe(() => {
          Swal.fire({
            title: 'Sucesso',
            text: 'Ordem de Pagamento Emitida!',
            icon: 'success',
            confirmButtonText: 'OK',
            buttonsStyling: false,
            customClass: {
              confirmButton: 'btn btn-success'
            }
          }).then(() => {
            this.router.navigate(['/ordem-pagamento']);
          });

        },
        (error) => {
          console.error('Erro ao Emitir Ordem de Pagamento:', error);
          if (error.status === 400) {
            // Assuming your backend sends an error object with a 'message' property
            const errorMessage = error.error.message || 'Erro ao Emitir Ordem de Pagamento!';
            console.error('Detalhes do erro:', errorMessage);
            // Log detailed error messages if available
            if (error.error.errors) {
              console.error('Erros detalhados:', error.error.errors);
            }
          }
          console.log('Body da Ordem de Pagamento: ', this.ordemPagamento);
          Swal.fire({
            title: 'Error',
            text: 'Erro ao Emitir a Ordem de Pagamento!',
            icon: 'error',
            confirmButtonText: 'OK',
            buttonsStyling: false,
            customClass: {
              confirmButton: 'btn btn-danger'
            }
          });
        })
  }
}

}
