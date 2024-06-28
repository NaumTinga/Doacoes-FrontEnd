import {Component, OnInit} from "@angular/core";
import {Pais} from "../../models/pais/pais";
import {PaisService} from "../../services/pais/pais.service";

@Component({
  selector: "app-pais",
  templateUrl: "./pais.component.html",
})

export class PaisComponent implements OnInit {
  paises: Pais[];

  constructor(private paisService: PaisService) {
  }

  ngOnInit() {
    this.loadPaises();
  }

  loadPaises() {
    this.paisService.getPaises().subscribe((data: Pais[]) => {
      this.paises = data;
    });
  }
}
