import { ConsoleMessage, HTTPResponse } from "puppeteer-core";
import { Checkpoint } from "./checkpoint";
import { IContext } from "./context";
import {
  analysisConsoleMessages,
  analysisNetworkRequests,
  getPage,
  getVersionFromStr,
  waitForSelectorAndCollectedInformation,
} from "./tools";

export default async function previewCheckout(context: IContext) {
  const checkpoint = new Checkpoint(context, "preview");

  const { browser } = context;

  const designerPage = await getPage(browser, "index.html");

  if (!designerPage) {
    checkpoint.error("找不到设计页");
    return;
  }

  // 点击预览按钮
  await designerPage.click(
    "#root > div > div > div > div > button:nth-child(3)"
  );

  // 等待新预览页的创建
  const newPageTarget = await browser.waitForTarget((target) =>
    target.url().includes("preview.html")
  );

  // 切换到预览页
  const previewPage = await newPageTarget.page();

  const { consoleMessages, networkRequests } =
    await waitForSelectorAndCollectedInformation(previewPage, "#root > div");

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
