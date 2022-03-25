import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { userDB } from '../../configs';
import * as types from '../../typings/createdTypes';

const usersRegisterController = async (req: Request, res: Response) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const user: types.userType = {
    id: uuidv4(),
    ...req.body,
    password: hashedPassword,
    playlist: {},
  };

  const userWithoutPassword: types.userWithoutPassType = JSON.parse(
    JSON.stringify(user)
  );

  delete userWithoutPassword.password;

  userDB.push(user);

  res.status(201).json(userWithoutPassword);
};

export default usersRegisterController;
