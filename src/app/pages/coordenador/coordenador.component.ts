import { Component, OnInit } from '@angular/core';
import { Coordenador } from 'src/app/models/coordenador/coordenador.model';
import { CoordenadorService } from 'src/app/services/coordenador/coordenador.service';


@Component({
  selector: 'app-coordenador',
  templateUrl: './coordenador.component.html',
})

export class CoordenadorComponent implements OnInit {
  coordenadores: Coordenador[];

  constructor(private coordenadorService: CoordenadorService) {}

  ngOnInit(): void {
    this.loadCoordenadores();
  }

  loadCoordenadores(): void {
    this.coordenadorService.getCoordenadores().subscribe((data: Coordenador[]) => {
      this.coordenadores = data;
    });
  }
}
