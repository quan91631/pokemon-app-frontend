import { InjectionToken, Provider } from '@angular/core';

export interface Environment {
  domain: string;
  server: string;
  env: 'production' | 'staging' | 'development';
}

export const ENVIRONMENT = new InjectionToken<Environment>('ENVIRONMENT');

export const DEV_ENV: Environment = {
  domain: 'http://localhost:4200',
  server: 'http://localhost:3000/api',
  env: 'development',
};

export const provideEnvironment = (environments?: {
  dev?: Environment;
  production: Environment;
  staging: Environment;
}): Provider => {
  let env = environments?.dev || DEV_ENV;
  
  return {
    provide: ENVIRONMENT,
    useValue: env,
  };
};
