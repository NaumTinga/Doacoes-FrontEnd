import {TipoAssinanteEnum} from "../enums/tipoAssinante.enum";
import {Conta} from "../conta/conta";

export class Assinante {
  id: any;
  nome: any;
  tipo_assinante: TipoAssinanteEnum;
  conta: Conta;
}
