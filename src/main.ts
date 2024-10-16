import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Auth-project')
    .setDescription('Description for the auth-project')
    .setVersion('1.0')
    .addTag('auth')
    .build();

    const options: SwaggerDocumentOptions = {
      operationIdFactory: (
        controllerKey: string,
        methodKey: string
      ) => methodKey
    };

    const customOptions: SwaggerCustomOptions = {
      swaggerOptions: {
        persistAuthorization: true,
      },
      customSiteTitle: 'My API Docs',
    };
    
    const document = SwaggerModule.createDocument(app, config, options);

    SwaggerModule.setup('api', app, document, customOptions);
    await app.listen(3000);
  }
  bootstrap();
  
  export interface SwaggerDocumentOptions {
    include?: Function[];
    extraModels?: Function[];
    ignoreGlobalPrefix?: boolean;
    deepScanRoutes?: boolean;
    operationIdFactory?: (controllerKey: string, methodKey: string ) => string;
  }

  export interface ExpressSwaggerCustomOptions {
    explorer?: boolean;
    swaggerOptions?: Record<string, any>;
    customCss?: string;
    customCssUrl?: string;
    customJs?: string;
    customfavIcon?: string;
    swaggerUrl?: string;
    customSiteTitle?: string;
    validatorUrl?: string;
    url?: string;
    urls?: Record<'url' | 'name', string>[];
  }

  export interface FastifySwaggerCustomOptions {
    uiConfig?: Record<string, any>;
  }