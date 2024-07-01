import {Component, OnInit} from "@angular/core";
import {UnidadeOrganica} from "../../models/unidadeOrganica/unidadeOrganica";
import {UnidadeOrganicaService} from "../../services/unidadeOrganica/unidadeOrganica.service";

@Component({
  selector: "app-unidadeOrganica",
  templateUrl: "./unidadeOrganica.component.html",
})

export class UnidadeOrganicaComponent implements OnInit {
  unidadeOrganicas: UnidadeOrganica[];

  constructor(private unidadeOrganicaService: UnidadeOrganicaService) {
  }

  ngOnInit() {
    this.loadUnidadeOrganicas();
  }

  loadUnidadeOrganicas() {
    this.unidadeOrganicaService.getUnidadeOrganicas().subscribe((data: UnidadeOrganica[]) => {
      this.unidadeOrganicas = data;
    })
  }
}
