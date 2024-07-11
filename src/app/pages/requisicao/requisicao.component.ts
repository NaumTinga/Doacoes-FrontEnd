import {Component, OnInit} from "@angular/core";
import {RequisicaoRubrica} from "../../models/requisicao/requisicaoRubrica";
import {Beneficiario} from "../../models/beneficiario/beneficiario.model";
import {Moeda} from "../../models/moeda/moeda";
import {RubricaEstado} from "../../models/rubricaEstado/rubricaEstado";
import {Actividade} from "../../models/actividade/actividade.model";
import {RubricaProjecto} from "../../models/rubricaProjecto/rubricaProjecto";
import {SubRubrica} from "../../models/subRubrica/subRubrica";

@Component({
  selector: "app-requisicao",
  templateUrl: "./requisicao.component.html",
})
export class RequisicaoComponent implements OnInit {

  requisicao: RequisicaoRubrica = new RequisicaoRubrica();
  beneficiarios: Beneficiario[];
  actividades: Actividade[];
  rubricasProjecto: RubricaProjecto[];
  moedas: Moeda[];
  rubricaEstados: RubricaEstado[];
  subRubricas: SubRubrica[];


  isEdit: boolean = false;


  ngOnInit() {
  }

  saveRequisicao(){

  }

}
