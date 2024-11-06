export namespace Login {
  export type Request = {
    name: string;
    password: string;
  };

  export type Response = {
    token: string;
  };
}
