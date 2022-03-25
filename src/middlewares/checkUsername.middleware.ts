import { NextFunction, Request, Response } from 'express';

import { userDB } from '../configs';

const checkUsername = (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.body;

  const findUser = userDB.find((user) => user.username === username);

  if (findUser) {
    res.status(422).json({ message: 'You can not use this username.' });
  } else next();
};

export default checkUsername;
