import { IContext } from "../../context";
import { waitForSelectorAndCollectedInformation } from "../../tools";
import { Checkpoint } from "../../checkpoint";
import { Locator } from "puppeteer-core";

/**
 * 页面场景相关问题检查
 *
 * 1. 页面场景宽高塌陷问题
 */
export default async function pageScenesCheckout(context: IContext) {
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

  checkpoint.log(`开始搭建页面场景`);
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
          x: 26,
          y: 14,
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
          x: 4,
          y: 12,
        },
      });
  }
  {
    const targetPage = designerPage;
    await Locator.race([
      targetPage.locator("div.popup-ea099 > div > div:nth-of-type(1)"),
      targetPage.locator(
        '::-p-xpath(//*[@id=\\"root\\"]/div/div[1]/div[2]/div/blockquote/div[3]/div/div[1])'
      ),
      targetPage.locator(
        ":scope >>> div.popup-ea099 > div > div:nth-of-type(1)"
      ),
    ])
      .setTimeout(timeout)
      .click({
        offset: {
          x: 40,
          y: 18,
        },
      });
  }
  {
    const targetPage = designerPage;
    await Locator.race([
      targetPage.locator("div.normalbar-f3c6e path"),
      targetPage.locator(
        '::-p-xpath(//*[@id=\\"root\\"]/div/div[1]/div[2]/div/blockquote/div[1]/div[2]/div[1]/div/div/div[1]/div[5]/div[1]/button/svg/path)'
      ),
      targetPage.locator(":scope >>> div.normalbar-f3c6e path"),
    ])
      .setTimeout(timeout)
      .click({
        offset: {
          x: 7.06005859375,
          y: 12.856002807617188,
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
          x: 43,
          y: 27,
        },
      });
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
      .click({
        offset: {
          x: 74,
          y: 20,
        },
      });
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
      .fill("文字123");
  }
  {
    const targetPage = designerPage;
    await Locator.race([
      targetPage.locator("#_mybricks-geo-webview_ >>>> #_geoview-wrapper_"),
      targetPage.locator(":scope >>> #_geoview-wrapper_"),
    ])
      .setTimeout(timeout)
      .click({
        offset: {
          x: 1502,
          y: 171.5,
        },
      });
  }
  checkpoint.log(`页面场景搭建完成`);

  // 页面场景宽高塌陷问题
  {
    const height = await getInfoFromCanvasShadow(
      "#_geoview-wrapper_ > div > div:not(:first-child)",
      "clientHeight"
    );
    const width = await getInfoFromCanvasShadow(
      "#_geoview-wrapper_ > div > div:not(:first-child)",
      "clientWidth"
    );

    checkpoint.info(`新增页面场景 Width:${width} Height:${height}`);
    checkpoint.assert(
      `新增页面场景 Width = 1024 Height = 800:`,
      width === 1024 && height === 800
    );
  }

  checkpoint.info("检查完毕");
}
