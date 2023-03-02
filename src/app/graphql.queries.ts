import { gql } from "apollo-angular";

const KREIRAJ_KOMENTAR = gql`
  mutation kreirajKomentar(
    $idTrening: Int!
    $ocena: Int!
    $anonimno: String!
    $tekst: String!
  ) {
    kreirajKomentar(
      idTrening: $idTrening
      ocena: $ocena
      anonimno: $anonimno
      tekst: $tekst
    )
  }
`;

const CREATE_TRAINING = gql`
  mutation createTraining(
    $prices: Int!
    $levelTraining: String!
    $trainingDuration: Int!
    $trainer: String!
    $trainingKind: String!
    $description: String!
    $name: String!
    $photo: String
  ) {
    createTraining(
      prices: $prices
      levelTraining: $levelTraining
      trainingDuration: $trainingDuration
      trainer: $trainer
      trainingKind: $trainingKind
      description: $description
      name: $name
      photo: $photo
    )
  }
`;

const IZMENI_TRENING = gql`
  mutation izmeniTrening(
    $idTreninga: Int!
    $cena: Int!
    $nivo: String!
    $trajanje: Int!
    $trener: String!
    $vrsta: String!
    $opis: String!
    $naziv: String!
    $slika: String
  ) {
    izmeniTrening(
      idTreninga: $idTreninga
      cena: $cena
      nivo: $nivo
      trajanje: $trajanje
      trener: $trener
      vrsta: $vrsta
      opis: $opis
      naziv: $naziv
      slika: $slika
    )
  }
`;

const OBRADI_KOMENTAR = gql`
  mutation obradiKomentar($idKomentar: Int!, $odobreno: Boolean!) {
    obradiKomentar(idKomentar: $idKomentar, odobreno: $odobreno)
  }
`;

const CREATE_WORKOUTROOM = gql`
  mutation createWorkoutRoom($capacity: Int!, $name: String!) {
    createWorkoutRoom(capacity: $capacity, name: $name)
  }
`;

const DODAJ_TERMIN = gql`
  mutation dodajTermin($idTreninga: Int!, $idSala: Int!, $vreme: String!) {
    dodajTermin(idTreninga: $idTreninga, idSala: $idSala, vreme: $vreme)
  }
`;

const KORPA = gql`
  mutation korpa($idTermina: Int!, $brojBodova: Int!) {
    korpa(idTermina: $idTermina, brojBodova: $brojBodova)
  }
`;

const OBRADI_ZAHTEV_ZA_KARTICU = gql`
  mutation obradiZahtevZaKarticu($obrada: Boolean!, $idKorisnik: Int!) {
    obradiZahtevZaKarticu(obrada: $obrada, idKorisnik: $idKorisnik)
  }
`;

const OBRADI_KORPU = gql`
  mutation obradiKorpu($prihvaceno: Boolean!) {
    obradiKorpu(prihvaceno: $prihvaceno)
  }
`;

const OBRISI_SALU = gql`
  mutation obrisiSalu($idSala: Int!) {
    obrisiSalu(idSala: $idSala)
  }
`;

const REGISTER = gql`
  mutation register(
    $dateBirth: String!
    $adress: String!
    $password: String!
    $name: String!
    $lastName: String!
    $username: String!
    $phoneNumber: String!
    $email: String!
  ) {
    register(
      dateBirth: $dateBirth
      adress: $adress
      password: $password
      name: $name
      lastName: $lastName
      username: $username
      phoneNumber: $phoneNumber
      email: $email
    )
  }
`;

const LOGIN = gql`
  query login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      token
      username
      email
      authorities
    }
  }
`;

const KOMENTARI_ZA_TRENING = gql`
  query komentariZaTrening($idTrening: Int!) {
    komentariZaTrening(idTrening: $idTrening) {
      id
      anoniman
      ocena
      tekst
      vreme
      korisnik {
        ime
        prezime
      }
      statusKomentara {
        id
        naziv
      }
      trening {
        id
      }
    }
  }
`;

const KOMENTARI_ZA_ODOBRENJE = gql`
  query komentariZaOdobrenje {
    komentariZaOdobrenje {
      id
      anoniman
      ocena
      tekst
      vreme
      korisnik {
        ime
        prezime
      }
      statusKomentara {
        id
        naziv
      }
      trening {
        id
      }
    }
  }
`;



const SALE = gql`
  query sale {
    sale {
      id
      kapacitet
      oznaka
      terminOdrzavanjaTreningas {
        id
        vreme
      }
    }
  }
`;

const TRAININGS = gql`
  query trainings($filter: String, $priceFrom: Int, $priceTo: Int, $sort: String) {
    trainings(filter: $filter, priceFrom: $priceFrom, priceTo: $priceTo, sort: $sort) {
      id
      prices
      name
      levelTraining
      description
      photo
      trainingDuration
      trainer
      trainingKind
      comments {
        id
      }
      trainingSchedules {
        id
        dateTime
      }
      trainingType {
        id
        name
        description
      }
      wishs {
        id
      }
    }
  }
`;

const STATISTIKA = gql`
  query statistika($datumOd: String, $datumDo: String) {
    statistika(datumOd: $datumOd, datumDo: $datumDo) {
      idTreninga
      brojZakazivanja
      zarada
      trener
      nazivTreninga
    }
  }
`;

const TRENING = gql`
  query trening($idTrening: Int!) {
    trening(idTrening: $idTrening) {
      id
      cena
      naziv
      nivoTreninga
      opis
      slika
      trajanjeTreninga
      trener
      vrstaTreninga
      komentars {
        id
      }
      terminOdrzavanjaTreningas {
        id
        vreme
        sala {
          oznaka
        }
      }
      tipTreningas {
        id
        ime
        opis
      }
      zeljas {
        id
      }
    }
  }
`;

const PREGLED_REZERVACIJA = gql`
  query pregledRezervacija($korpa: Boolean!) {
    pregledRezervacija(korpa: $korpa) {
      id
      potvrda
      terminOdrzavanjaTreninga {
        vreme
        sala {
          oznaka
        }
        trening {
          naziv
        }
      }
    }
  }
`;

const PROFIL = gql`
  query profil {
    profil {
      id
      name
      lastName
      email
      adress
      phoneNumber
      dateBirth
      username
    }
  }
`;
const USER = gql`
  query user($idUser: Int!) {
    user (idUser: $idUser){
      name
      lastName
      email
      adress
      phoneNumber
      dateBirth
      username
    }
  }
`;
const ALL_USERS = gql`
query allUsers{
  allUsers{
    name
    lastName
    email
    adress
    phoneNumber
    dateBirth
    id
  }
}
`;

const EDIT_USER = gql`
  mutation editUser(
    $idUser: Int!
    $name: String!
    $lastName: String!
    $email: String!
    $adress: String!
    $phoneNumber: String!
    $dateBirth: String!
    $username: String!
  ) {
    editUser(
      idUser: $idUser
      name: $name
      lastName: $lastName
      email: $email
      adress: $adress
      phoneNumber: $phoneNumber
      dateBirth: $dateBirth
      username: $username
    )
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($idUser: Int!) {
    deleteUser(idUser: $idUser)
  }
`;

const ZAHTEVI_ZA_KARTICU = gql`
  query zahteviZaKarticu {
    zahteviZaKarticu {
      id
      ime
      prezime
      email
      adresa
      brojTelefona
      datumRodjenja
      korisnickoIme
    }
  }
`;

const ZAHTEVAJ_KARTICU = gql`
  query zahtevajKarticu {
    zahtevajKarticu {
      poruka
    }
  }
`;

export {
  ZAHTEVI_ZA_KARTICU,
  ZAHTEVAJ_KARTICU,
  REGISTER,
  LOGIN,
  ALL_USERS,
  USER,
  EDIT_USER,
  DELETE_USER,
  KOMENTARI_ZA_TRENING,
  KOMENTARI_ZA_ODOBRENJE,
  TRAININGS,
  STATISTIKA,
  TRENING,
  PREGLED_REZERVACIJA,
  KREIRAJ_KOMENTAR,
  OBRADI_KOMENTAR,
  CREATE_WORKOUTROOM,
  OBRISI_SALU,
  CREATE_TRAINING,
  IZMENI_TRENING,
  DODAJ_TERMIN,
  KORPA,
  OBRADI_KORPU,
  PROFIL,
  OBRADI_ZAHTEV_ZA_KARTICU,
};
