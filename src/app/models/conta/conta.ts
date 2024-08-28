import {Banco} from "../banco/banco.model";
import {Moeda} from "../moeda/moeda";
import {Beneficiario} from "../beneficiario/beneficiario.model";
import {Financiador} from "../financiador/financiador";
import {Actividade} from "../actividade/actividade.model";
import {UnidadeOrganica} from "../unidadeOrganica/unidadeOrganica";
import {Fornecedor} from "../fornecedor/fornecedor";

export class Conta {
  id: any;
  conta_central: boolean = false;
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
  fornecedor: Fornecedor;
  unidade_organica: UnidadeOrganica;
  //actividade: Actividade;
}
