import {Component, OnInit} from "@angular/core";
import {Financiador} from "../../models/financiador/financiador";
import {FinanciadorService} from "../../services/financiador/financiador.service";

@Component({
  selector: "app-financiador",
  templateUrl: "./financiador.component.html",
})

export class FinanciadorComponent implements OnInit {

  financiadores: Financiador[];

  constructor(private financiadorService: FinanciadorService) {
  }
  ngOnInit() {
    this.loadFinanciadores();
  }

  loadFinanciadores(): void {
    this.financiadorService.getFinanciadores().subscribe((data: Financiador[]) => {
      this.financiadores = data;
      console.log(this.financiadores);
    })
  }
}
