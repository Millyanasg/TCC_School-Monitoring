import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
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
  @IsUrl()
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
  // database
  @IsString()
  @IsNotEmpty()
  DB_PORT: string;

  @IsString()
  @IsNotEmpty()
  DB_HOST: string;
  @IsString()
  @IsNotEmpty()
  TYPEORM_HOST: string;
  @IsString()
  @IsNotEmpty()
  TYPEORM_PORT: string;
  @IsString()
  @IsNotEmpty()
  TYPEORM_USERNAME: string;
  @IsString()
  @IsNotEmpty()
  TYPEORM_PASSWORD: string;
  @IsString()
  @IsNotEmpty()
  TYPEORM_DATABASE: string;

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
  @IsNumber()
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
