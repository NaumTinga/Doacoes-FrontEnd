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
  taxaCambio = Cambio;

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
    const moeda_baseId = this.selectedSubRubrica?.moeda_sub_rubrica?.id;
    const moeda_alvoId = this.requisicaoRubrica.moeda_requisicao?.id;
    console.log('Base:',moeda_baseId,'Alvo:', moeda_alvoId);
    console.log('Moeda Alvo selecionada: ',this.requisicaoRubrica.moeda_requisicao);

    if (moeda_baseId && moeda_alvoId) {
      this.cambioService.getTaxaCambio( this.selectedSubRubrica?.moeda_sub_rubrica?.id, this.requisicaoRubrica.moeda_requisicao?.id)
        .subscribe((data) => {
        console.log('Taxa de cambio', data.taxa);
        this.taxaCambio = data.taxa;
      });
    }
  }

  // Calculate currency conversion based on cambios
  calculateCurrencyConversion() {
    if (
      this.requisicaoRubrica.moeda_requisicao &&
      this.requisicaoRubrica.moeda_distribuicao &&
      this.requisicaoRubrica.valor_inicial
    ) {
      const cambio = this.cambios.find(
        (c) =>
          c.moeda_alvo === this.requisicaoRubrica.moeda_requisicao.sigla &&
          c.moeda_base === this.requisicaoRubrica.moeda_distribuicao.sigla
      );
      if (cambio) {
        this.requisicaoRubrica.valor_convertido =
          this.requisicaoRubrica.valor_inicial * cambio.taxa;
        console.log("Valor Convertido: ",this.requisicaoRubrica.valor_convertido);
      }
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
      this.requisicaoRubricaService.saveRequisicaoRubrica(this.requisicaoRubrica).subscribe(
        () => {
          console.log("Body da requisicao: ", this.requisicaoRubrica);
          console.log("Error: ", this.serverErrors)
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
