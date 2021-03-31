import pino from "pino";
import { logLevel } from "./config";

export const logger = pino({ level: logLevel });
