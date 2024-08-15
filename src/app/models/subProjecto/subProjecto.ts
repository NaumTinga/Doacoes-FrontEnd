import { Actividade } from "../actividade/actividade.model";
import { Beneficiario } from "../beneficiario/beneficiario.model";
import { Projecto } from "../projecto/projecto";

export class SubProjecto {
    id: any;

    descricao: any;
    valor: any;
    dataInicio: Date;
    dataFim: Date;
    projecto: Projecto;
    actividade: Actividade;
    beneficiario: Beneficiario;

  }
