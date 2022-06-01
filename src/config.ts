import { config } from "dotenv";
import { cleanEnv, str, url } from "envalid";

config();

export const {
  CIRRUS_PASSWORD: cirrusPassword,
  CIRRUS_USERNAME: cirrusUsername,
  CIRRUS_ACCESS_TOKEN: cirrusAccessToken,
  SESSION_ID_FILE: sessionIdFilePath,
  LOCATION_ID: locationId,
  DISCOVERY_TOPIC: discoveryTopicPrefix,
  MQTT_URL: mqttUrl,
  CIRRUS_HOST: cirrusHost,
  LOG_LEVEL: logLevel,

  MQTT_CA_PATH: mqttCaPath,
  MQTT_CERT_PATH: mqttCertPath,
  MQTT_KEY_PATH: mqttKeyPath,
  MQTT_PROTOCOL: mqttProtocol,
} = cleanEnv(process.env, {
  CIRRUS_USERNAME: str({ default: "" }),
  CIRRUS_PASSWORD: str({ default: "" }),
  CIRRUS_ACCESS_TOKEN: str({ default: "" }),
  SESSION_ID_FILE: str({ default: "/tmp/yanzi_session_id.txt" }),
  LOCATION_ID: str({}),
  DISCOVERY_TOPIC: str({ default: "homeassistant" }),
  MQTT_URL: url({ devDefault: "tcp://localhost:8883" }),
  MQTT_CA_PATH: str({ default: "", devDefault: "" }),
  MQTT_CERT_PATH: str({ default: "", devDefault: "" }),
  MQTT_KEY_PATH: str({ default: "", devDefault: "" }),
  MQTT_PROTOCOL: str({
    default: "",
    devDefault: "",
    choices: ["", "mqtt", "mqtts", "wss", "ws", "tcp", "ssl", "wx", "wxs"],
  }),
  CIRRUS_HOST: str({ default: "eu.yanzi.cloud" }),
  LOG_LEVEL: str({ default: "info", devDefault: "debug", choices: ["debug", "info", "warn", "error"] }),
});
