export class AppContstants {
  public static get serverBase(): string { return "https://oneproject.azurewebsites.net/" }

  public static get loginBase(): string { return this.serverBase + "login"}

  public static get signinBase(): string { return this.serverBase + "sigin" }

  public static get getTasks(): string { return this.serverBase + "obter" }

  public static get save(): string { return this.serverBase + "salvar" }

  public static get search(): string { return this.serverBase + "pesquisar" }
}
