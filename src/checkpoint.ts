import { IContext } from "./context";

export class Checkpoint {
  constructor(public context: IContext, public name: string) {
    this.context = context;
    this.name = name;
  }

  success(msg: string) {
    this.baseCheck("success", msg);
  }

  warn(msg: string) {
    this.baseCheck("warn", msg);
  }

  error(msg: string) {
    this.baseCheck("error", msg);
  }

  // log 普通信息检查、日志打印
  log(msg: string) {
    this.baseCheck("log", msg);
  }

  // info 关键信息检查
  info(msg: string) {
    this.baseCheck("info", msg);
  }

  private baseCheck(type: string, msg: string) {
    const message = `[${this.name}] ${type}: ${msg.slice(0, 300)}`;
    this.context.report.push({
      message,
      type,
    });
    console.log(message);
  }
}
