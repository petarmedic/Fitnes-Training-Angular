export class User {
  idUser : number;
  dateBirth: String;
  adress: String;
  password: String;
  password2: String;
  name: String;
  lastName: String;
  username: String;
  phoneNumber: String;
  email: String;

  constructor(args: any = {}) {
    this.idUser = args.idUser;
    this.dateBirth = args.dateBirth;
    this.email = args.email;
    this.name = args.name;
    this.password = args.password;
    this.password2 = args.lozinka2;
    this.lastName = args.lastName;
    this.username = args.username;
    this.adress = args.adress1;
    this.phoneNumber = args.phoneNumber;
  }
}
