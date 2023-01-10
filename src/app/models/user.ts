export class User {
  public id?: number;
  public userId!: string;
  public firstName!: string;
  public lastName!: string;
  public username!: string;
  public password!: string;
  public email!: string;
  public profileImage!: string;
  public lastLoginDate!: Date;
  public lastLoginDateDisplay!: Date;
  public joinDate!: Date;
  public role!: string;
  public active!: boolean;
  public notLocked!: boolean;
  public authorities!: [];

  contructor() {
    this.firstName = '';
    this.lastName = '';
    this.username = '';
    this.email = '';
    this.active = false;
    this.notLocked = false;
    this.role = '';
    this.authorities = [];
  }
}
