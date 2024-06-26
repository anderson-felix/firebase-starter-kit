import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import { LocaleError } from '@shared/errors/LocaleError';

interface TokenPayload {
  int: number;
  exp: number;
  sub: string;
}

const adminAuth = async (req: Request) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new LocaleError('missingToken');
  }

  const [, token] = authHeader.split(' ');
  let id;

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;
    id = sub;
  } catch {
    throw new LocaleError('invalidToken');
  }

  // const checkIn = Container.get(CheckInAdminService);
  // req.admin = await checkIn.execute(id);

  // if (req.admin.disabled_at) throw new LocaleError('userTemporarilyDisabled');
};

export default async function authAdmin(req: Request, _: Response, next: NextFunction) {
  await adminAuth(req);

  next();
}
