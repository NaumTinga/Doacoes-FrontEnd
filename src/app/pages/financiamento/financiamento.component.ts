import {Component, OnInit} from "@angular/core";
import {Financiamento} from "../../models/financiamento/financiamento";
import {FinanciamentoService} from "../../services/financiamento/financiamento.service";

@Component({
  selector: "app-financiamento",
  templateUrl: "./financiamento.component.html",
})

export class FinanciamentoComponent implements OnInit{

  financiamentos: Financiamento[];

  constructor(private financiamentoService: FinanciamentoService) {}

  ngOnInit() {
    this.loadFinanciamentos();
  }

  loadFinanciamentos(): void {

    this.financiamentoService.getFinanciamentos().subscribe((data) => {
      this.financiamentos = data;
      console.log(this.financiamentos);
    })

  }

}
