import {UnidadeOrganica} from "../unidadeOrganica/unidadeOrganica";
import {NivelAcademicoEnum} from "../enums/nivelAcademico.enum";
import {SexoEnum} from "../enums/sexo.enum";

export class Beneficiario {
  id: number;
  nome: string;
  nacionalidade: string;
  dataNascimento: Date;
  email: string;
  telefone: string;
  endereco: string;
  nuit: string;
  nivelAcademico: NivelAcademicoEnum;
  sexo: SexoEnum;
  unidadeOrganica: UnidadeOrganica;

}


