import { ObjectLiteral } from 'typeorm';
import { logger } from '../utils/instance';

export type ErrorMessage = string | ObjectLiteral;
export type ErrorCode =
  | 'bad-request'
  | 'not-found'
  | 'forbidden'
  | 'un-authorized'
  | 'internal-server';
export type ErrorConstraint = string | string[];

export class Failure {
  constructor(
    public statusCode: number,
    public message: ErrorMessage,
    public errorCode: ErrorCode,
    public constraint?: ErrorConstraint,
  ) {
    logger.error(message);
  }

  static badRequest(
    message: ErrorMessage,
    constraint?: ErrorConstraint,
  ): Failure {
    return new Failure(400, message, 'bad-request', constraint);
  }

  static notFound(
    message: ErrorMessage = '404 Not found!',
    constraint?: ErrorConstraint,
  ): Failure {
    return new Failure(404, message, 'not-found', constraint);
  }

  static unAuthorized(message: ErrorMessage = 'Unauthorized'): Failure {
    return new Failure(401, message, 'un-authorized');
  }

  static forbidden(
    message: ErrorMessage = 'Forbidden',
    constraint?: ErrorConstraint,
  ): Failure {
    return new Failure(403, message, 'forbidden', constraint);
  }

  static internalServer(): Failure {
    return new Failure(500, 'Internal server error', 'internal-server');
  }
}
