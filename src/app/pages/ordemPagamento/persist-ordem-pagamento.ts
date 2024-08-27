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
import {RequisicaoRubricaService} from "../../services/requisicao/requisicaoRubrica.service";

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
  totalValor: number = 0; // Add this line

  constructor(private ordemPagamentoService: OrdemPagamentoService,
              private beneficiarioService: BeneficiarioService,
              private fornecedorService: FornecedorService,
              private assinanteService: AssinanteService,
              private contaService: ContaService,
              private requisicaoRubricaService: RequisicaoRubricaService,
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
    this.calculateTotalValor();
    this.getSubRubrica();
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
      this.contas = data.filter(conta => conta.conta_central);
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
  calculateTotalValor(): void {
    if (this.requisicoes && this.requisicoes.length > 0) {
      // Calculate the sum of valor_inicial for all requisicoes
      this.totalValor = this.requisicoes.reduce((sum, requisicao) => {
        // Convert requisicao.valor_inicial to number and add to sum
        return sum + (Number(requisicao.valor_inicial) || 0);
      }, 0);
      console.log('Total Valor:', this.totalValor); // For debugging
    } else {
      this.totalValor = 0;
    }
  }




  // Get the sub_rubrica from the first requisicao (assuming all are the same)
  // getSubRubrica(): string {
  //   // Check if requisicoes are present and sub_rubrica has a property that can be converted to string
  //   return this.requisicoes.length > 0 ? this.requisicoes[0].sub_rubrica.nome : '';
  // }
  getSubRubrica(): string {
    if (this.requisicoes.length > 0) {
      // Assign the full sub_rubrica object to ordemPagamento.sub_rubrica
      this.ordemPagamento.sub_rubrica = this.requisicoes[0].sub_rubrica.id;
     // console.log('Sub Rubrica: ',this.ordemPagamento.sub_rubrica);
      // Return the nome property of sub_rubrica for any display purposes
      return this.ordemPagamento.sub_rubrica.nome;
    }
    // If no requisicoes are present, ensure ordemPagamento.sub_rubrica is set to null or handle accordingly
    this.ordemPagamento.sub_rubrica = null;
    return '';
  }



  save() {
    this.serverErrors = {};
    this.ordemPagamento.valor = this.totalValor;

    // Ensure descricao is up-to-date
    this.updateDescricao();
    this.getSubRubrica();
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
            this.updateRequisicoesEstadoPagamento(); // Update requisicoes estado_pagamento
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
            this.updateRequisicoesEstadoPagamento(); // Update requisicoes estado_pagamento
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

  updateRequisicoesEstadoPagamento() {
    this.requisicaoRubricaService.updateEstadoPagamento(this.requisicoes, 'pendente').subscribe(
      () => {
        console.log('Estado de pagamento das requisicoes atualizado para "pendente".');
      },
      (error) => {
        console.error('Erro ao atualizar estado_pagamento das requisicoes:', error);
      }
    );
  }

}
