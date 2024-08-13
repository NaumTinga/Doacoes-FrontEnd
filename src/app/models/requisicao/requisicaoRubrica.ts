import {RubricaEstado} from "../rubricaEstado/rubricaEstado";
import {Moeda} from "../moeda/moeda";
import {Beneficiario} from "../beneficiario/beneficiario.model";
import {Actividade} from "../actividade/actividade.model";
import {RubricaProjecto} from "../rubricaProjecto/rubricaProjecto";
import {SubRubrica} from "../subRubrica/subRubrica";
import {EstadoPagamentoEnum} from "../enums/EstadoPagamentoEnum";
import {Fornecedor} from "../fornecedor/fornecedor";

export class RequisicaoRubrica {
  id: any;
  nr_requisicao_interna: any;
  nome_documento: any;
  descricao: any;
  rubrica_estado: RubricaEstado;
  moeda_requisicao: Moeda;
  moeda_distribuicao: Moeda;
  valor_moeda_distribuicao: any;
  irps: any;
  fornecedor: Fornecedor;
  rubrica_projecto: RubricaProjecto;
  sub_rubrica: SubRubrica;
  nr_referencia: any;
  nr_documento: any;
  data_emissao: Date;
  valor_inicial: any; //valor que o user insere antes da conversao
  valor_convertido: any; // valor apos converter e calcular irps
  estado_pagamento: EstadoPagamentoEnum

}
