import { ConsoleMessage, HTTPResponse } from "puppeteer-core";
import { IContext } from "../../context";
import {
  getVersionFromStr,
  waitForSelectorAndCollectedInformation,
} from "../../tools";
import { Checkpoint } from "../../checkpoint";

export default async function designerCheckout(context: IContext) {
  const checkpoint = new Checkpoint(context, "designer");

  const { browser } = context;

  // 打开一个新页面
  const designerPage = await browser.newPage();

  designerPage.setCookie({
    name: "mybricks-login-user",
    value: `{"id":483208459444293,"email":"wudi27@kuaishou.com","fingerprint":"b7287b126373722138d278d0ce026bc1"}`,
    domain: "test.mybricks.world", // Cookie 的域
    path: "/", // Cookie 的路径
  });

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
