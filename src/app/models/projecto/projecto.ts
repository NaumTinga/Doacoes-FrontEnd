import {Financiamento} from "../financiamento/financiamento";
import {Coordenador} from "../coordenador/coordenador.model";

export class Projecto{
    id: any;
    nome: any;
    valor: any;
    dataInicio: Date;
    dataFim: Date;
    coordenador: Coordenador;
    financiamento: Financiamento;

}
