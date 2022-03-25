/* eslint consistent-return: 0 */

import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { jwtSecret, userDB } from '../configs';

const authUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(400).json({ message: 'missing header authorization.' });
  }

  const token = req.headers.authorization.split(' ')[1];

  jwt.verify(token, jwtSecret, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const userAuthenticated = userDB.find(
      (usr) => usr.username === decoded.username
    );

    req.userAuthenticated = userAuthenticated;
  });
  return next();
};

export default authUser;
