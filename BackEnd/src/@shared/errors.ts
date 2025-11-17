export class AppError extends Error {
  errorCode: number;

  constructor(errorCode: number, errorMessage: string) {
    super(errorMessage);
    this.errorCode = errorCode;
  }
}
