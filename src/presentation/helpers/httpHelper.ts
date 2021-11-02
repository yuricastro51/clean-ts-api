import { ServerError } from '../errors/serverError';
import { HttpResponse } from '../protocols/http';

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error.message
  };
};

export const serverError = (error: Error): HttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError(error.stack).message
  };
};

export const ok = (data: any): HttpResponse => {
  return {
    statusCode: 200,
    body: data
  };
};
