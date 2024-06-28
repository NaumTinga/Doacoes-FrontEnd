import {Banco} from "../banco/banco.model";
import {Moeda} from "../moeda/moeda";

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
}
