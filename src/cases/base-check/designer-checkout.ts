import { ConsoleMessage, HTTPResponse } from "puppeteer-core";
import { IContext } from "../../context";
import {
  getVersionFromStr,
  waitForSelectorAndCollectedInformation,
} from "../../tools";
import { Checkpoint } from "../../checkpoint";

export default async function designerCheckout(context: IContext) {
  const { browser, cookies } = context;

  const checkpoint = new Checkpoint(context, "designer");

  // 打开一个新页面
  const designerPage = await browser.newPage();

  designerPage.setCookie(...cookies);

  // 导航到要访问的网页
  designerPage.goto(
    "https://test.mybricks.world/mybricks-app-pcspa/index.html?id=500863948435525"
  );

  await waitForSelectorAndCollectedInformation(
    designerPage,
    "#_mybricks-geo-webview_",
    checkpoint
  );

  checkpoint.info("检查完毕");
}
