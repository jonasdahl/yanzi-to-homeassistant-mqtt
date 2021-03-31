import { config } from "dotenv";
import { cleanEnv, str, url } from "envalid";

config();
export const {
  CIRRUS_PASSWORD: cirrusPassword,
  CIRRUS_USERNAME: cirrusUsername,
  SESSION_ID_FILE: sessionIdFilePath,
  LOCATION_ID: locationId,
  DISCOVERY_TOPIC: discoveryTopicPrefix,
  MQTT_URL: mqttUrl,
  CIRRUS_HOST: cirrusHost,
  LOG_LEVEL: logLevel,
} = cleanEnv(process.env, {
  CIRRUS_USERNAME: str({}),
  CIRRUS_PASSWORD: str({}),
  SESSION_ID_FILE: str({ default: "/tmp/yanzi_session_id.txt" }),
  LOCATION_ID: str({}),
  DISCOVERY_TOPIC: str({ default: "homeassistant" }),
  MQTT_URL: url({ devDefault: "tcp://jonas:test@localhost:1883" }),
  CIRRUS_HOST: str({ default: "eu.yanzi.cloud" }),
  LOG_LEVEL: str({ default: "info", devDefault: "debug", choices: ["debug", "info", "warn", "error"] }),
});
