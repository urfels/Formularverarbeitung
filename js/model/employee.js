class Employee extends User {

  constructor(id, name, email, role, lastModified){
    super(id, name, email);
    this.role = role;
    this.lastModified = lastModified;
  }
}
