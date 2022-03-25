import { NextFunction, Request, Response } from 'express';
import { AnySchema } from 'yup';

const validateBody =
  (usersSchema: AnySchema) =>
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const data = req.body;

    try {
      await usersSchema.validate(data);
      next();
    } catch (err: any) {
      res.status(400).json({ message: err.errors.join(', ') });
    }
  };

export default validateBody;
