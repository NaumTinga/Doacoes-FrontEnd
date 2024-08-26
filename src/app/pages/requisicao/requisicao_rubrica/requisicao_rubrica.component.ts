import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {RequisicaoRubricaService} from "../../../services/requisicao/requisicaoRubrica.service";
import {RequisicaoRubrica} from "../../../models/requisicao/requisicaoRubrica";
import {Cambio} from "../../../models/cambio/cambio";
import {CambioService} from "../../../services/cambio/cambio.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-requisicao_rubrica",
  templateUrl: "./requisicao_rubrica.component.html",
})
export class RequisicaoRubricaComponent implements OnInit {
  requisicoes: RequisicaoRubrica[] = [];
  cambios: Cambio[] = [];
  selectedRequisicoes: RequisicaoRubrica[] = [];
  selectedDataEmissao: Date = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private requisicoesRubricaService: RequisicaoRubricaService,
    private cambioService: CambioService,
  ) {}

  ngOnInit() {
    this.loadRequisicoesRubrica();
    this.loadCambios();
  }

  loadRequisicoesRubrica(): void {
    this.requisicoesRubricaService.getRequisacoesRubricas().subscribe((data: RequisicaoRubrica[]) => {
      this.requisicoes = data;
      console.log('Requisicoes: ', this.requisicoes);
    });
  }

  loadCambios(): void {
    this.cambioService.getCambios().subscribe((data: Cambio[]) => {
      this.cambios = data;
      console.log('Cambios: ', this.cambios);
    });
  }

  viewRequisicaoRubrica(requisicao: RequisicaoRubrica): void {
    Swal.fire({
      title: `Requisição ${requisicao.id}`,
      html: `
      <strong>Descrição:</strong> ${requisicao.descricao}<br>
      <strong>Valor:</strong> ${requisicao.valor_convertido}<br>
      <strong>Data:</strong> ${new Date(requisicao.data_emissao).toLocaleDateString()}
    `,
      icon: 'info',
      confirmButtonText: 'OK',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn btn-info'
      }
    });
  }


  // Checks if the cambio is updated or not
  checkCambio(): void {
    const currentDate = new Date();
    const matchingCambio = this.cambios.some(cambio => {
      const createdAt = new Date(cambio.created_at);
      const updatedAt = new Date(cambio.updated_at);
      return (
        this.isSameDay(createdAt, currentDate) || this.isSameDay(updatedAt, currentDate)
      );
    });

    if (matchingCambio) {
      this.router.navigate(['/persist-requisicao-rubrica']);
    } else {
      Swal.fire({
        title: 'Aviso!',
        html: 'O Câmbio não está actualizado! <br>' +
          'Por favor actualize o Câmbio para emitir requisições. ',
        icon: 'warning',
        confirmButtonText: 'OK',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'btn btn-warning'
        }

      })
    }
  }
  // Used in the checkCambio method to get the dates
  isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  // Handlers for selected requisicoes
  onCheckboxChange(event: any, requisicao: RequisicaoRubrica) {
    if (event.target.checked) {
      // If no requisicoes are selected, set the initial criteria for selection
      if (this.selectedRequisicoes.length === 0) {
        this.selectedDataEmissao = requisicao.data_emissao;
        this.selectedRequisicoes.push(requisicao);
      } else {
        // Check if the selected requisicao matches both data_emissao and sub_rubrica
        const firstSelected = this.selectedRequisicoes[0];
        if (requisicao.data_emissao === firstSelected.data_emissao && requisicao.sub_rubrica === firstSelected.sub_rubrica) {
          this.selectedRequisicoes.push(requisicao);
        } else {
          event.target.checked = false; // Deselect checkbox if criteria do not match
        }
      }
    } else {
      // If checkbox is unchecked, remove the requisicao from selectedRequisicoes
      const index = this.selectedRequisicoes.indexOf(requisicao);
      if (index > -1) {
        this.selectedRequisicoes.splice(index, 1);
      }
      // Reset selectedDataEmissao if no requisicoes are selected
      if (this.selectedRequisicoes.length === 0) {
        this.selectedDataEmissao = null;
      }
    }
  }


  emitirOPSelectedRequisicoes() {
    // Handle payment logic for selected requisicoes

  }

}

