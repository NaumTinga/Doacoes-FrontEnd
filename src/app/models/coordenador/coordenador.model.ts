import {UnidadeOrganica} from "../unidadeOrganica/unidadeOrganica";
import {NivelAcademicoEnum} from "../enums/nivelAcademico.enum";
import {SexoEnum} from "../enums/sexo.enum";

export class Coordenador {
    id:any;
    nome: any;
    email: any;
    telefone: any;
    data_nascimento: any;
    endereco: any;
    nuit: any;
    nivel_academico: NivelAcademicoEnum;
    sexo: SexoEnum;
    nacionalidade: any;
    unidade_organica: UnidadeOrganica;
}
