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

const SHOPPING_CART = gql`
  mutation shoppingCart($idTrainingSchedule: Int!, $numberPoint: Int!) {
    shoppingCart(idTrainingSchedule: $idTrainingSchedule, numberPoint: $numberPoint)
  }
`;

const PROCESS_REQUEST_FOR_CARD = gql`
  mutation processCard($process: Boolean!, $idUser: Int!) {
    processCard(process: $process, idUser: $idUser)
  }
`;

const PROCESS_SHOPPING_CART = gql`
  mutation processShoppingCart($accepted: Boolean!) {
    processShoppingCart(accepted: $accepted)
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
  query trainings($priceFrom: Int, $priceTo: Int) {
    trainings(priceFrom: $priceFrom, priceTo: $priceTo) {
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

const STATISTICS = gql`
  query statistics($dateFrom: String, $dateTo: String) {
    statistics(dateFrom: $dateFrom, dateTo: $dateTo) {
      idTraining
      numberReservation
      earnings
      trainer
      nameTraining
      date
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

const VIEW_RESERVATION = gql`
  query viewReservation($shoppingCart: Boolean!) {
    viewReservation(shoppingCart: $shoppingCart) {
      id
      confirmation
      point
      trainingSchedule {
        dateTime
        workoutRoom {
          name
        }
        training {
          name
          prices
          trainingDuration
        }
      }
    }
  }
`;

const DELETE_RESERVATION = gql`
  mutation deleteReservation($idReservation: Int!) {
    deleteReservation(idReservation: $idReservation)
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
      loyaltyCard{
        point
      }
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
      loyaltyCard{
        point
      }
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

const REQUESR_FOR_CARD = gql`
  query requestForCard {
    requestForCard {
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

const REQUEST_CARD = gql`
  query requestCard {
    requestCard {
      message
    }
  }
`;

export {
  REQUESR_FOR_CARD,
  REQUEST_CARD,
  REGISTER,
  LOGIN,
  ALL_USERS,
  USER,
  EDIT_USER,
  DELETE_USER,
  COMMENT_FOR_TRAININGS,
  COMMENT_FOR_APPROVAL,
  TRAININGS,
  STATISTICS,
  TRAINING,
  VIEW_RESERVATION,
  CREATE_COMMENT,
  PROCCES_COMMENT,
  CREATE_WORKOUTROOM,
  WORKOUT_ROOMS,
  DELETE_WORKOUT_ROOM,
  CREATE_TRAINING,
  EDIT_TRAINING,
  CREATE_TRAINING_SCHEDULE,
  SHOPPING_CART,
  PROCESS_SHOPPING_CART,
  PROFIL,
  PROCESS_REQUEST_FOR_CARD,
  DELETE_RESERVATION
};
