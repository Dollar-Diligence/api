import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as admin from 'firebase-admin';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Promise<any> => {
    const request = ctx.switchToHttp().getRequest();
    const token = request.headers.authorization?.split('Bearer ')[1];

    if (!token) {
      return null;
    }

    // Wrap user into a Promise
    return new Promise((resolve, reject) => {
      admin
        .auth()
        .verifyIdToken(token)
        .then((decodedToken) => resolve(decodedToken))
        .catch((error) => reject(error));
    });
  },
);
