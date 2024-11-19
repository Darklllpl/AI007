export namespace Login {
  export type Request = {
    loginType:string;
    password: string;
    phone:string;
    verificationCode:string;
  };

  export type Response = {
    token: string;
  };
}

export namespace GetVerificationCode {
  export type Request = {
    phone:string;
  };

  export type Response = {
    message: string;
    code:string;
  };
}
