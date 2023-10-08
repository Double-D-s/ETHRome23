import { ethereum } from "@graphprotocol/graph-ts";

export const concatenate = (param1: string, param2: string): string => {
  return param1 + "-" + param2;
};