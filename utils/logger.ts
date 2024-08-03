import * as Sentry from "@sentry/react-native";

const init = () => {
  Sentry.init({
    dsn: "YOUR_DSN_HERE",
    // Other configuration options
  });
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
