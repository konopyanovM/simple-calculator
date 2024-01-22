import {OperatorEnum} from "./enums";

export interface Operation {
  value: number,
  operator: OperatorEnum | null,
  total: number
}
