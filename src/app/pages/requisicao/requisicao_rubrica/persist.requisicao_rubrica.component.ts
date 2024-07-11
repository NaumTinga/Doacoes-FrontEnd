import { Component, OnInit } from "@angular/core";
import { RequisicaoRubrica } from "../../../models/requisicao/requisicaoRubrica";
import { SubRubrica } from "../../../models/subRubrica/subRubrica";
import { SubRubricaService } from "../../../services/subRubrica/subRubrica.service";
import { ActivatedRoute, Router } from "@angular/router";
import { RubricaProjectoService } from "../../../services/rubricaProjecto/rubricaProjecto.service";
import { RequisicaoRubricaService } from "../../../services/requisicao/requisicaoRubrica.service";
import { RubricaProjecto } from "../../../models/rubricaProjecto/rubricaProjecto";
import { RubricaEstado } from "../../../models/rubricaEstado/rubricaEstado";
import { RubricaEstadoService } from "../../../services/rubricaEstado/rubricaEstado.service";
import { Moeda } from "../../../models/moeda/moeda";

@Component({
  selector: "app-requisicao_rubrica",
  templateUrl: "./persist.requisicao_rubrica.component.html",
})

export class PersistRequisicaoRubrica implements OnInit {

  requisicaoRubrica: RequisicaoRubrica = new RequisicaoRubrica();
  subRubricas: SubRubrica[] = [];
  filteredSubRubricas: SubRubrica[] = [];
  rubricasProjecto: RubricaProjecto[] = [];
  rubricasEstado: RubricaEstado[] = [];
  moedas: Moeda[] = [];
  selectedSubRubrica: SubRubrica;

  isEdit = false;

  constructor(private subRubricaService: SubRubricaService,
              private rubricaProjectoService: RubricaProjectoService,
              private rubricaEstadoService: RubricaEstadoService,
              private requisicaoRubricaService: RequisicaoRubricaService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.loadRubricasEstado();
    this.loadRubricasProjecto();
  }

  // Fetch Rubricas Projecto
  loadRubricasProjecto() {
    this.rubricaProjectoService.getRubricaProjectos().subscribe((data: RubricaProjecto[]) => {
      this.rubricasProjecto = data;
      console.log('Rubricas Projecto: ', this.rubricasProjecto);
    });
  }

  // Fetch Rubricas Estado
  loadRubricasEstado() {
    this.rubricaEstadoService.getRubricaEstados().subscribe((data: RubricaEstado[]) => {
      this.rubricasEstado = data;
      console.log('Rubricas Estado: ', this.rubricasEstado);
    });
  }

  // Fetch Sub Rubricas of the selected Rubrica
  onRubricaChange(rubricaId: number) {
    console.log('Selected Rubrica ID:', rubricaId);
    this.selectedSubRubrica = null;  // Reset selected sub-rubrica
    this.requisicaoRubrica.sub_rubrica = null; // Reset the selected sub-rubrica in the model
    this.filteredSubRubricas = null;
    this.rubricaProjectoService.getSubRubricasOfRubricaProjecto(rubricaId).subscribe((subRubricas: SubRubrica[]) => {
      this.filteredSubRubricas = subRubricas;
      console.log('Filtered Sub Rubricas2:', this.filteredSubRubricas);
    });
  }

  onSubRubricaChange(subRubricaId: number) {
    console.log('Selected Sub Rubrica:', subRubricaId);
    this.subRubricaService.getSubRubricaById(subRubricaId).subscribe((data: SubRubrica) =>{
      this.selectedSubRubrica = data;
      console.log('Selected Sub Rubrica:', this.selectedSubRubrica);
    })
  }


  saveRequisicaoRubrica() {
    // Implement save logic here
  }
}
