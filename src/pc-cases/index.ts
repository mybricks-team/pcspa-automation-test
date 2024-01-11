import { IContext } from "../context";
import { baseCheck } from "./base-check";
import { scenesCheck } from "./scenes-check";
import { setterCheck } from "./setter-check";

export async function pcCaseRun(context: IContext) {
  await baseCheck(context);
  await setterCheck(context);
  await scenesCheck(context);
}
