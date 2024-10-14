import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
}

class EnvironmentVariables {
  // APP
  @IsNumber()
  @IsNotEmpty()
  PORT: number;

  @IsString()
  @IsNotEmpty()
  SERVER_URL: string;

  // SEED
  @IsString()
  @IsOptional()
  'SEED.enabled': string;

  @IsString()
  @IsOptional()
  'SEED.admin.password': string;

  @IsString()
  @IsOptional()
  'SEED.admin.email': string;

  // node
  @IsEnum(['development', 'production'])
  @IsNotEmpty()
  NODE_ENV: 'development' | 'production';

  // jwt
  @IsString()
  @IsNotEmpty()
  JWT_SECRET: string;

  @IsString()
  @IsNotEmpty()
  JWT_EXPIRATION_TIME: string;

  @IsString()
  @IsNotEmpty()
  JWT_REFRESH_SECRET: string;

  @IsString()
  @IsNotEmpty()
  JWT_REFRESH_EXPIRATION_TIME: string;

  // bcrypt
  @IsNotEmpty()
  SALT_ROUNDS: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
