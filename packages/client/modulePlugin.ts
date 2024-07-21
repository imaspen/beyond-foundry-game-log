import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import type { Plugin } from "vite";
import { author, version } from "./package.json";

export interface ModulePluginProps {
  modulePath: string;
}

export function modulePlugin({ modulePath }: ModulePluginProps): Plugin {
  let outDir: string;
  return {
    name: "transform-file",
    configResolved(_config) {
      outDir = _config.build.outDir;
    },
    async writeBundle() {
      const module = JSON.parse(
        await readFile(modulePath, { encoding: "utf8" }),
      );
      module.version = version;
      module.authors = [author];
      module.download = `https://github.com/imaspen/beyond-foundry-game-log/releases/download/client%2Fv${version}/module.zip`;
      await writeFile(
        join(outDir, "module.json"),
        JSON.stringify(module, undefined, 2),
      );
    },
  };
}
