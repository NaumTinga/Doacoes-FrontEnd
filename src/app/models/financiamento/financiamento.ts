import {Financiador} from "../financiador/financiador";
import {Moeda} from "../moeda/moeda";
import {Conta} from "../conta/conta";

export class Financiamento {
  id: any;
  data_inicio: Date;
  data_fim: Date;
  valor: any;
  descricao: any;
  financiador: Financiador;
  moeda_financiador: Moeda;
  conta_origem: Conta;
  conta_destino: Conta;
}
