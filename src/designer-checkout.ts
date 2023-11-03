import { ConsoleMessage, HTTPResponse } from "puppeteer-core";
import { IContext } from "./context";
import { getVersionFromStr } from "./tools";
import { Checkpoint } from "./checkpoint";

export default async function designerCheckout(context: IContext) {
  const checkpoint = new Checkpoint(context, "designer");

  const { browser } = context;

  const consoleMessages: ConsoleMessage[] = [];
  const networkRequests: HTTPResponse[] = [];

  // 打开一个新页面
  const page = await browser.newPage();

  page.setCookie({
    name: "mybricks-login-user",
    value: `{"id":483208459444293,"email":"wudi27@kuaishou.com","fingerprint":"27e7a51bb642114b02851849358e36e5"}`,
    domain: "test.mybricks.world", // Cookie 的域
    path: "/", // Cookie 的路径
  });

  // 监听控制台消息
  page.on("console", (msg) => consoleMessages.push(msg));
  // 监听页面的网络请求事件
  page.on("response", (response) => networkRequests.push(response));

  // 导航到要访问的网页
  await page.goto(
    "https://test.mybricks.world/mybricks-app-pcspa/index.html?id=495145193427013"
  );

  // 等待一段时间以确保控制台输出已经收集
  await new Promise((res) => setTimeout(() => res(1), 10000));

  consoleMessages.forEach((msg) => {
    const text = msg.text();
    if (text.includes("@mybricks/designer-spa")) {
      checkpoint.info(
        `引擎的版本：@mybricks/designer-spa@${getVersionFromStr(text)}`
      );
    } else if (text.includes("@mybricks/render-web")) {
      checkpoint.info(
        `渲染器的版本：@mybricks/render-web@${getVersionFromStr(text)}`
      );
    }
  });

  let allRequestSuccess = true;
  networkRequests.forEach((request) => {
    const status = request.status();
    if ([200, 201].includes(status)) {
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
