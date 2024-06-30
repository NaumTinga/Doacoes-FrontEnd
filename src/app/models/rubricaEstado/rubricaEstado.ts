export class RubricaEstado {
  id: any;
  nome: any;
  tipo_rubrica: TipoRubrica;
  codigo_rubrica: any;
}

export enum TipoRubrica {
  INVESTIMENTO = 'INVESTIMENTO',
  FUNCIONAMENTO = 'FUNCIONAMENTO'
}
