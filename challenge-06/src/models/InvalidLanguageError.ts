import { DomainError } from "../utils/DomainError.ts";
import { Errors } from "./Errors.ts";

export class InvalidLanguageError extends DomainError {
  constructor() {
    super(Errors.INVALID_LANGUAGE);
  }
}
