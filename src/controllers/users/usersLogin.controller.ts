import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { jwtSecret, jwtTokenExpiration, userDB } from '../../configs';
import * as types from '../../typings/createdTypes';

const usersLoginController = async (req: Request, res: Response) => {
  const data = req.body;

  const user: types.userType | undefined = userDB.find(
    (usr) => usr.username === data.username
  );

  if (!user) {
    return res.status(401).json({ message: 'Wrong credentials. Try again!' });
  }

  const match = await bcrypt.compare(data.password, user.password);

  if (!match) {
    return res.status(401).json({ message: 'Wrong credentials. Try again!' });
  }

  const token = jwt.sign(
    {
      username: data.username,
      password: user.password,
    },
    jwtSecret,
    { expiresIn: jwtTokenExpiration }
  );

  return res.status(200).json({ accessToken: token });
};

export default usersLoginController;
