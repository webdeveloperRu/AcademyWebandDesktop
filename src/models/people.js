export default class People {
  constructor(name, email, tags, address, granted_access, nota, is_subscribe, is_active) {
    this.name = name;
    this.email = email;
    this.tags = tags;
    this.address = address;
    this.nota = nota;
    this.is_subscribe = is_subscribe;
    this.is_active = is_active;
    this.granted_access = granted_access;
  }
}