export default class AccountUser {
  constructor(name, email, phone, time_zone, password, user_type) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.time_zone = time_zone;
    this.password = password;
    this.user_type = user_type;
  }
}