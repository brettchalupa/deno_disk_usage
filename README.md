# Deno Disk Usage

A simple program and function to determine disk usage from a Deno program.

Deno does not include anything in its stdlib that returns disk size, usage, and
free space. So this parses out the results of the `df` command, which is wildly
available on \*nix systems.

It's unclear how precise the data is, but it's good enough for some simple
checking and monitoring.

Ideally Deno would include this data like it does for CPU and RAM. Another
option could be to try to use the Rust
[sysinfo](https://crates.io/crates/sysinfo) crate to get these details.

## Run

On macOS, here's how this could be used:

```
deno run --allow-run main.ts /System/Volumes/Data
```

Which outputs:

``` console
$ deno run -A main.ts /System/Volumes/Data
/System/Volumes/Data disk usage: 66 %
/System/Volumes/Data used: 290010 MB
/System/Volumes/Data used: 471482 MB
```

## Use the Function

Drop the `DiskUsage` interface and the `getDiskUsage()` function into your
project and then call it:

```ts
const diskUsage = await getDiskUsage();

console.log(`${diskUsage.percentageUsed}% of ${diskUage.path} disk used`);
```

## License

Public Domain (CC0)
