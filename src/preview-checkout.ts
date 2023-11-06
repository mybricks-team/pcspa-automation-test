import { ConsoleMessage, HTTPResponse } from "puppeteer-core";
import { Checkpoint } from "./checkpoint";
import { IContext } from "./context";
import { getPage, getVersionFromStr } from "./tools";

export default async function previewCheckout(context: IContext) {
  const checkpoint = new Checkpoint(context, "preview");

  const { browser } = context;

  const consoleMessages: ConsoleMessage[] = [];
  const networkRequests: HTTPResponse[] = [];

  const designerPage = await getPage(browser, "index.html");

  if (!designerPage) {
    checkpoint.error("找不到设计页");
    return;
  }

  // 点击预览按钮
  await designerPage.click(
    "#root > div > div > div > div > button:nth-child(3)"
  );

  // 找到预览页
  const previewPage = await getPage(browser, "preview.html");

  if (!previewPage) {
    checkpoint.error("找不到预览页");
    return;
  }

  // 监听控制台消息
  previewPage.on("console", (msg) => consoleMessages.push(msg));
  // 监听页面的网络请求事件
  previewPage.on("response", (response) => networkRequests.push(response));

  previewPage.reload();

  // 等待一段时间以确保控制台输出已经收集
  await new Promise((resolve) => setTimeout(resolve, 10000));

  consoleMessages.forEach((msg) => {
    const text = msg.text();
    if (text.includes("@mybricks/render-web")) {
      checkpoint.info(
        `渲染器的版本：@mybricks/render-web@${getVersionFromStr(text)}`
      );
    }
  });

  let allRequestSuccess = true;
  networkRequests.forEach((request) => {
    const status = request.status();
    if ([200, 201, 304].includes(status)) {
      checkpoint.success(`${request.url()} ${status}`);
    } else {
      allRequestSuccess = false;
      checkpoint.error(`${request.url()} ${status}`);
    }
  });
  if (allRequestSuccess) {
    checkpoint.success("所有请求成功");
  }
}
