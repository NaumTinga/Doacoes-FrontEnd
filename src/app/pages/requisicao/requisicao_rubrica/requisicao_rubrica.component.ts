import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {RequisicaoRubricaService} from "../../../services/requisicao/requisicaoRubrica.service";
import {RequisicaoRubrica} from "../../../models/requisicao/requisicaoRubrica";
import {Cambio} from "../../../models/cambio/cambio";
import {CambioService} from "../../../services/cambio/cambio.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from "sweetalert2";

@Component({
  selector: "app-requisicao_rubrica",
  templateUrl: "./requisicao_rubrica.component.html",
})
export class RequisicaoRubricaComponent implements OnInit {
  requisicoes: RequisicaoRubrica[] = [];
  cambios: Cambio[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private requisicoesRubricaService: RequisicaoRubricaService,
    private cambioService: CambioService,
    private modalService: NgbModal
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

  isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

}

