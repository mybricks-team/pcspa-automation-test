import { ConsoleMessage, HTTPResponse } from "puppeteer-core";
import { Checkpoint } from "../../checkpoint";
import { IContext } from "../../context";
import {
  getPage,
  getVersionFromStr,
  waitForSelectorAndCollectedInformation,
} from "../../tools";

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
    "#root > div > div > div > div > button:nth-child(4)"
  );

  // 等待预览页的创建
  const newPageTarget = await browser.waitForTarget((target) =>
    target.url().includes("preview.html")
  );

  // 切换到预览页
  const previewPage = await newPageTarget.page();

  await waitForSelectorAndCollectedInformation(
    previewPage,
    "#root > div",
    checkpoint
  );

  checkpoint.info("检查完毕");
}
