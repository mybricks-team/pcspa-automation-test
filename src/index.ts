import puppeteer from "puppeteer-core";
import baseContext, { IContext } from "./context";
import { pcCaseRun } from "./pc-cases";
import { cdmCaseRun } from "./cdm-cases";

const appType = process.argv
  .find((item) => item.includes("--appType"))
  .split("--apptype=")[1];

(async () => {
  // 创建一个 Puppeteer 浏览器实例
  const browser = await puppeteer.launch({
    // chrome://version/
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", // 在 chrome://version/ 可以找到可执行文件的路径
    headless: false,
  });

  const context = {
    ...baseContext,
    browser,
  } as IContext;

  try {
    if (appType === "pc") await pcCaseRun(context);
    if (appType === "cdm") await cdmCaseRun(context);

    // 关闭浏览器
    await browser.close();
  } catch (e) {
    console.error(e);
  } finally {
    // 存储日志
    context.reportPrint();
  }
})();
