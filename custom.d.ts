import * as types from './src/typings/createdTypes';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SECRET_KEY: string;
    }
  }
}

declare global {
  namespace Express {
    interface Request {
      userAuthenticated?: types.userType;
    }
  }
}
