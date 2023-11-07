import path from "path";
import { Browser } from "puppeteer-core";
import { createAndWriteFileSync } from "./tools";

export interface IContext {
  browser: Browser;
  report: {
    type: string;
    message: string;
  }[];
  reportPrint: () => void;
}

const context: IContext = {
  browser: null,
  report: [],
  reportPrint() {
    createAndWriteFileSync(
      path.resolve(__dirname, "../report.txt"),
      this.report.map((item) => item.message).join("\n")
    );
    createAndWriteFileSync(
      path.resolve(__dirname, "../key-information.txt"),
      this.report
        .filter((item) => ["info", "error", "warn"].includes(item.type))
        .map((item) => item.message)
        .join("\n")
    );
  },
};

export default context;
