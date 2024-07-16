import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {RequisicaoRubricaService} from "../../../services/requisicao/requisicaoRubrica.service";
import {RequisicaoRubrica} from "../../../models/requisicao/requisicaoRubrica";

@Component({
  selector: "app-requisicao_rubrica",
  templateUrl: "./requisicao_rubrica.component.html",
})

export class RequisicaoRubricaComponent implements OnInit {

  requisicoes: RequisicaoRubrica[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private requisicoesRubricaService: RequisicaoRubricaService,) { }
  ngOnInit() {
    this.loadRequisicoesRubrica()
  }

  loadRequisicoesRubrica(): void {
    this.requisicoesRubricaService.getRequisacoesRubricas().subscribe((data: RequisicaoRubrica[]) => {
      this.requisicoes = data;
      console.log('Requisicoes: ',this.requisicoes);
    });
  }


}
