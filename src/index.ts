import puppeteer from "puppeteer-core";
import context from "./context";

(async () => {
  // 创建一个 Puppeteer 浏览器实例
  const browser = await puppeteer.launch({
    // chrome://version/
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", // 在 chrome://version/ 可以找到可执行文件的路径
  });

  // 打开一个新页面
  const page = await browser.newPage();

  page.setCookie({
    name: "mybricks-login-user",
    value: `{"id":483208459444293,"email":"wudi27@kuaishou.com","fingerprint":"27e7a51bb642114b02851849358e36e5"}`,
    domain: "test.mybricks.world", // Cookie 的域
    path: "/", // Cookie 的路径
  });

  // 监听控制台消息
  page.on("console", (msg) => {
    context.consoleMessages.push(msg);
    console.log(`Console Message: ${msg.text()}`);
  });

  // 监听页面的网络请求事件
  page.on("response", (response) => {
    context.networkRequests.push(response);
    console.log(`URL: ${response.url()}`);
    console.log(`Status: ${response.status()}`);
    console.log(`Content Type: ${response.headers()["content-type"]}`);
  });

  // 导航到要访问的网页
  await page.goto(
    "https://test.mybricks.world/mybricks-app-pcspa/index.html?id=495145193427013"
  );

  // 在页面上执行一些操作，例如点击按钮、填写表单等

  // 等待一段时间以确保控制台输出已经收集
  await new Promise((res) =>
    setTimeout(() => {
      res(1);
    }, 10000)
  );

  // 关闭浏览器
  await browser.close();
})();
