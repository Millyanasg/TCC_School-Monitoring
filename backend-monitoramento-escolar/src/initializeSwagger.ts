import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

const getAnchor = (title: string, url: string) =>
  `<a href="${url}">${title}</a>`;

/**
 * Initializes Swagger documentation for the API backend.
 *
 * @param app - The INestApplication instance.
 * @param port - The port number or string where the backend application is running.
 * @param frontendUrl - An array of frontend URLs where the frontend application is running.
 * @param backendUrl - An array of backend URLs where the backend application is running.
 */
export function initializeSwagger(
  app: INestApplication<any>,
  port: string | number,
  serverUrl: string,
) {
  const config = new DocumentBuilder()
    .setTitle('Monitoramento Escolar API')
    .setDescription(
      `API documentation for the Monitoramento Escolar project. The API is used to manage schools, students, drivers, and parents. The API is used by the frontend application to manage the data and display it to the users. The API is used by the backend application to manage the data and display it to the users. The API is used by the backend application to manage the data and display it to the users. The API is used by the backend application to manage the data and display it to the users. The API is used by the backend application to manage the data and display it to the users. The API is used by the backend application to manage the data and display it to the users. The API is used by the backend application to manage the data and display it to the users. The API is used by the backend application to manage the data and display it to the users. The API is used by the backend application to manage the data and display it to the users. The API is used by the backend application to manage the data and display it to the users.`,
    )
    .setVersion('1.0')
    .addCookieAuth('refresh_token', {
      type: 'apiKey',
      in: 'cookie',
      name: 'refresh_token',
    })
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
      },
      'bearer',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const swaggerOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };

  SwaggerModule.setup('api/doc', app, document, swaggerOptions);
}
