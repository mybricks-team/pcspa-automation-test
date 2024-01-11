import path from "path";
import { Browser, Protocol } from "puppeteer-core";
import { createAndWriteFileSync } from "./tools";

export interface IContext {
  browser: Browser;
  cookies: Protocol.Network.CookieParam[];
  report: {
    type: string;
    message: string;
  }[];
  reportPrint: () => void;
}

const context: IContext = {
  browser: null,
  cookies: [
    {
      name: "mybricks-login-user",
      value: `{"id":483208459444293,"email":"wudi27@kuaishou.com","fingerprint":"dd7d202d917b49e3cd55cc2f72621cfb"}`,
      domain: "test.mybricks.world", // Cookie 的域
      path: "/", // Cookie 的路径
    },
  ],
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
