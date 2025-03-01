import { assertDefined } from "complete-common";
import { networkInterfaces } from "node:os";
import { app } from "./app.js";

const PORT = 6969;

/** The server will only listen on IP addresses that have this prefix. */
const BIND_IP_PREFIX = "172.";

const bindAddress = getBindAddress();
assertDefined(
  bindAddress,
  `Failed to find a valid bind address beginning with: ${BIND_IP_PREFIX}`,
);

// eslint-disable-next-line import-x/no-default-export
export default {
  hostname: bindAddress,
  port: PORT,
  fetch: app.fetch,
};

function getBindAddress(): string | undefined {
  const ipAddresses = Object.values(networkInterfaces())
    .filter((networkInterfaceInfo) => networkInterfaceInfo !== undefined)
    .flat()
    .map((networkInterfaceInfo) => networkInterfaceInfo.address);

  return ipAddresses.find((ipAddress) => ipAddress.startsWith(BIND_IP_PREFIX));
}
