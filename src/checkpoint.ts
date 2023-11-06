import { IContext } from "./context";

export class Checkpoint {
  constructor(public context: IContext, public name: string) {
    this.context = context;
    this.name = name;
  }

  success(msg: string) {
    const message = `[${this.name}] success: ${msg.slice(0, 300)}`;
    this.context.report.push(message);
    console.log(message);
  }

  error(msg: string) {
    const message = `[${this.name}] error: ${msg.slice(0, 300)}`;
    this.context.report.push(message);
    console.log(message);
  }

  info(msg: string) {
    const message = `[${this.name}] info: ${msg.slice(0, 300)}`;
    this.context.report.push(message);
    console.log(message);
  }
}
