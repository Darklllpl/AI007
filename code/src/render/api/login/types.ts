export namespace Login {
  export type Request = {
    loginType:string;
    password: string;
    phone:string;
    verificationCode:string;
  };

  export type Response = {
    code:string;
    msg:string;
    data?:object;
  };
}

export namespace GetVerificationCode {
  export type Request = {
    phone:string;
  };

  export type Response = {
    message: string;
    code:string;
    data:object;
  };
}

export namespace TestVerificationCode {
  export type Request = {
    verificationCode:string;
  };

  export type Response = {
    message: string;
    code:string;
  };
}

export namespace Cancel{
  export type Request={

  }

  export type Response={
    code:string;
    msg:string;
    data:string;
  }
}
