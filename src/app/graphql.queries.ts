import { gql } from "apollo-angular";

const CREATE_COMMENT = gql`
  mutation createComment(
    $idTraining: Int!
    $rate: Int!
    $anonymous: String!
    $text: String!
  ) {
    createComment(
      idTraining: $idTraining
      rate: $rate
      anonymous: $anonymous
      text: $text
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

const EDIT_TRAINING = gql`
  mutation editTraining(
    $idTraining: Int!
    $prices: Int!
    $levelTraining: String!
    $trainingDuration: Int!
    $trainer: String!
    $trainingKind: String!
    $description: String!
    $name: String!
    $photo: String
  ) {
    editTraining(
      idTraining: $idTraining
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

const PROCCES_COMMENT = gql`
  mutation processComment($idComment: Int!, $approved: Boolean!) {
    processComment(idComment: $idComment, approved: $approved)
  }
`;

const CREATE_WORKOUTROOM = gql`
  mutation createWorkoutRoom($capacity: Int!, $name: String!) {
    createWorkoutRoom(capacity: $capacity, name: $name)
  }
`;

const CREATE_TRAINING_SCHEDULE = gql`
  mutation createTrainingSchedule($trainingId: Int!, $workoutRoomId: Int!, $dateTime: String!) {
    createTrainingSchedule(trainingId: $trainingId, workoutRoomId: $workoutRoomId, dateTime: $dateTime)
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

const DELETE_WORKOUT_ROOM = gql`
  mutation deleteWorkoutRoom($idWorkoutRoom: Int!) {
    deleteWorkoutRoom(idWorkoutRoom: $idWorkoutRoom)
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

const COMMENT_FOR_TRAININGS = gql`
  query commentForTraining($idTraining: Int!) {
    commentForTraining(idTraining: $idTraining) {
      id
      anonymous
      rate
      text
      datePost
      user {
        name
        lastName
      }
      statusComments {
        id
        name
      }
      training {
        id
      }
    }
  }
`;

const COMMENT_FOR_APPROVAL = gql`
  query commentForApproval {
    commentForApproval {
      id
      anonymous
      rate
      text
      datePost
      user {
        name
        lastName
      }
      statusComments {
        id
        name
      }
      training {
        id
      }
    }
  }
`;



const WORKOUT_ROOMS = gql`
  query workoutRooms {
    workoutRooms {
      id
      capacity
      name
      trainingSchedule {
        id
        dateTime
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

const TRAINING = gql`
  query training($idTraining: Int!) {
    training(idTraining: $idTraining) {
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
        workoutRoom {
          name
        }
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
  COMMENT_FOR_TRAININGS,
  COMMENT_FOR_APPROVAL,
  TRAININGS,
  STATISTIKA,
  TRAINING,
  PREGLED_REZERVACIJA,
  CREATE_COMMENT,
  PROCCES_COMMENT,
  CREATE_WORKOUTROOM,
  WORKOUT_ROOMS,
  DELETE_WORKOUT_ROOM,
  CREATE_TRAINING,
  EDIT_TRAINING,
  CREATE_TRAINING_SCHEDULE,
  KORPA,
  OBRADI_KORPU,
  PROFIL,
  OBRADI_ZAHTEV_ZA_KARTICU,
};
