export interface RootState {
  [key: string]: never;
}

export namespace Api {
  export namespace Auth {
    export namespace Requests {
      export interface LoginRequest {
        username: string | null;
        password: string | null;
      }
    }
    export namespace Responses {
      export interface JWTResponse {
        access_token: string;
        expires_in: number;
      }
    }
  }
  export namespace User {
    export namespace Requests {
      export interface UserEditRequest {
        firstName: string | null;
        lastName: string | null;
        email: string | null;
        phone: string | null;
        birthDate: string;
      }
    }
    export namespace Responses {
      export interface User {
        id: string;
        firstName: string | null;
        lastName: string | null;
        email: string | null;
        phone: string | null;
        birthDate: string;
      }
    }
    export namespace Store {
      export interface UsersMapped {
        [key: string]: User.Responses.User;
      }
      export interface State {
        users: UsersMapped;
        currentUser: User.Responses.User | null;
        dialog: boolean;
        editedUser: boolean | string;
      }
    }
  }
}
