import { ConsoleMessage, HTTPResponse, Locator } from "puppeteer-core";
import { Checkpoint } from "./checkpoint";
import { IContext } from "./context";
import { getPage, waitAndClick, waitAndInputValue } from "./tools";

export default async function publishCheckout(context: IContext) {
  const timeout = 5000;
  const checkpoint = new Checkpoint(context, "preview");

  const { browser } = context;

  const consoleMessages: ConsoleMessage[] = [];
  const networkRequests: HTTPResponse[] = [];

  const designerPage = await getPage(browser, "index.html");

  if (!designerPage) {
    checkpoint.error("找不到设计页");
    return;
  }

  await designerPage.bringToFront();

  checkpoint.info("点击发布按钮");
  {
    await Locator.race([
      designerPage.locator("::-p-aria(发布)"),
      designerPage.locator("button:nth-of-type(3)"),
      designerPage.locator(
        '::-p-xpath(//*[@id=\\"root\\"]/div/div/div[1]/div[2]/button[3])'
      ),
      designerPage.locator(":scope >>> button:nth-of-type(3)"),
      designerPage.locator("::-p-text(发布)"),
    ])
      .setTimeout(timeout)
      .click({
        offset: {
          x: 36,
          y: 12.5,
        },
      });
  }

  checkpoint.info("选择发布环境");
  {
    await Locator.race([
      designerPage.locator("::-p-aria(* 发布环境 :)"),
      designerPage.locator("#envType"),
      designerPage.locator('::-p-xpath(//*[@id=\\"envType\\"])'),
      designerPage.locator(":scope >>> #envType"),
    ])
      .setTimeout(5000)
      .click({
        offset: {
          x: 243.5,
          y: 15,
        },
      });
    await Locator.race([
      designerPage.locator(
        "div.rc-virtual-list-holder > div > div > div > div"
      ),
      designerPage.locator(
        "::-p-xpath(/html/body/div[3]/div/div/div/div[2]/div[1]/div/div/div/div)"
      ),
      designerPage.locator(
        ":scope >>> div.rc-virtual-list-holder > div > div > div > div"
      ),
    ])
      .setTimeout(5000)
      .click({
        offset: {
          x: 135,
          y: 8,
        },
      });
  }

  checkpoint.info("填写发布信息");
  {
    await Locator.race([
      designerPage.locator("::-p-aria(* 发布内容 :)"),
      designerPage.locator("#commitInfo"),
      designerPage.locator('::-p-xpath(//*[@id=\\"commitInfo\\"])'),
      designerPage.locator(":scope >>> #commitInfo"),
    ])
      .setTimeout(5000)
      .fill("自动脚本测试发布");
  }

  checkpoint.info("点击发布弹窗中的发布按钮");
  {
    await Locator.race([
      designerPage.locator(
        '::-p-aria(发 布) >>>> ::-p-aria([role=\\"generic\\"])'
      ),
      designerPage.locator("button.ant-btn-primary > span"),
      designerPage.locator(
        "::-p-xpath(/html/body/div[2]/div/div[2]/div/div[2]/div[3]/button[2]/span)"
      ),
      designerPage.locator(":scope >>> button.ant-btn-primary > span"),
      designerPage.locator("::-p-text(发 布)"),
    ])
      .setTimeout(timeout)
      .click({
        offset: {
          x: 3.296875,
          y: 12,
        },
      });
  }
}
