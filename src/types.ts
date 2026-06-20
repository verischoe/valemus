export interface Projekt {
  id: string;
  name: string;
  projektleitung: string;
  beschreibung: string;
  modifiedAt: string;
  modifiedBy: string;
}

export interface Kategorie {
  id: string;
  name: string;
}

export interface Geldeinlage {
  id: string;
  projektId: string;
  bezeichnung: string;
  kategorieId: string;
  datum: string;
  geldgeber: string;
  betrag: number;
  notizen: string;
}

export enum AppTab {
  Finanzierung = 'finanzierung',
  Aufgabenplanung = 'aufgaben'
}