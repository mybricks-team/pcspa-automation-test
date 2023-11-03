import { ConsoleMessage, HTTPResponse } from "puppeteer-core";

// context.js
const context = {
  consoleMessages: [] as ConsoleMessage[],
  networkRequests: [] as HTTPResponse[],
};

export default context;
