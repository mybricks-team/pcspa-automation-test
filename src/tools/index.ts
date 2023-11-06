import path from "path";
import fs from "fs";
import { Browser, Page } from "puppeteer-core";

/** 从字符串中提取版本号信息 */
export function getVersionFromStr(inputString: string) {
  // 使用正则表达式匹配版本号信息
  const versionMatch = inputString.match(/@([\d.]+)/);

  // 如果匹配失败，返回null
  if (!versionMatch) return null;

  // 返回匹配到的版本号信息
  return versionMatch[1];
}

/** 创建并写入文件 */
export function createAndWriteFileSync(
  filePath: string,
  fileContent: string
): void {
  // 获取文件的目录路径
  const directoryPath: string = path.dirname(filePath);

  // 检查目录是否已存在
  if (!fs.existsSync(directoryPath)) {
    // 如果目录不存在，使用 fs.mkdirSync 创建目录
    fs.mkdirSync(directoryPath, { recursive: true });
  }

  // 使用 fs.writeFileSync 写入文件内容
  fs.writeFileSync(filePath, fileContent);

  console.log(`文件已创建并写入：${filePath}`);
}

/** 根据关键字获取网页 */
export async function getPage(
  browser: Browser,
  searchString: string
): Promise<Page | null> {
  return (
    (await browser.pages()).find((page) => page.url().includes(searchString)) ||
    null
  );
}

export async function waitAndClick(page: Page, selector: string) {
  await page.waitForSelector(selector);
  await page.click(selector);
}

export async function waitAndInputValue(
  page: Page,
  selector: string,
  value: string
) {
  await page.waitForSelector(selector);
  await page.evaluate(
    (selector, value) => {
      const commitInfoTextArea = document.querySelector(selector)! as
        | HTMLTextAreaElement
        | HTMLInputElement;
      commitInfoTextArea.value = value;
    },
    selector,
    value
  );
}
