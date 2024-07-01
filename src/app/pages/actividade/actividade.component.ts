import { Component, OnInit } from '@angular/core';
import {ActividadeService} from "../../services/actividade/actividade.service";
import {Actividade} from "../../models/actividade/actividade.model";


@Component({
  selector: 'app-actividade',
  templateUrl: './actividade.component.html',
})
export class ActividadeComponent implements OnInit {
  currentDynamicLink: string = '/';

  actividades: Actividade[];

  constructor(private actividadeService: ActividadeService, ) {}

  ngOnInit(): void {
    this.loadActividades();
  }

  loadActividades(): void {
    this.actividadeService.getActividades().subscribe((data: Actividade[]) => {
      this.actividades = data;
    });
  }
}
