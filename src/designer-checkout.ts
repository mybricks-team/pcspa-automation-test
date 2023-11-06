import { ConsoleMessage, HTTPResponse } from "puppeteer-core";
import { IContext } from "./context";
import {
  analysisConsoleMessages,
  analysisNetworkRequests,
  getVersionFromStr,
  waitForSelectorAndCollectedInformation,
} from "./tools";
import { Checkpoint } from "./checkpoint";

export default async function designerCheckout(context: IContext) {
  const checkpoint = new Checkpoint(context, "designer");

  const { browser } = context;

  // 打开一个新页面
  const designerPage = await browser.newPage();

  designerPage.setCookie({
    name: "mybricks-login-user",
    value: `{"id":483208459444293,"email":"wudi27@kuaishou.com","fingerprint":"92337c66cf87f2185a6375b52861c009"}`,
    domain: "test.mybricks.world", // Cookie 的域
    path: "/", // Cookie 的路径
  });

  // 导航到要访问的网页
  designerPage.goto(
    "https://test.mybricks.world/mybricks-app-pcspa/index.html?id=495145193427013"
  );

  const { consoleMessages, networkRequests } =
    await waitForSelectorAndCollectedInformation(
      designerPage,
      "#_mybricks-geo-webview_"
    );

  const { mybricksInfo, errorMessages } =
    analysisConsoleMessages(consoleMessages);
  const { errorRequests } = analysisNetworkRequests(networkRequests);

  mybricksInfo.forEach((info) => checkpoint.info(info));
  errorMessages.forEach((msg) => checkpoint.error(msg.text()));
  errorRequests.forEach((req) =>
    checkpoint.error(`${req.url()} ${req.status()}`)
  );
  checkpoint.info("检查完毕");
}
