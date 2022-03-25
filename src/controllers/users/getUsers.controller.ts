/* eslint no-param-reassign: 0 */

import { Request, Response } from 'express';

import { userDB } from '../../configs';
import * as types from '../../typings/createdTypes';

const getUsersController = (req: Request, res: Response) => {
  const listUsersWithoutPassword: types.userWithoutPassType[] = JSON.parse(
    JSON.stringify(userDB)
  );

  listUsersWithoutPassword.forEach((usr) => delete usr.password);

  res.status(200).json(listUsersWithoutPassword);
};

export default getUsersController;
