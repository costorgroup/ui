import { collectPackageMap, syncPackageFiles } from './package-map.mjs';

const rootDir = process.cwd();
syncPackageFiles(rootDir, collectPackageMap(rootDir));
