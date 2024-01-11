import { KeyInput } from "puppeteer-core";
import { Checkpoint } from "../../checkpoint";
import { IContext } from "../../context";
import { waitForSelectorAndCollectedInformation } from "../../tools";
import { playback } from "./playback";
import { IRecord, record1, record2 } from "./records";

export async function recordCheck(context: IContext) {
  const { browser, cookies } = context;

  const checkpoint = new Checkpoint(context, "record");

  async function play(record: IRecord) {
    // 打开一个新页面
    const designerPage = await browser.newPage();

    await designerPage.setViewport({
      width: record.windowWidth,
      height: record.windowHeight,
    });

    designerPage.setCookie(...cookies);

    // 导航到要访问的网页
    designerPage.goto(record.href);

    await waitForSelectorAndCollectedInformation(
      designerPage,
      "#_mybricks-geo-webview_",
      checkpoint
    );

    await playback(designerPage, record);
  }

  await play(record1);
  await play(record2);

  checkpoint.info("检查完毕");
}
