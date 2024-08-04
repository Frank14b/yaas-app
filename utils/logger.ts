import { Environments } from "@/constants";
import * as Sentry from "@sentry/react-native";
import allSettled from "promise.allsettled";

const init = () => {
  Sentry.init({
    dsn: Environments.SENTRY_DSN,
    debug: true, // For development
    enableNative: false, // To capture native crashes
    tracesSampleRate: 1.0,
  });
  allSettled.shim();
};

const Error = <T>(err: T) => {
  Sentry.captureException(err);
};

const Information = (message: string) => {
  Sentry.captureMessage(message);
};

export const logger = {
  init,
  Error,
  Information,
};
