import { Errors } from "../models/Errors.ts";

export class DomainError extends Error {
  constructor(type: Errors) {
    super(type);
  }

  getType(): Errors {
    return this.message as Errors;
  }
}
