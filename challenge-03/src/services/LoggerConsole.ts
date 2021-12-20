import { Logger } from "./Logger.ts";

export class LoggerConsole implements Logger {
  public log(...data: unknown[]): void {
    console.log(...data);
  }
}
