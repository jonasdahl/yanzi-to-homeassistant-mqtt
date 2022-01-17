import { createSocket, YanziSocket } from "@yanzi/socket";
import MQTT, { AsyncClient, AsyncMqttClient } from "async-mqtt";
import "make-promises-safe";
import { cirrusSampleSubscriptionToMqtt } from "./cirrus-to-mqtt/subscriptions";
import { graphqlRequest } from "./cirrus/graphql";
import { login } from "./cirrus/login";
import {
  cirrusAccessToken,
  cirrusHost,
  cirrusPassword,
  cirrusUsername,
  discoveryTopicPrefix,
  locationId,
  mqttUrl,
} from "./config";
import { ControlDeviceDocument, OutputValue } from "./generated/graphql";
import { homeAssistantMqttConfiguration } from "./home-assistant/mqtt-config";
import { logger } from "./logger";

run()
  .catch((e) => {
    logger.error("Error, shutting down");
    logger.error(e);
  })
  .then(() => logger.info("Shutting down"))
  .then(() => process.exit(1));

async function run() {
  logger.info("Starting up...");
  logger.info("Connecting to MQTT broker with url %s...", mqttUrl);
  const mqttClient = await MQTT.connectAsync(mqttUrl);
  mqttClient.on("error", (e) => {
    logger.error(e);
    logger.error("An error occurred in the MQTT client. Exiting.");
    process.exit(1);
  });
  logger.info("Connected to MQTT broker");

  logger.info("Connecting to Yanzi Cirrus...");
  const socket = createSocket(`wss://${cirrusHost}/cirrusAPI`);
  socket.addEventListener("error", (e) => {
    logger.error(e);
    logger.error("An error occurred in the Yanzi Socket. Exiting.");
    process.exit(1);
  });
  socket.addEventListener("close", () => {
    logger.error("An error occurred in the Yanzi Socket. Exiting.");
    process.exit(1);
  });
  if (cirrusAccessToken) {
    logger.info("Logging in with accessToken");
    await login({ socket, accessToken: cirrusAccessToken } as any);
  } else {
    if (!cirrusPassword) {
      throw new Error("CIRRUS_ACCESS_TOKEN or CIRRUS_USERNAME + CIRRUS_PASSWORD must be in env");
    }
    logger.info("Logging in with username + password (%s)", cirrusUsername);
    await login({ socket, password: cirrusPassword, username: cirrusUsername });
  }
  logger.info("Cirrus connected and authenticated as %s", cirrusUsername);

  logger.info(
    "Starting main work loop, keeping both the Home Assistant configuration topics and Yanzi MQTT streams alive"
  );
  return Promise.race([
    cirrusSampleSubscriptionToMqtt({ mqttClient, socket, locationId }),
    homeAssistantMqttConfiguration({ mqttClient, socket, locationId, discoveryTopicPrefix }),
  ]);
  // TODO Maybe while (true) instead of crashing process on every fail?
}
