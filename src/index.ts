import { createSocket } from "@yanzi/socket";
import MQTT from "async-mqtt";
import { readFileSync } from "fs";
import "make-promises-safe";
import { cirrusSampleSubscriptionToMqtt } from "./cirrus-to-mqtt/subscriptions";
import { login } from "./cirrus/login";
import {
  cirrusAccessToken,
  cirrusHost,
  cirrusPassword,
  cirrusUsername,
  discoveryTopicPrefix,
  locationId,
  mqttCaPath,
  mqttCertPath,
  mqttKeyPath,
  mqttProtocol,
  mqttUrl,
} from "./config";
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

  const ca = mqttCaPath ? readFileSync(mqttCaPath) : undefined;
  logger.info("Using CA: %s", ca ? "yes" : "no");
  const cert = mqttCertPath ? readFileSync(mqttCertPath) : undefined;
  logger.info("Using cert: %s", cert ? "yes" : "no");
  const key = mqttKeyPath ? readFileSync(mqttKeyPath) : undefined;
  logger.info("Using key: %s", key ? "yes" : "no");
  const protocol = (mqttProtocol ? (mqttProtocol as any) : undefined) ?? "mqtt";
  logger.info("Protocol: %s", protocol);

  const extra = {
    checkServerIdentity: () => {
      return null;
    },
  };
  logger.info("Connecting...");
  const mqttClient = await MQTT.connectAsync(mqttUrl, {
    ca,
    cert,
    key,
    protocol,
    connectTimeout: 3_000,
    rejectUnauthorized: false,
    ...extra,
  });
  mqttClient.on("reconnect", () => {
    logger.warn("MQTT client reconnected");
  });
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
