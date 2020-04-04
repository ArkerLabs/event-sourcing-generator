import { existsSync } from "fs";
import { join, resolve } from "path";

export function getBinaryPath(binary: string) {
    const subPath = join('.bin', binary);
    for (const path of module.paths) {
      const binaryPath = resolve(path, subPath);
      if (existsSync(binaryPath)) {
        return binaryPath;
      }
    }
    throw new Error(`Could not find the binary ${binary}`);
  }
  
  export function getLibPath(lib: string) {
    for (const path of module.paths) {
      const binaryPath = resolve(path, lib);
      if (existsSync(binaryPath)) {
        return binaryPath;
      }
    }
    throw new Error(`Could not find the library ${lib}`);
  }
  