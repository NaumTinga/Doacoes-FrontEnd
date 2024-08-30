import {Component, OnInit} from "@angular/core";
import {OrdemPagamento} from "../../models/ordemPagamento/ordemPagamento";
import {OrdemPagamentoService} from "../../services/ordemPagamento/ordemPagamento.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: "app-ordem-pagamento",
  templateUrl: "./ordem-pagamento.html",
})

export class OrdemPagamentoComponent implements OnInit {

  ordens_pagamentos: OrdemPagamento[] = [];

  constructor(private ordemPagamentoService: OrdemPagamentoService,
              private router: Router,
              private route: ActivatedRoute,) {}

  ngOnInit() {
    this.loadOrdemPagamentos();
  }

  loadOrdemPagamentos(): void {
    this.ordemPagamentoService.getAll().subscribe((data: OrdemPagamento[]) => {
      this.ordens_pagamentos = data;
      console.log('Ordens de Pagamentos: ',this.ordens_pagamentos);
    })
  }
}
