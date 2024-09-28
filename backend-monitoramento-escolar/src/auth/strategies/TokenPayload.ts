import { User } from '@prisma/client';

export class TokenPayload {
  email: User['email'];
  type: User['type'];
}
