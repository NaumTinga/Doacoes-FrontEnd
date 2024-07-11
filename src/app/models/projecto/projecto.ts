import {Financiamento} from "../financiamento/financiamento";
import {Coordenador} from "../coordenador/coordenador.model";

export class Projecto{
    id: any;
    nome: any;
    valor: any;
    data_inicio: Date;
    data_fim: Date;
    coordenador: Coordenador;
    financiamento: Financiamento;

}
