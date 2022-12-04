import * as amplitude from "@amplitude/analytics-browser";
import { add, init, Types } from "@amplitude/analytics-browser";
import { pageViewTrackingPlugin } from "@amplitude/plugin-page-view-tracking-browser";
import { webAttributionPlugin } from "@amplitude/plugin-web-attribution-browser";
import { AMPLITUDE_API_KEY } from "./constants";

const webAttributionTracking = webAttributionPlugin(amplitude);
const pageViewTracking = pageViewTrackingPlugin(amplitude, {
  trackHistoryChanges: "all",
});

export const initAmplitude = () => {
  add(webAttributionTracking);
  add(pageViewTracking);
  init(AMPLITUDE_API_KEY, undefined, {
    logLevel: Types.LogLevel.None,
  });
};
