import {Banco} from "../banco/banco.model";
import {Moeda} from "../moeda/moeda";
import {Beneficiario} from "../beneficiario/beneficiario.model";
import {Financiador} from "../financiador/financiador";
import {Actividade} from "../actividade/actividade.model";

export class Conta {
  id: any;
  designacao: any;
  banco: Banco;
  moeda: Moeda;
  nr_conta: any;
  nib: any;
  iban: any;
  balcao: any;
  swift: any;
  beneficiario: Beneficiario;
  financiador: Financiador;
  //actividade: Actividade;
}
