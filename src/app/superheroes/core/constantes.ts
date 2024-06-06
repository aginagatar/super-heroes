import { Genero } from "../model/genero.model";
import { Ojo } from "../model/ojo.model";
import { Superpoder } from "../model/superpoder.model";

export const generos: Genero[] = [
  {value: 'M', genero: 'Masculino'},
  {value: 'F', genero: 'Femenino'}
];

export const ojos: Ojo[] = [
  {value: 'A', color: 'Azules'},
  {value: 'M', color: 'Marrones'},
  {value: 'N', color: 'Negros'},
  {value: 'V', color: 'Verdes'},
  {value: 'O', color: 'Otro'}
];

export const superpoderes: Superpoder[] = [
  {value: 'VU', poder: 'Vuelo'},
  {value: 'IN', poder: 'Invisibilidad'},
  {value: 'TQ', poder: 'Telequinesis'},
  {value: 'SF', poder: 'Superfuerzar'},
  {value: 'TP', poder: 'Telepatía'},
  {value: 'TT', poder: 'Teletransporte'},
  {value: 'VE', poder: 'Velocidad'},
  {value: 'RX', poder: 'Rayos X'}
];
