// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node"

Sentry.init({
 dsn: "https://8fee07b6c5028e500357cfce8e9441f2@o4509795734192128.ingest.us.sentry.io/4509795858317312",  
 integrations: [
    [Sentry.mongooseIntegration()]
  ],
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});