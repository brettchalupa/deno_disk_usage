/**
 * This module contains the interface defining `DiskUsage` and the function to
 * get the disk usage of a given path with `getDiskUsage("/Some/Path")`
 * @module
 */

/**
 * Details on how much of a given disk is used
 */
export interface DiskUsage {
  path: string;
  percentageUsed: number;
  /**
   * in mebibytes
   */
  used: number;
  /**
   * in mebibytes
   */
  size: number;
}

/**
 * Determine how much of the disk is used at the specified path.
 *
 * Requires `df` to be installed on the system.
 */
export async function getDiskUsage(path: string): Promise<DiskUsage | null> {
  try {
    const process = new Deno.Command("df", {
      args: ["-m", path],
      stdout: "piped",
      stderr: "piped",
    });

    const output = await process.output();
    const error = output.stderr;

    if (!output.success) {
      const errorString = new TextDecoder().decode(error);
      throw new Error(`df command failed: ${errorString}`);
    }

    const outputString = new TextDecoder().decode(output.stdout);
    const lines = outputString.split("\n");

    let targetLine: string | undefined;
    for (const line of lines) {
      if (line.includes(path)) {
        targetLine = line;
        break;
      }
    }

    if (!targetLine) {
      throw new Error(`Path "${path}" not found in df output.`);
    }

    const parts = targetLine.split(/\s+/).filter((part) => part !== "");
    if (parts.length < 5) {
      throw new Error("Unexpected df output format.");
    }

    return {
      path,
      used: parseInt(parts[2]),
      size: parseInt(parts[1]),
      percentageUsed: parseInt(parts[4].replace("%", "")),
    };
  } catch (error) {
    console.error("Error getting disk usage:", error);
    return null;
  }
}
