import * as dotenv from 'dotenv';

import * as types from '../typings/createdTypes';

dotenv.config();

// const jwtSecret: Secret | GetPublicKeyOrSecret = process.env.JWT_SECRET;
const jwtSecret: any = process.env.JWT_SECRET;

const jwtTokenExpiration: any = process.env.JWT_TOKEN_EXPIRATION;

const userDB: types.userType[] = [];

export { jwtSecret, jwtTokenExpiration, userDB };
