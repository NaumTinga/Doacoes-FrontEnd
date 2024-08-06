import {Component, OnInit} from "@angular/core";
import {RequisicaoRubrica} from "../../../models/requisicao/requisicaoRubrica";
import {SubRubrica} from "../../../models/subRubrica/subRubrica";
import {SubRubricaService} from "../../../services/subRubrica/subRubrica.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RubricaProjectoService} from "../../../services/rubricaProjecto/rubricaProjecto.service";
import {RequisicaoRubricaService} from "../../../services/requisicao/requisicaoRubrica.service";
import {RubricaProjecto} from "../../../models/rubricaProjecto/rubricaProjecto";
import {RubricaEstado} from "../../../models/rubricaEstado/rubricaEstado";
import {RubricaEstadoService} from "../../../services/rubricaEstado/rubricaEstado.service";
import {Moeda} from "../../../models/moeda/moeda";
import {MoedaService} from "../../../services/moeda/moeda.service";
import Swal from "sweetalert2";
import {Cambio} from "../../../models/cambio/cambio";
import {CambioService} from "../../../services/cambio/cambio.service";
import {Projecto} from "../../../models/projecto/projecto";

@Component({
  selector: "app-persist-requisicao_rubrica",
  templateUrl: "./persist.requisicao_rubrica.component.html",
})

export class PersistRequisicaoRubrica implements OnInit {

  requisicaoRubrica: RequisicaoRubrica = new RequisicaoRubrica();
  subRubricas: SubRubrica[] = [];
  filteredSubRubricas: SubRubrica[] = [];
  rubricasProjecto: RubricaProjecto[] = [];
  rubricasEstado: RubricaEstado[] = [];
  moedas: Moeda[] = [];
  moeda: Moeda;
  selectedSubRubrica: SubRubrica;
  cambios : Cambio[] = [];
  serverErrors = {};
  isEdit = false;
  taxaCambio: any;

  constructor(private subRubricaService: SubRubricaService,
              private rubricaProjectoService: RubricaProjectoService,
              private rubricaEstadoService: RubricaEstadoService,
              private requisicaoRubricaService: RequisicaoRubricaService,
              private moedaService: MoedaService,
              private cambioService: CambioService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.loadRubricasEstado();
    this.loadRubricasProjecto();
    this.loadMoedas();
    this.loadCambios();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.requisicaoRubricaService.getRequisicaoRubricaById(+id).subscribe((data: RequisicaoRubrica) => {
        this.requisicaoRubrica = data;
        // if (this.projecto.financiamento) {
        //   this.loadFinanciamentoDetails(this.projecto.financiamento.id);
        // }
      })
    }
  }

  // Fetch Rubricas Projecto
  loadRubricasProjecto() {
    this.rubricaProjectoService.getRubricaProjectos().subscribe((data: RubricaProjecto[]) => {
      this.rubricasProjecto = data;
      //console.log('Rubricas Projecto: ', this.rubricasProjecto);
    });
  }

  // Fetch Rubricas Estado
  loadRubricasEstado() {
    this.rubricaEstadoService.getRubricaEstados().subscribe((data: RubricaEstado[]) => {
      this.rubricasEstado = data;
      //console.log('Rubricas Estado: ', this.rubricasEstado);
    });
  }

  // Fetch Moedas
  loadMoedas() {
    this.moedaService.getMoeda().subscribe((data: Moeda[]) => {
      this.moedas = data;
      console.log(this.moedas);
    })
  }

  // Fetch Cambios
  loadCambios(){
    this.cambioService.getCambios().subscribe((data: Cambio[]) => {
      this.cambios = data;
    })
  }

  getTaxaCambio(): void {
    const moeda_baseId = this.selectedSubRubrica.moeda_sub_rubrica.id;
    const moeda_alvoId = this.requisicaoRubrica.moeda_requisicao.id;

    this.cambioService.getTaxaCambio(moeda_baseId, moeda_alvoId).subscribe(
      (data) => {
        console.log('Taxa de cambio', data);

        // You can also assign the data to a component property to use in your template
      },
      (error) => {
        console.error('Error fetching cambio rate:', error);
      }
    );
  }

  onMoedaChange(){
    if (this.selectedSubRubrica?.moeda_sub_rubrica?.id && this.requisicaoRubrica.moeda_requisicao?.id) {
      this.cambioService.getTaxaCambio( this.selectedSubRubrica?.moeda_sub_rubrica?.id, this.requisicaoRubrica.moeda_requisicao?.id)
        .subscribe((data) => {
        console.log('Taxa de cambio', data.taxa);
        this.taxaCambio = data.taxa;
      });
    }
  }

  // Calculate currency conversion based on cambios
  calculateCurrencyConversion() {
      if (this.taxaCambio) {
        this.requisicaoRubrica.valor_convertido = Number((this.requisicaoRubrica.valor_inicial * this.taxaCambio).toFixed(2));
          console.log("Valor Convertido: ",this.requisicaoRubrica.valor_convertido);
      }
  }

  // Fetch Sub Rubricas of the selected Rubrica
  onRubricaChange(rubricaId: number) {
    // console.log('Selected Rubrica ID:', rubricaId);
    this.selectedSubRubrica = null;  // Reset selected sub-rubrica
    this.requisicaoRubrica.sub_rubrica = null; // Reset the selected sub-rubrica in the model
    this.filteredSubRubricas = null;
    this.rubricaProjectoService.getSubRubricasOfRubricaProjecto(rubricaId).subscribe((subRubricas: SubRubrica[]) => {
      this.filteredSubRubricas = subRubricas;
      //console.log('Filtered Sub Rubricas2:', this.filteredSubRubricas);
    });
  }

  onSubRubricaChange(subRubricaId: number) {
    console.log('Selected Sub Rubrica:', subRubricaId);
    this.subRubricaService.getSubRubricaById(subRubricaId).subscribe((data: SubRubrica) => {
      this.selectedSubRubrica = data;
      console.log('Selected Sub Rubrica:', this.selectedSubRubrica);
    })
  }


  saveRequisicaoRubrica() {
    this.serverErrors = {}; // to catch and view errors from the server in the browser console
    if (this.isEdit) {
      this.requisicaoRubricaService.updateRequisicaoRubrica(this.requisicaoRubrica).subscribe(() => {
          Swal.fire({
            title: 'Sucesso',
            text: 'Requisição Actualizada!',
            icon: 'success',
            confirmButtonText: 'OK',
            buttonsStyling: false,
            customClass: {
              confirmButton: 'btn btn-success'
            }
          }).then(() => {
            this.router.navigate(['/requisição']);
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
      this.requisicaoRubrica.moeda_requisicao = this.requisicaoRubrica.moeda_requisicao.id;
      console.log('Moeda Requisicao', this.requisicaoRubrica.moeda_requisicao);
      this.requisicaoRubricaService.saveRequisicaoRubrica(this.requisicaoRubrica).subscribe(
        () => {
          console.log("Body da requisicao: ", this.requisicaoRubrica);
          Swal.fire({
            title: 'Sucesso',
            text: 'Requisição Emitida!',
            icon: 'success',
            confirmButtonText: 'OK',
            buttonsStyling: false,
            customClass: {
              confirmButton: 'btn btn-success'
            }
          }).then(() => {
            this.router.navigate(['/requisicao']);
          });
        },
        (error) => {
          console.error('Erro ao Emitir Requisição:', error);
          if (error.status === 400) {
            // Assuming your backend sends an error object with a 'message' property
            const errorMessage = error.error.message || 'Erro ao Emitir Requisição!';
            console.error('Detalhes do erro:', errorMessage);
            // Log detailed error messages if available
            if (error.error.errors) {
              console.error('Erros detalhados:', error.error.errors);
            }
          }
          console.log('Body da Requisicao: ', this.requisicaoRubrica);
          Swal.fire({
            title: 'Error',
            text: 'Erro ao Emitir Requisição!',
            icon: 'error',
            confirmButtonText: 'OK',
            buttonsStyling: false,
            customClass: {
              confirmButton: 'btn btn-danger'
            }
          });
        }
      );
    }
  }
}
