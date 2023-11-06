import puppeteer from "puppeteer-core";
import baseContext, { IContext } from "./context";
import designerCheckout from "./designer-checkout";
import previewCheckout from "./preview-checkout";
import publishCheckout from "./publish-checkout";

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

  await designerCheckout(context);
  // await previewCheckout(context);
  await publishCheckout(context);

  context.reportPrint();

  // 关闭浏览器
  // await browser.close();
})();
