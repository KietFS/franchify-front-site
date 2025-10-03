// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://35939d22fd8670d924461ea87819be81@o4510125656309760.ingest.us.sentry.io/4510125657554944",
  tracesSampleRate: 1,
  enableLogs: true,
  debug: false,
});
