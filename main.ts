/**
 * This module contains a simple CLI that prints the disk usage for the paths passed in as args.
 * @module
 */

import { getDiskUsage } from "./mod.ts";

function main() {
  Deno.args.forEach(async (disk) => {
    const diskUsage = await getDiskUsage(disk);
    if (diskUsage) {
      console.log(`${disk} disk usage:`, diskUsage.percentageUsed, "%");
      console.log(`${disk} used:`, diskUsage.used, "MiB");
      console.log(`${disk} used:`, diskUsage.size, "MiB");
    }
  });
}

if (import.meta.main) {
  main();
}
