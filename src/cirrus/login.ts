import { YanziSocket } from "@yanzi/socket";
import { sessionIdFilePath } from "../config";
import { logger } from "../logger";
import { readFile, writeFile } from "fs/promises";

export async function login({
  socket,
  ...credentials
}: {
  socket: YanziSocket;
} & (
  | {
      username: string;
      password: string;
    }
  | { accessToken: string }
)) {
  try {
    const sessionIdFileContents = await readFile(sessionIdFilePath);
    const sessionId = sessionIdFileContents.toString("utf-8");
    const response = await socket.login({ sessionId });
    if (response.responseCode?.name === "success" && response.sessionId) {
      logger.debug("Logged in using sessionId");
      await writeFile(sessionIdFilePath, response.sessionId);
      return;
    }
  } catch (e) {
    logger.error(e);
  }

  const response = await socket.login(credentials);
  if (response.responseCode?.name === "success" && response.sessionId) {
    if ("accessToken" in credentials) {
      logger.debu("Logged in using accessToken");
    } else {
      logger.debug("Logged in using username/password (%s)", credentials.username);
    }
    await writeFile(sessionIdFilePath, response.sessionId);
    return;
  }
  throw new Error("Login failed.");
}
