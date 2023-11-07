import { ConsoleMessage, HTTPResponse, Locator } from "puppeteer-core";
import { Checkpoint } from "./checkpoint";
import { IContext } from "./context";
import {
  getPage,
  waitAndClick,
  waitAndInputValue,
  waitForSelectorAndCollectedInformation,
} from "./tools";

export default async function publishCheckout(context: IContext) {
  const timeout = 5000;
  const checkpoint = new Checkpoint(context, "publish");

  const { browser } = context;

  checkpoint.log("获取设计页");
  const designerPage = await getPage(browser, "index.html");

  if (!designerPage) {
    checkpoint.error("找不到设计页");
    return;
  }

  checkpoint.log(`切换到设计页标签: ${designerPage.url()}`);
  await designerPage.bringToFront();

  try {
    checkpoint.log("点击发布按钮");
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
      await new Promise((res) => setTimeout(() => res(1), 300));
    }

    checkpoint.log("选择发布环境");
    {
      await Locator.race([
        designerPage.locator("::-p-aria(* 发布环境 :)"),
        designerPage.locator("#envType"),
        designerPage.locator('::-p-xpath(//*[@id=\\"envType\\"])'),
        designerPage.locator(":scope >>> #envType"),
      ])
        .setTimeout(timeout)
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
        .setTimeout(timeout)
        .click({
          offset: {
            x: 135,
            y: 8,
          },
        });
    }

    checkpoint.log("填写发布信息");
    {
      await Locator.race([
        designerPage.locator("::-p-aria(* 发布内容 :)"),
        designerPage.locator("#commitlog"),
        designerPage.locator('::-p-xpath(//*[@id=\\"commitlog\\"])'),
        designerPage.locator(":scope >>> #commitlog"),
      ])
        .setTimeout(timeout)
        .fill("自动脚本测试发布");
    }

    checkpoint.log("点击发布弹窗中的发布按钮");
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

    checkpoint.log("打开发布后的页面");
    {
      await Locator.race([
        designerPage.locator(
          `div[class^="version_publishContainer"] > div > div > div > div:nth-of-type(2) > div:nth-of-type(1) div[class^="version_body"] > div:nth-of-type(1)`
        ),
      ])
        .setTimeout(timeout)
        .click({
          offset: {
            x: 66,
            y: 15,
          },
        });
      await new Promise((res) => setTimeout(() => res(1), 300));
      await Locator.race([
        designerPage.locator(
          `div[class^="modal_modalContainer"] button:nth-of-type(1) > span`
        ),
      ])
        .setTimeout(timeout)
        .click({});
    }
  } catch (e) {
    checkpoint.error("发布失败");
  }

  await new Promise((res) => setTimeout(() => res(1), 300));

  // 等待发布页的创建
  const newPageTarget = await browser.waitForTarget((target) =>
    target.url().includes("mfs/app/pcpage/test/")
  );

  // 切换到发布页
  const publishedPage = await newPageTarget.page();

  await waitForSelectorAndCollectedInformation(
    publishedPage,
    "#mybricks-page-root > div",
    checkpoint
  );

  checkpoint.info("检查完毕");
}
