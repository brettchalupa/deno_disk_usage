# Deno Disk Usage

A simple program and function to determine disk usage from a Deno program.

Deno does not include anything in its stdlib that returns disk size, usage, and
free space. So this parses out the results of the `df` command, which is wildly
available on \*nix systems.

It's unclear how precise the data is (as in I never heard of a mebibyte before
writing this code), but it's good enough for some simple checking and
monitoring.

Ideally Deno would include this data like it does for CPU and RAM. Another
option could be to try to use the Rust
[sysinfo](https://crates.io/crates/sysinfo) crate to get these details.

## Run

On macOS, here's how this could be used:

```
deno run --allow-run jsr:@brettchalupa/deno-disk-usage/cli /System/Volumes/Data
```

You can pass multiple disks in as separate args.

Which outputs:

```console
/System/Volumes/Data disk usage: 66 %
/System/Volumes/Data used: 290010 MB
/System/Volumes/Data used: 471482 MB
```

## Use the Function

Drop the `DiskUsage` interface and the `getDiskUsage()` function into your
project and then call it:

```ts
import { getDiskUsage } from "jsr:@brettchalupa/deno-disk-usage";

const diskUsage = await getDiskUsage();

console.log(`${diskUsage.percentageUsed}% of ${diskUage.path} disk used`);
```

Or add it to your Deno project with:

```
deno add jsr:@brettchalupa/deno-disk-usage
```

And import it with:

```ts
import { getDiskUsage } from "@brettchalupa/deno-disk-usage";
```

## License

Unlicense - Public Domain

---

## Dev Notes

New versions are automatically published when code is pushed to `main` with a
bumped `version` in `deno.json`.
