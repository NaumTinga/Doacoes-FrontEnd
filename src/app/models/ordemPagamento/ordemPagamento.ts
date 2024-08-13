import {TipoOperacaoEnum} from "../enums/tipoOperacao.enum";
import {Beneficiario} from "../beneficiario/beneficiario.model";
import {Fornecedor} from "../fornecedor/fornecedor";
import {Actividade} from "../actividade/actividade.model";
import {Conta} from "../conta/conta";
import {Assinante} from "../assinante/assinante";

export class OrdemPagamento {

  id: any;
  valor: any;
  valor_extenso: any;
  descricao: any;
  tipoOperacao: TipoOperacaoEnum;
  conta_ordenador: Conta;
  beneficiario: Beneficiario;
  fornecedor: Fornecedor;
  actividade: Actividade;
  assinante: Assinante;
}
