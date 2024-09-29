import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * A custom hook that applies the `AuthGuard` with the 'JwtStrategyUser' strategy.
 * This guard ensures that the user is authenticated using the JWT strategy for common users.
 *
 * @returns {ReturnType<typeof UseGuards>} The result of applying the `AuthGuard` with the specified strategy.
 *
 * @example
 * ```ts
 * import { Controller } from '@nestjs/common';
 * import { GuardCommonUser } from '@backend/auth/strategies/Guards';
 *
 * @Controller('example')
 * export class ExampleController {
 *  @Get()
 *  @GuardCommonUser()
 *  example() {
 *   return 'Hello, World!';
 *  }
 * }
 * ```
 */
export function GuardCommonUser() {
  return UseGuards(AuthGuard('JwtStrategyUser'));
}

/**
 * A custom hook that applies the `AuthGuard` with the 'JwtStrategyUser' strategy.
 * This guard ensures that the user is authenticated using the JWT strategy for common users.
 *
 * @returns {ReturnType<typeof UseGuards>} The result of applying the `AuthGuard` with the specified strategy.
 *
 * @example
 * ```ts
 * import { Controller } from '@nestjs/common';
 * import { GuardParentUser } from '@backend/auth/strategies/Guards';
 *
 * @Controller('example')
 * export class ExampleController {
 *  @Get()
 *  @GuardParentUser()
 *  example() {
 *   return 'Hello, World!';
 *  }
 * }
 * ```
 */
export function GuardParentUser() {
  return UseGuards(AuthGuard('JwtStrategyParent'));
}

/**
 * A custom hook that applies the `AuthGuard` with the 'JwtStrategyUser' strategy.
 * This guard ensures that the user is authenticated using the JWT strategy for common users.
 *
 * @returns {ReturnType<typeof UseGuards>} The result of applying the `AuthGuard` with the specified strategy.
 *
 * @example
 * ```ts
 * import { Controller } from '@nestjs/common';
 * import { GuardDriverUser } from '@backend/auth/strategies/Guards';
 *
 * @Controller('example')
 * export class ExampleController {
 *  @Get()
 *  @GuardDriverUser()
 *  example() {
 *   return 'Hello, World!';
 *  }
 * }
 * ```
 */
export function GuardDriverUser() {
  return UseGuards(AuthGuard('JwtStrategyDriver'));
}

/**
 * A custom hook that applies the `AuthGuard` with the 'JwtStrategyUser' strategy.
 * This guard ensures that the user is authenticated using the JWT strategy for common users.
 *
 * @returns {ReturnType<typeof UseGuards>} The result of applying the `AuthGuard` with the specified strategy.
 *
 * @example
 * ```ts
 * import { Controller } from '@nestjs/common';
 * import { GuardCommonUser } from '@backend/auth/strategies/Guards';
 *
 * @Controller('example')
 * export class ExampleController {
 *  @Get()
 *  @GuardAdminUser()
 *  example() {
 *   return 'Hello, World!';
 *  }
 * }
 * ```
 */
export function GuardAdminUser() {
  return UseGuards(AuthGuard('JwtStrategyAdmin'));
}
