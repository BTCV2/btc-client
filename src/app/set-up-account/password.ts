export class Password {
  private userName: string;
  private password: string;
  private role: string;
  private firstLogin: string;
  constructor(userName, newPassword, scope) {
    this.userName = userName;
    this.password = newPassword;
    this.role = scope;
    this.firstLogin = "N";
  }
}
