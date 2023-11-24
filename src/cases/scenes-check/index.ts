import { IContext } from "../../context";
import modalScenesCheckout from "./modal-scenes-checkout";
import pageScenesCheckout from "./page-scenes-checkout";

export async function scenesCheck(context: IContext) {
  await pageScenesCheckout(context);
  await modalScenesCheckout(context);
}
