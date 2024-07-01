import {UnidadeOrganica} from "../unidadeOrganica/unidadeOrganica";

export class Beneficiario {
  id: number;
  nome: string;
  nacionalidade: string;
  dataNascimento: Date;
  email: string;
  telefone: string;
  endereco: string;
  nuit: string;
  nivelAcademico: NivelAcademico;
  sexo: Sexo;
  unidadeOrganica: UnidadeOrganica;

}

export enum Sexo {
  MASCULINO = 'MASCULINO',
  FEMENINO = 'FEMENINO'
}

export enum NivelAcademico {
  LICENCIATURA = 'LICENCIATURA',
  MESTRADO = 'MESTRADO',
  DOUTORAMENTO = 'DOUTORAMENTO'
}
