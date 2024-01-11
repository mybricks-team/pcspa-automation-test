import { KeyInput, Page } from "puppeteer-core";
import { IRecord } from "./records";

export async function playback(designerPage: Page, record: IRecord) {
  for (const item of record.actions) {
    switch (item.type) {
      case "mousedown":
        await designerPage.mouse.move(item.x, item.y, { steps: 10 });
        await designerPage.mouse.down();
        break;
      case "mouseup":
        await designerPage.mouse.move(item.x, item.y, { steps: 10 });
        await designerPage.mouse.up();
        break;
      case "wheel":
        await designerPage.mouse.move(item.x, item.y, { steps: 10 });
        await designerPage.mouse.wheel({ deltaY: item.deltaY });
        break;
      case "keydown":
        await designerPage.keyboard.press(item.key as KeyInput);
        break;
    }

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve("");
      }, 100);
    });
  }
}
