import { gql } from "apollo-angular";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Komentar = {
  __typename?: "Komentar";
  id: Scalars["ID"];
  anoniman: Scalars["Boolean"];
  ocena: Scalars["Int"];
  tekst: Scalars["String"];
  vreme: Scalars["String"];
  korisnik?: Maybe<Korisnik>;
  statusKomentara?: Maybe<StatusKomentara>;
  trening?: Maybe<Trening>;
};

export type StatusKomentara = {
  __typename?: "StatusKomentara";
  id: Scalars["ID"];
  naziv: Scalars["String"];
  komentars?: Maybe<Array<Maybe<Komentar>>>;
};

export type Trening = {
  __typename?: "Trening";
  id: Scalars["ID"];
  cena?: Maybe<Scalars["Int"]>;
  naziv: Scalars["String"];
  nivoTreninga?: Maybe<Scalars["String"]>;
  opis?: Maybe<Scalars["String"]>;
  slika?: Maybe<Scalars["String"]>;
  trajanjeTreninga?: Maybe<Scalars["Int"]>;
  trener?: Maybe<Scalars["String"]>;
  vrstaTreninga?: Maybe<Scalars["String"]>;
  komentars?: Maybe<Array<Maybe<Komentar>>>;
  terminOdrzavanjaTreningas?: Maybe<Array<Maybe<TerminOdrzavanjaTreninga>>>;
  tipTreningas?: Maybe<Array<Maybe<TipTreninga>>>;
  zeljas?: Maybe<Array<Maybe<Zelja>>>;
};

export type TerminOdrzavanjaTreninga = {
  __typename?: "TerminOdrzavanjaTreninga";
  id: Scalars["ID"];
  vreme?: Maybe<Scalars["String"]>;
  rezervacijas?: Maybe<Array<Maybe<Rezervacija>>>;
  sala?: Maybe<Sala>;
  trening?: Maybe<Trening>;
};

export type TipTreninga = {
  __typename?: "TipTreninga";
  id: Scalars["ID"];
  ime?: Maybe<Scalars["String"]>;
  opis?: Maybe<Scalars["String"]>;
  trenings?: Maybe<Array<Maybe<Trening>>>;
};

export type Rezervacija = {
  __typename?: "Rezervacija";
  id: Scalars["ID"];
  potvrda?: Maybe<Scalars["Boolean"]>;
  korisnik?: Maybe<Korisnik>;
  terminOdrzavanjaTreninga?: Maybe<TerminOdrzavanjaTreninga>;
};

export type Sala = {
  __typename?: "Sala";
  id: Scalars["ID"];
  kapacitet?: Maybe<Scalars["Int"]>;
  oznaka?: Maybe<Scalars["String"]>;
  terminOdrzavanjaTreningas?: Maybe<Array<Maybe<TerminOdrzavanjaTreninga>>>;
};

export type Zelja = {
  __typename?: "Zelja";
  id: Scalars["ID"];
  korisnik?: Maybe<Korisnik>;
  trening?: Maybe<Trening>;
};

export type Korisnik = {
  __typename?: "Korisnik";
  id: Scalars["ID"];
  adresa: Scalars["String"];
  brojTelefona?: Maybe<Scalars["String"]>;
  datumRegistracije?: Maybe<Scalars["String"]>;
  datumRodjenja?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  ime?: Maybe<Scalars["String"]>;
  korisnickoIme?: Maybe<Scalars["String"]>;
  prezime?: Maybe<Scalars["String"]>;
  uloga?: Maybe<Scalars["String"]>;
  komentars?: Maybe<Array<Maybe<Komentar>>>;
  clanskaKartica?: Maybe<ClanskaKartica>;
  rezervacijas?: Maybe<Array<Maybe<Rezervacija>>>;
  zeljas?: Maybe<Array<Maybe<Zelja>>>;
};

export type ClanskaKartica = {
  __typename?: "ClanskaKartica";
  id: Scalars["ID"];
  brojPoena?: Maybe<Scalars["Int"]>;
  popust?: Maybe<Scalars["Int"]>;
  korisniks?: Maybe<Array<Maybe<Korisnik>>>;
};

export type LoggedInUser = {
  __typename?: "LoggedInUser";
  id: Scalars["ID"];
  token?: Maybe<Scalars["String"]>;
  username?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  authorities?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type Statistika = {
  __typename?: "Statistika";
  idTreninga?: Maybe<Scalars["Int"]>;
  brojZakazivanja?: Maybe<Scalars["Int"]>;
  zarada?: Maybe<Scalars["Int"]>;
  trener?: Maybe<Scalars["String"]>;
  nazivTreninga?: Maybe<Scalars["String"]>;
};

export type Query = {
  __typename?: "Query";
  komentariZaTrening: Array<Maybe<Komentar>>;
  login?: Maybe<LoggedInUser>;
  komentariZaOdobrenje?: Maybe<Array<Maybe<Komentar>>>;
  sale?: Maybe<Array<Maybe<Sala>>>;
  treninzi?: Maybe<Array<Maybe<Trening>>>;
  statistika?: Maybe<Array<Maybe<Statistika>>>;
  trening?: Maybe<Trening>;
  pregledRezervacija?: Maybe<Array<Maybe<Rezervacija>>>;
};

export type QueryKomentariZaTreningArgs = {
  idTrening?: InputMaybe<Scalars["Int"]>;
};

export type QueryLoginArgs = {
  username: Scalars["String"];
  password: Scalars["String"];
};

export type QueryTreninziArgs = {
  filter?: InputMaybe<Scalars["String"]>;
  cenaOd?: InputMaybe<Scalars["Int"]>;
  cenaDo?: InputMaybe<Scalars["Int"]>;
  sort?: InputMaybe<Scalars["String"]>;
};

export type QueryStatistikaArgs = {
  datumOd?: InputMaybe<Scalars["String"]>;
  datumDo?: InputMaybe<Scalars["String"]>;
};

export type QueryTreningArgs = {
  idTrening: Scalars["Int"];
};

export type QueryPregledRezervacijaArgs = {
  korpa: Scalars["Boolean"];
};

export type Mutation = {
  __typename?: "Mutation";
  kreirajKomentar: Scalars["Boolean"];
  register: Scalars["Boolean"];
  obradiKomentar: Scalars["Boolean"];
  kreirajSalu: Scalars["Boolean"];
  obrisiSalu: Scalars["Boolean"];
  kreirajTrening: Scalars["Boolean"];
  izmeniTrening: Scalars["Boolean"];
  dodajTermin: Scalars["Boolean"];
  korpa: Scalars["Boolean"];
  obradiKorpu: Scalars["Boolean"];
};

export type MutationKreirajKomentarArgs = {
  idTrening: Scalars["Int"];
  ocena: Scalars["Int"];
  anonimno: Scalars["String"];
  tekst: Scalars["String"];
};

export type MutationRegisterArgs = {
  ime: Scalars["String"];
  datumRodjenja: Scalars["String"];
  adresa: Scalars["String"];
  lozinka: Scalars["String"];
  prezime: Scalars["String"];
  korisnickoIme: Scalars["String"];
  brojTelefona: Scalars["String"];
  email: Scalars["String"];
};

export type MutationObradiKomentarArgs = {
  idKomentar: Scalars["Int"];
  odobreno: Scalars["Boolean"];
};

export type MutationKreirajSaluArgs = {
  kapacitet: Scalars["Int"];
  oznaka: Scalars["String"];
};

export type MutationObrisiSaluArgs = {
  idSala: Scalars["Int"];
};

export type MutationKreirajTreningArgs = {
  cena: Scalars["Int"];
  nivo: Scalars["String"];
  trajanje: Scalars["Int"];
  trener: Scalars["String"];
  vrsta: Scalars["String"];
  opis: Scalars["String"];
  naziv: Scalars["String"];
};

export type MutationIzmeniTreningArgs = {
  idTreninga: Scalars["Int"];
  cena: Scalars["Int"];
  nivo: Scalars["String"];
  trajanje: Scalars["Int"];
  trener: Scalars["String"];
  vrsta: Scalars["String"];
  opis: Scalars["String"];
  naziv: Scalars["String"];
};

export type MutationDodajTerminArgs = {
  idTreninga: Scalars["Int"];
  idSala: Scalars["Int"];
  vreme: Scalars["String"];
};

export type MutationKorpaArgs = {
  idTermina: Scalars["Int"];
};

export type MutationObradiKorpuArgs = {
  prihvaceno: Scalars["Boolean"];
};
