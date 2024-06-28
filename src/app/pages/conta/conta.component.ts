import {Component, OnInit} from "@angular/core";
import {Conta} from "../../models/conta/conta";
import {ContaService} from "../../services/conta/conta.service";


@Component({
  selector: "app-conta",
  templateUrl: "./conta.component.html",
})

export class ContaComponent implements OnInit {
  contas: Conta[];

  constructor(private contaService: ContaService) {
  }
  ngOnInit() {
    this.loadContas();
  }

  loadContas(){
    this.contaService.getContas().subscribe((data: Conta[]) => {
      console.log("Contas loaded: ", data); // Log the loaded data
      this.contas = data;
    })
  }
}
