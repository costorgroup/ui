export function collectPackageMap(rootDir: string): {
  subpaths: { subpath: string; source: string }[];
};

export function syncPackageFiles(
  rootDir: string,
  packageMap: { subpaths: { subpath: string; source: string }[] },
): void;

export function sourceToDistFile(source: string): string;
