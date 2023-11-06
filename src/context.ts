import path from "path";
import { Browser } from "puppeteer-core";
import { createAndWriteFileSync } from "./tools";

export interface IContext {
  browser: Browser;
  report: string[];
  reportPrint: () => void;
}

const context: IContext = {
  browser: null,
  report: [],
  reportPrint() {
    createAndWriteFileSync(
      path.resolve(__dirname, "../report.txt"),
      this.report.join("\n")
    );
  },
};

export default context;
