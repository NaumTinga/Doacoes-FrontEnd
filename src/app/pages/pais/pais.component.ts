import { Component, OnInit } from '@angular/core';
import { Pais } from 'src/app/models/pais/pais.model';
import { PaisService } from 'src/app/services/pais/pais.service';


@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
})
export class PaisComponent implements OnInit {
  paises: Pais[];

  constructor(private paisesService: PaisService) {}

  ngOnInit(): void {
    this.loadPaises();
  }

  loadPaises(): void {
    this.paisesService.getPaises().subscribe((data: Pais[]) => {
      this.paises = data;
    });
  }
}
