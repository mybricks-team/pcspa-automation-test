import { IContext } from "../../context";
import { waitForSelectorAndCollectedInformation } from "../../tools";
import { Checkpoint } from "../../checkpoint";
import { Locator } from "puppeteer-core";

/**
 * 弹窗场景相关问题检查
 * 
 * 1. 弹窗场景宽高塌陷问题
 */
export default async function modalScenesCheckout(context: IContext) {
  const { browser, cookies } = context;

  const checkpoint = new Checkpoint(context, "designer");

  // 打开一个新页面
  const designerPage = await browser.newPage();

  designerPage.setCookie(...cookies);

  // 导航到要访问的网页
  designerPage.goto(
    "https://test.mybricks.world/mybricks-app-pcspa/index.html?id=503633532424261"
  );

  await waitForSelectorAndCollectedInformation(
    designerPage,
    "#_mybricks-geo-webview_",
    checkpoint
  );

  // 在 Shadow DOM 中执行 JavaScript 以获取特定元素的内容
  const getInfoFromCanvasShadow = async (
    path: string,
    subField: string | string[]
  ) => {
    // 获取包含 Shadow DOM 的元素
    const canvasShadow = await designerPage.$("#_mybricks-geo-webview_");

    return await designerPage.evaluate(
      (canvasShadow, path, subField) => {
        function get(obj: unknown, path: string | string[]) {
          if (typeof path === "string") {
            return obj[path];
          }
          return path.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), obj);
        }

        // 使用 Shadow DOM API 获取 Shadow Root
        const shadowRoot = canvasShadow.shadowRoot;

        // 在 Shadow Root 中查找目标元素
        const targetElement = shadowRoot.querySelector(path) as HTMLSpanElement;

        // 获取目标元素的文本内容
        return get(targetElement, subField);
      },
      canvasShadow,
      path,
      subField
    );
  };

  const timeout = 5000;
  designerPage.setDefaultTimeout(timeout);

  checkpoint.log(`开始搭建弹窗场景`);

  designerPage.setDefaultTimeout(timeout);

  {
    const targetPage = designerPage;
    await targetPage.setViewport({
      width: 1631,
      height: 1330,
    });
  }
  {
    const targetPage = designerPage;
    const promises = [];
    const startWaitingForEvents = () => {
      promises.push(targetPage.waitForNavigation());
    };
    startWaitingForEvents();
    await targetPage.goto(
      "https://test.mybricks.world/mybricks-app-pcspa/index.html?id=503633532424261"
    );
    await Promise.all(promises);
  }
  {
    const targetPage = designerPage;
    await Locator.race([
      targetPage.locator("::-p-aria(#)"),
      targetPage.locator("div.canvasWrap-d66cd > div.btnGroup-f1372 > button"),
      targetPage.locator(
        '::-p-xpath(//*[@id=\\"root\\"]/div/div[1]/div[2]/div/blockquote/div[1]/div[2]/div[1]/div/div/div[1]/div[3]/button)'
      ),
      targetPage.locator(
        ":scope >>> div.canvasWrap-d66cd > div.btnGroup-f1372 > button"
      ),
      targetPage.locator("::-p-text(#)"),
    ])
      .setTimeout(timeout)
      .click({
        offset: {
          x: 21,
          y: 19,
        },
      });
  }
  {
    const targetPage = designerPage;
    await Locator.race([
      targetPage.locator("div.pageNav-d0415 button"),
      targetPage.locator(
        '::-p-xpath(//*[@id=\\"root\\"]/div/div[1]/div[2]/div/blockquote/div[1]/div[2]/div[5]/div[1]/div/button)'
      ),
      targetPage.locator(":scope >>> div.pageNav-d0415 button"),
    ])
      .setTimeout(timeout)
      .click({
        offset: {
          x: 10,
          y: 19,
        },
      });
  }
  {
    const targetPage = designerPage;
    await Locator.race([
      targetPage.locator("div.popup-ea099 div:nth-of-type(2)"),
      targetPage.locator(
        '::-p-xpath(//*[@id=\\"root\\"]/div/div[1]/div[2]/div/blockquote/div[3]/div/div[2])'
      ),
      targetPage.locator(":scope >>> div.popup-ea099 div:nth-of-type(2)"),
    ])
      .setTimeout(timeout)
      .click({
        offset: {
          x: 39,
          y: 10,
        },
      });
  }
  {
    const targetPage = designerPage;
    await Locator.race([
      targetPage.locator("div.normalbar-f3c6e svg"),
      targetPage.locator(
        '::-p-xpath(//*[@id=\\"root\\"]/div/div[1]/div[2]/div/blockquote/div[1]/div[2]/div[1]/div/div/div[1]/div[5]/div[1]/button/svg)'
      ),
      targetPage.locator(":scope >>> div.normalbar-f3c6e svg"),
    ])
      .setTimeout(timeout)
      .click({
        offset: {
          x: 14,
          y: 16,
        },
      });
  }
  {
    const targetPage = designerPage;
    await Locator.race([
      targetPage.locator(
        "div:nth-of-type(3) div:nth-of-type(1) > div.basicList-b08e8 > div:nth-of-type(1)"
      ),
      targetPage.locator(
        '::-p-xpath(//*[@id=\\"root\\"]/div/div[1]/div[2]/div/blockquote/div[1]/div[2]/div[4]/div[2]/div/div[2]/div[3]/div[2]/div/div[1]/div[2]/div[1])'
      ),
      targetPage.locator(
        ":scope >>> div:nth-of-type(3) div:nth-of-type(1) > div.basicList-b08e8 > div:nth-of-type(1)"
      ),
    ])
      .setTimeout(timeout)
      .click({
        offset: {
          x: 63,
          y: 56,
        },
      });
  }
  {
    const targetPage = designerPage;
    await Locator.race([
      targetPage.locator("div.lyMain-ae66e"),
      targetPage.locator(
        '::-p-xpath(//*[@id=\\"root\\"]/div/div[1]/div[2]/div/blockquote/div[1])'
      ),
      targetPage.locator(":scope >>> div.lyMain-ae66e"),
    ])
      .setTimeout(timeout)
      .click({
        delay: 395.0999999642372,
        offset: {
          x: 1345,
          y: 93,
        },
      });
  }
  {
    const targetPage = designerPage;
    await targetPage.keyboard.down("ArrowRight");
  }
  {
    const targetPage = designerPage;
    await targetPage.keyboard.up("ArrowRight");
  }
  {
    const targetPage = designerPage;
    await Locator.race([
      targetPage.locator("textarea"),
      targetPage.locator(
        '::-p-xpath(//*[@id=\\"root\\"]/div/div[1]/div[2]/div/blockquote/div[1]/div[4]/div/div[2]/div[1]/div/div/div/div[1]/div[2]/textarea)'
      ),
      targetPage.locator(":scope >>> textarea"),
    ])
      .setTimeout(timeout)
      .fill("文字对话框");
  }
  {
    const targetPage = designerPage;
    await Locator.race([
      targetPage.locator("div:nth-of-type(2) > div.scroll-b3d55"),
      targetPage.locator(
        '::-p-xpath(//*[@id=\\"root\\"]/div/div[1]/div[2]/div/blockquote/div[1]/div[4]/div/div[2]/div[1])'
      ),
      targetPage.locator(":scope >>> div:nth-of-type(2) > div.scroll-b3d55"),
    ])
      .setTimeout(timeout)
      .click({
        offset: {
          x: 164,
          y: 380,
        },
      });
  }

  checkpoint.log(`弹窗场景搭建完成`);

  // 弹窗场景宽高塌陷问题
  {
    const height = await getInfoFromCanvasShadow(
      "#_geoview-wrapper_ > div > div:not(:first-child)",
      "clientHeight"
    );
    const width = await getInfoFromCanvasShadow(
      "#_geoview-wrapper_ > div > div:not(:first-child)",
      "clientWidth"
    );

    checkpoint.info(`新增弹窗场景 Width:${width} Height:${height}`);
    checkpoint.assert(
      `新增弹窗场景 Width = 620 Height = 270:`,
      width === 620 && height === 270
    );
  }

  checkpoint.info("检查完毕");
}
