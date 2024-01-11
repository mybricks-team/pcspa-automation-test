import { IContext } from "../../context";
import designerCheckout from "./designer-checkout";
import previewCheckout from "./preview-checkout";
import publishCheckout from "./publish-checkout";

export async function baseCheck(context: IContext) {
  await designerCheckout(context);
  await previewCheckout(context);
  await publishCheckout(context);
}
