export class HttpError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 404) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
}
