import { Component, OnInit } from '@angular/core';
import {ActividadeService} from "../../services/actividade/actividade.service";
import {Actividade} from "../../models/actividade/actividade.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-actividade',
  templateUrl: './actividade.component.html',
})
export class ActividadeComponent implements OnInit {

  selectedActividade: Actividade;
  actividades: Actividade[];

  constructor(private actividadeService: ActividadeService, private modalService: NgbModal ) {}

  ngOnInit(): void {
    this.loadActividades();
  }

  openViewModal(actividade: Actividade): void {
    this.selectedActividade = actividade;
    this.modalService.open(document.getElementById('viewModal'), { ariaLabelledBy: 'viewModalLabel' });
  }

  loadActividades(): void {
    this.actividadeService.getActividades().subscribe((data: Actividade[]) => {
      this.actividades = data;
    });
  }
}
