import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  createParamDecorator,
} from '@nestjs/common';
import { User } from '@prisma/client';

/**
 * Custom decorator that retrieves the user from the request object.
 * @param data - Additional data (unused).
 * @param ctx - The execution context.
 * @returns The user associated with the request.
 * @example
 * ```typescript
 @Get('example')
 async example(@GetRequestUser() user: UserDocument | null) {
   return user;
 }
 ```
 */
export const GetRequestUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest() as Request & {
      existingUser: User;
    };
    const user = req.existingUser as User;

    return user;
  },
);

/**
 * Verifies if a user is valid and meets the necessary criteria.
 *
 * @param user - The user document to be verified.
 * @returns The verified user document.
 * @throws {HttpException} If the user is not found, has no plan, or the plan has expired.
 */
export const verifyUser = (user: User | null): User => {
  if (!user) {
    throw new HttpException(
      {
        message: 'User not found',
      },
      HttpStatus.NOT_FOUND,
    );
  }

  return user;
};
