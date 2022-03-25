import * as dotenv from 'dotenv';
dotenv.config();
// const jwtSecret: Secret | GetPublicKeyOrSecret = process.env.JWT_SECRET;
const jwtSecret = process.env.JWT_SECRET;
const jwtTokenExpiration = process.env.JWT_TOKEN_EXPIRATION;
const userDB = [];
export { jwtSecret, jwtTokenExpiration, userDB };
