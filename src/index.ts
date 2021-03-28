import { createSocket, YanziSocket } from "@yanzi/socket";
import MQTT, { AsyncClient } from "async-mqtt";
import "make-promises-safe";
import { cirrusSampleSubscriptionToMqtt } from "./cirrus-to-mqtt/subscriptions";
import { login } from "./cirrus/login";
import { cirrusHost, cirrusPassword, cirrusUsername, discoveryTopicPrefix, locationId, mqttUrl } from "./config";
import { homeAssistantMqttConfiguration } from "./home-assistant/mqtt-config";
import { logger } from "./logger";

run()
  .catch((e) => {
    logger.error(e);
    logger.error("Error, shutting down");
  })
  .then(() => logger.info("Shutting down"))
  .then(() => process.exit(1));

async function run() {
  logger.info("Connecting to MQTT broker...");
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
  await login({ socket, password: cirrusPassword, username: cirrusUsername });
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
