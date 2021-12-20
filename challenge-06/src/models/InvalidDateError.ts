import { DomainError } from "../utils/DomainError.ts";
import { Errors } from "./Errors.ts";

export class InvalidDateError extends DomainError {
  constructor() {
    super(Errors.INVALID_DATE);
  }
}
