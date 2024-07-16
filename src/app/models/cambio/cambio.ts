import {Moeda} from "../moeda/moeda";

export class Cambio {
  id: any;
  taxa: any;
  moeda_base: Moeda;
  moeda_alvo: Moeda;
  created_at: Date;
  updated_at: Date;
}
