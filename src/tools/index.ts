import path from "path";
import fs from "fs";
import { Browser, ConsoleMessage, HTTPResponse, Page } from "puppeteer-core";
import { Checkpoint } from "../checkpoint";

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

/**
 * 等待页面渲染完成，收集期间所有的控制台输出和网络请求
 */
export async function waitForSelectorAndCollectedInformation(
  page: Page,
  selector: string,
  checkpoint: Checkpoint
) {
  const consoleMessages: ConsoleMessage[] = [];
  const networkRequests: HTTPResponse[] = [];

  const onConsole = (msg: ConsoleMessage) => consoleMessages.push(msg);
  const onResponse = (response: HTTPResponse) => networkRequests.push(response);

  // 监听控制台消息
  page.on("console", onConsole);
  // 监听页面的网络请求事件
  page.on("response", onResponse);

  await page.waitForSelector(selector);

  page.off("console", onConsole);
  // 停止监听响应事件
  page.off("response", onResponse);

  handleConsoleMessages(consoleMessages, checkpoint);
  handleNetworkRequests(networkRequests, checkpoint);

  return {
    consoleMessages,
    networkRequests,
  };
}

/**
 * 处理控制台输出信息
 */
export function handleConsoleMessages(
  consoleMessages: ConsoleMessage[],
  checkpoint: Checkpoint
) {
  consoleMessages
    .filter((msg) => msg.type() === "error")
    .forEach((msg) => checkpoint.error(msg.text()));

  consoleMessages
    .filter((msg) => msg.type() === "warning")
    .forEach((msg) => checkpoint.warn(msg.text()));

  consoleMessages
    .filter((msg) => msg.type() === "info")
    .forEach((msg) => checkpoint.log(msg.text()));

  consoleMessages
    .filter((msg) => msg.type() === "log")
    .forEach((msg) => checkpoint.log(msg.text()));

  checkpoint.info("mybricks 相关包加载情况 ↓↓↓");
  consoleMessages.forEach((msg) => {
    const match = msg.text().match(/%c\s+(.*?)\s+%c@(.*?)\s+/); //  取出{包名@版本号}
    match && checkpoint.info(`${match[1]}@${match[2]}`);
  });
}

/**
 * 处理网络请求信息
 */
export function handleNetworkRequests(
  networkRequests: HTTPResponse[],
  checkpoint: Checkpoint
) {
  networkRequests.forEach((request) => {
    if (
      request.status() < 200 ||
      (request.status() >= 300 && request.status() !== 304)
    ) {
      checkpoint.error(`${request.url()} ${request.statusText()}`);
    } else {
      checkpoint.success(`${request.url()} ${request.statusText()}`);
    }
  });
}
