import { Locator } from "puppeteer-core";
import { IContext } from "../../context";
import { waitForSelectorAndCollectedInformation } from "../../tools";
import { Checkpoint } from "../../checkpoint";

export async function setterCheck(context: IContext) {
  const { browser, cookies } = context;

  const checkpoint = new Checkpoint(context, "setter-check-designer");

  try {
    // 打开一个新页面
    const designerPage = await browser.newPage();

    designerPage.setCookie(...cookies);

    // 导航到要访问的网页
    designerPage.goto(
      "https://test.mybricks.world/mybricks-app-pcspa/index.html?id=500872924614725"
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
          const targetElement = shadowRoot.querySelector(
            path
          ) as HTMLSpanElement;

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

    // ------ 配置按钮 title start ------
    checkpoint.log("配置按钮 title");
    {
      await Locator.race([
        designerPage.locator("#_mybricks-geo-webview_ >>>> div.wrapper-39b7a"),
        designerPage.locator(":scope >>> div.wrapper-39b7a"),
      ])
        .setTimeout(timeout)
        .click({
          offset: {
            x: 70,
            y: 14.5,
          },
        });
    }
    {
      await Locator.race([
        designerPage.locator(
          "div:nth-of-type(2) > div.scroll-b3d55 > div > div > div > div:nth-of-type(1) input"
        ),
        designerPage.locator(
          '::-p-xpath(//*[@id=\\"root\\"]/div/div/div[2]/div/blockquote/div[1]/div[4]/div/div[2]/div[1]/div/div/div/div[1]/div/div/div[2]/input)'
        ),
        designerPage.locator(
          ":scope >>> div:nth-of-type(2) > div.scroll-b3d55 > div > div > div > div:nth-of-type(1) input"
        ),
      ])
        .setTimeout(timeout)
        .click({
          offset: {
            x: 106,
            y: 13.15625,
          },
        });
    }
    {
      await Locator.race([
        designerPage.locator(
          "div:nth-of-type(2) > div.scroll-b3d55 > div > div > div > div:nth-of-type(1) input"
        ),
        designerPage.locator(
          '::-p-xpath(//*[@id=\\"root\\"]/div/div/div[2]/div/blockquote/div[1]/div[4]/div/div[2]/div[1]/div/div/div/div[1]/div/div/div[2]/input)'
        ),
        designerPage.locator(
          ":scope >>> div:nth-of-type(2) > div.scroll-b3d55 > div > div > div > div:nth-of-type(1) input"
        ),
      ])
        .setTimeout(timeout)
        .fill("按钮123456");
    }
    {
      await Locator.race([
        designerPage.locator(
          "div:nth-of-type(2) > div.scroll-b3d55 > div > div > div"
        ),
        designerPage.locator(
          '::-p-xpath(//*[@id=\\"root\\"]/div/div/div[2]/div/blockquote/div[1]/div[4]/div/div[2]/div[1]/div/div/div)'
        ),
        designerPage.locator(
          ":scope >>> div:nth-of-type(2) > div.scroll-b3d55 > div > div > div"
        ),
        designerPage.locator(
          "::-p-text(文字标题按钮123456作为热区使用图标单击defined新建双击defined新建触发数据类型数字输出值0)"
        ),
      ])
        .setTimeout(timeout)
        .click({
          offset: {
            x: 96,
            y: 84,
          },
        });
    }
    // ------ 配置按钮 title end ------

    checkpoint.log("断言-配置按钮 title");

    // 断言: 按钮文案配置成功
    {
      const content = await getInfoFromCanvasShadow(
        "div > div.wrapper-39b7a > button > span",
        "innerText"
      );

      checkpoint.info(`配置后按钮文案: ${content}`);
      checkpoint.assert(
        `配置后按钮文案是否为"按钮123456": `,
        content === "按钮123456"
      );
    }

    // ------ 配置按钮图标 start ------
    checkpoint.log("配置按钮图标");
    {
      await Locator.race([
        designerPage.locator("#_mybricks-geo-webview_ >>>> div.wrapper-39b7a"),
        designerPage.locator(":scope >>> div.wrapper-39b7a"),
      ])
        .setTimeout(timeout)
        .click({
          offset: {
            x: 84,
            y: 20.5,
          },
        });
    }
    {
      await Locator.race([
        designerPage.locator(
          "div.view-eb688 > div > div:nth-of-type(2) div:nth-of-type(3) button"
        ),
        designerPage.locator(
          '::-p-xpath(//*[@id=\\"root\\"]/div/div/div[2]/div/blockquote/div[1]/div[4]/div/div[2]/div[1]/div/div/div/div[3]/div[2]/button)'
        ),
        designerPage.locator(
          ":scope >>> div.view-eb688 > div > div:nth-of-type(2) div:nth-of-type(3) button"
        ),
      ])
        .setTimeout(timeout)
        .click({
          offset: {
            x: 17,
            y: 4.9375,
          },
        });
    }
    {
      await Locator.race([
        designerPage.locator(
          "div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(1) span.ant-input-number-handler-up svg"
        ),
        designerPage.locator(
          '::-p-xpath(//*[@id=\\"root\\"]/div/div/div[2]/div/blockquote/div[1]/div[4]/div/div[2]/div[1]/div/div/div/div[4]/div[2]/div[3]/div[2]/div[1]/div/div[1]/div[1]/span[1]/span/svg)'
        ),
        designerPage.locator(
          ":scope >>> div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(1) span.ant-input-number-handler-up svg"
        ),
      ])
        .setTimeout(timeout)
        .click({
          count: 2,
          offset: {
            x: 3.5,
            y: 4.71875,
          },
        });
    }
    {
      await Locator.race([
        designerPage.locator(
          "div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(1) span.ant-input-number-handler-up svg"
        ),
        designerPage.locator(
          '::-p-xpath(//*[@id=\\"root\\"]/div/div/div[2]/div/blockquote/div[1]/div[4]/div/div[2]/div[1]/div/div/div/div[4]/div[2]/div[3]/div[2]/div[1]/div/div[1]/div[1]/span[1]/span/svg)'
        ),
        designerPage.locator(
          ":scope >>> div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(1) span.ant-input-number-handler-up svg"
        ),
      ])
        .setTimeout(timeout)
        .click({
          offset: {
            x: 3.5,
            y: 4.71875,
          },
        });
    }
    {
      await Locator.race([
        designerPage.locator(
          "div.scroll-b3d55 div:nth-of-type(2) > div:nth-of-type(2) span.ant-input-number-handler-down svg"
        ),
        designerPage.locator(
          '::-p-xpath(//*[@id=\\"root\\"]/div/div/div[2]/div/blockquote/div[1]/div[4]/div/div[2]/div[1]/div/div/div/div[4]/div[2]/div[3]/div[2]/div[2]/div/div[1]/div[1]/span[2]/span/svg)'
        ),
        designerPage.locator(
          ":scope >>> div.scroll-b3d55 div:nth-of-type(2) > div:nth-of-type(2) span.ant-input-number-handler-down svg"
        ),
      ])
        .setTimeout(timeout)
        .click({
          offset: {
            x: 1.5,
            y: 3.21875,
          },
        });
    }
    {
      await Locator.race([
        designerPage.locator(
          "div.scroll-b3d55 div:nth-of-type(2) > div:nth-of-type(2) span.ant-input-number-handler-down svg"
        ),
        designerPage.locator(
          '::-p-xpath(//*[@id=\\"root\\"]/div/div/div[2]/div/blockquote/div[1]/div[4]/div/div[2]/div[1]/div/div/div/div[4]/div[2]/div[3]/div[2]/div[2]/div/div[1]/div[1]/span[2]/span/svg)'
        ),
        designerPage.locator(
          ":scope >>> div.scroll-b3d55 div:nth-of-type(2) > div:nth-of-type(2) span.ant-input-number-handler-down svg"
        ),
      ])
        .setTimeout(timeout)
        .click({
          offset: {
            x: 1.5,
            y: 3.21875,
          },
        });
    }
    {
      await Locator.race([
        designerPage.locator(
          "div.scroll-b3d55 div:nth-of-type(2) > div:nth-of-type(2) span.ant-input-number-handler-down svg"
        ),
        designerPage.locator(
          '::-p-xpath(//*[@id=\\"root\\"]/div/div/div[2]/div/blockquote/div[1]/div[4]/div/div[2]/div[1]/div/div/div/div[4]/div[2]/div[3]/div[2]/div[2]/div/div[1]/div[1]/span[2]/span/svg)'
        ),
        designerPage.locator(
          ":scope >>> div.scroll-b3d55 div:nth-of-type(2) > div:nth-of-type(2) span.ant-input-number-handler-down svg"
        ),
      ])
        .setTimeout(timeout)
        .click({
          offset: {
            x: 1.5,
            y: 3.21875,
          },
        });
    }
    {
      await Locator.race([
        designerPage.locator(
          "div.scroll-b3d55 div:nth-of-type(4) > div:nth-of-type(2) > div:nth-of-type(2) svg"
        ),
        designerPage.locator(
          '::-p-xpath(//*[@id=\\"root\\"]/div/div/div[2]/div/blockquote/div[1]/div[4]/div/div[2]/div[1]/div/div/div/div[4]/div[2]/div[2]/div[2]/button/span/span/svg)'
        ),
        designerPage.locator(
          ":scope >>> div.scroll-b3d55 div:nth-of-type(4) > div:nth-of-type(2) > div:nth-of-type(2) svg"
        ),
      ])
        .setTimeout(timeout)
        .click({
          offset: {
            x: 5.5,
            y: 6.484375,
          },
        });
    }
    {
      await Locator.race([
        designerPage.locator(
          "#root > div > div > div.designer_I_IGR > div > blockquote > div.lyMain-ae66e > div.lyStage-bcb68 > div:nth-child(5) > div > div > div > div > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(1)"
        ),
      ])
        .setTimeout(timeout)
        .click({
          offset: {
            x: 10,
            y: 9.421875,
          },
        });
    }
    // ------ 配置按钮图标 end ------

    checkpoint.log("断言-配置按钮图标");

    // 断言: 按钮图标尺寸配置成功
    {
      const content = await getInfoFromCanvasShadow(
        "div > div.wrapper-39b7a > button > div > div:nth-child(1) > span",
        ["style", "fontSize"]
      );
      checkpoint.info(`配置后按钮图标尺寸: ${content}`);
      checkpoint.assert(`配置后按钮图标尺寸是否为 17px: `, content === "17px");
    }
    // 断言: 按钮图标切换成功
    {
      const content = await getInfoFromCanvasShadow(
        "div > div.wrapper-39b7a > button > div > div:nth-child(1) > span > span",
        "ariaLabel"
      );
      checkpoint.info(`配置后按钮图标: ${content}`);
      checkpoint.assert(
        `配置后按钮图标是否为 step-backward: `,
        content === "step-backward"
      );
    }

    // ------ 配置按钮图标位置和间距 start ------
    {
      await Locator.race([
        designerPage.locator("::-p-aria(位于文字前)"),
        designerPage.locator(
          "div.view-eb688 > div > div:nth-of-type(2) div > div > div:nth-of-type(4) span.ant-select-selection-item"
        ),
        designerPage.locator(
          '::-p-xpath(//*[@id=\\"root\\"]/div/div/div[2]/div/blockquote/div[1]/div[4]/div/div[2]/div[1]/div/div/div/div[4]/div[2]/div[5]/div[2]/div/div/span[2])'
        ),
        designerPage.locator(
          ":scope >>> div.view-eb688 > div > div:nth-of-type(2) div > div > div:nth-of-type(4) span.ant-select-selection-item"
        ),
        designerPage.locator("::-p-text(位于文字前)"),
      ])
        .setTimeout(timeout)
        .click({
          offset: {
            x: 108,
            y: 15.484375,
          },
        });
    }
    {
      await Locator.race([designerPage.locator("::-p-text(位于文字后)")])
        .setTimeout(timeout)
        .click({
          offset: {
            x: 53,
            y: 11,
          },
        });
    }
    {
      await Locator.race([
        designerPage.locator("div:nth-of-type(6) input"),
        designerPage.locator(
          '::-p-xpath(//*[@id=\\"root\\"]/div/div/div[2]/div/blockquote/div[1]/div[4]/div/div[2]/div[1]/div/div/div/div[4]/div[2]/div[6]/div[2]/div/div/div[1]/div[2]/input)'
        ),
        designerPage.locator(":scope >>> div:nth-of-type(6) input"),
      ])
        .setTimeout(timeout)
        .click({
          offset: {
            x: 25,
            y: 11.640625,
          },
        });
    }
    {
      await Locator.race([
        designerPage.locator("div:nth-of-type(6) input"),
        designerPage.locator(
          '::-p-xpath(//*[@id=\\"root\\"]/div/div/div[2]/div/blockquote/div[1]/div[4]/div/div[2]/div[1]/div/div/div/div[4]/div[2]/div[6]/div[2]/div/div/div[1]/div[2]/input)'
        ),
        designerPage.locator(":scope >>> div:nth-of-type(6) input"),
      ])
        .setTimeout(timeout)
        .fill("20");
    }
    // ------ 配置按钮图标位置和间距 end ------

    // 断言: 按钮图标位置切换成功
    {
      const content1 = await getInfoFromCanvasShadow(
        "div > div.wrapper-39b7a > button > div > div:nth-child(1) > span",
        ["innerText"]
      );
      const inTheRight = !!content1;

      checkpoint.info(
        `配置后按钮图标位置: ${inTheRight ? "在右边" : "在左边"}`
      );
      checkpoint.assert(`配置后按钮图标位置是否在右边: `, inTheRight);
    }
    // 断言: 按钮图标间距设置成功
    {
      const content = await getInfoFromCanvasShadow(
        "div > div.wrapper-39b7a > button > div",
        ["style", "gap"]
      );
      checkpoint.info(`配置后按钮图标间距: ${content}`);
      checkpoint.assert(`配置后按钮图标间距是否为 20px: `, content === "20px");
    }

    checkpoint.info("检查完毕");
  } catch (e) {
    console.log(`e JD==> `, e);
    checkpoint.error(`设置器检查出错: ${e.message}`);
    throw e;
  }
}
