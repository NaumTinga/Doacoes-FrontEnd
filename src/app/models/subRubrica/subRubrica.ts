import {RubricaProjecto} from "../rubricaProjecto/rubricaProjecto";
import {Moeda} from "../moeda/moeda";

export class SubRubrica {
  id: any;
  codigo_rubrica: any;
  nome: any;
  valor: any;
  rubrica_projecto: RubricaProjecto;
  moeda_sub_rubrica: Moeda;
}
