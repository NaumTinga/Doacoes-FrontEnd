import {TipoOperacaoEnum} from "../enums/tipoOperacao.enum";
import {Beneficiario} from "../beneficiario/beneficiario.model";
import {Fornecedor} from "../fornecedor/fornecedor";
import {Actividade} from "../actividade/actividade.model";
import {Conta} from "../conta/conta";
import {Assinante} from "../assinante/assinante";
import {SubRubrica} from "../subRubrica/subRubrica";

export class OrdemPagamento {

  id: any;
  valor: any;
  valor_extenso: any;
  descricao: any;
  tipo_operacao: TipoOperacaoEnum;
  conta_ordenador: Conta;
  conta_destino: Conta;
  beneficiario: Beneficiario;
  fornecedor: Fornecedor;
  actividade: Actividade;
  sub_rubrica: SubRubrica;
  assinante_principal: Assinante;
  assinante_secundario: Assinante;
}
