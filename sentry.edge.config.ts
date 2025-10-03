// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://35939d22fd8670d924461ea87819be81@o4510125656309760.ingest.us.sentry.io/4510125657554944",
  tracesSampleRate: 1,
  enableLogs: true,
  debug: false,
});
