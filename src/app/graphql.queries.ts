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

const KREIRAJ_TRENING = gql`
  mutation kreirajTrening(
    $cena: Int!
    $nivo: String!
    $trajanje: Int!
    $trener: String!
    $vrsta: String!
    $opis: String!
    $naziv: String!
    $slika: String
  ) {
    kreirajTrening(
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

const KREIRAJ_SALU = gql`
  mutation kreirajSalu($kapacitet: Int!, $oznaka: String!) {
    kreirajSalu(kapacitet: $kapacitet, oznaka: $oznaka)
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
    $datumRodjenja: String!
    $adresa: String!
    $lozinka: String!
    $ime: String!
    $prezime: String!
    $korisnickoIme: String!
    $brojTelefona: String!
    $email: String!
  ) {
    register(
      datumRodjenja: $datumRodjenja
      adresa: $adresa
      lozinka: $lozinka
      ime: $ime
      prezime: $prezime
      korisnickoIme: $korisnickoIme
      brojTelefona: $brojTelefona
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

const TRENINZI = gql`
  query treninzi($filter: String, $cenaOd: Int, $cenaDo: Int, $sort: String) {
    treninzi(filter: $filter, cenaOd: $cenaOd, cenaDo: $cenaDo, sort: $sort) {
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
  KOMENTARI_ZA_TRENING,
  KOMENTARI_ZA_ODOBRENJE,
  SALE,
  TRENINZI,
  STATISTIKA,
  TRENING,
  PREGLED_REZERVACIJA,
  KREIRAJ_KOMENTAR,
  OBRADI_KOMENTAR,
  KREIRAJ_SALU,
  OBRISI_SALU,
  KREIRAJ_TRENING,
  IZMENI_TRENING,
  DODAJ_TERMIN,
  KORPA,
  OBRADI_KORPU,
  PROFIL,
  OBRADI_ZAHTEV_ZA_KARTICU,
};
