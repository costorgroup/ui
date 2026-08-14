import {
  existsSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { basename, dirname, join, relative } from 'node:path';

export const kebabToPascal = (value) =>
  value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

const toPosix = (value) => value.replaceAll('\\', '/');

const walkIndexFiles = (dir) => {
  const out = [];

  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      out.push(...walkIndexFiles(full));
      continue;
    }

    if (name === 'index.ts' || name === 'index.tsx') {
      out.push(full);
    }
  }

  return out;
};

export const collectPackageMap = (rootDir) => {
  const componentsDir = join(rootDir, 'src', 'components');
  const bySubpath = new Map();

  for (const file of walkIndexFiles(componentsDir)) {
    const relFromComponents = toPosix(relative(componentsDir, dirname(file)));
    if (!relFromComponents || relFromComponents === '.') {
      continue;
    }

    const folderName = basename(relFromComponents);
    const subpath = kebabToPascal(folderName);
    const source = toPosix(relative(rootDir, file));
    const existing = bySubpath.get(subpath);

    if (existing && existing.source !== source) {
      throw new Error(
        `Duplicate package subpath "${subpath}" from ${existing.source} and ${source}`,
      );
    }

    bySubpath.set(subpath, { subpath, source });
  }

  const adaptersDir = join(rootDir, 'src', 'adapters');
  bySubpath.set('adapters', {
    subpath: 'adapters',
    source: 'src/adapters/index.ts',
  });

  for (const name of readdirSync(adaptersDir)) {
    if (name === 'index.ts' || !name.endsWith('.ts')) {
      continue;
    }

    const subpath = `adapters/${name.replace(/\.ts$/, '')}`;
    bySubpath.set(subpath, {
      subpath,
      source: `src/adapters/${name}`,
    });
  }

  const subpaths = [...bySubpath.values()].sort((a, b) =>
    a.subpath.localeCompare(b.subpath),
  );

  return { subpaths };
};

const exportCondition = (distFile) => ({
  types: `./dist/${distFile}.d.ts`,
  import: `./dist/${distFile}.js`,
  require: `./dist/${distFile}.cjs`,
});

export const sourceToDistFile = (source) =>
  source.replace(/^src\//, '').replace(/\.tsx?$/, '');

const writeIfChanged = (filePath, contents) => {
  const next = contents.endsWith('\n') ? contents : `${contents}\n`;
  if (existsSync(filePath) && readFileSync(filePath, 'utf8') === next) {
    return;
  }
  writeFileSync(filePath, next);
};

export const syncPackageFiles = (rootDir, packageMap) => {
  const paths = {
    '@costor/ui': ['./src/index.ts'],
  };

  for (const entry of packageMap.subpaths) {
    paths[`@costor/ui/${entry.subpath}`] = [`./${entry.source}`];
  }

  writeIfChanged(
    join(rootDir, 'tsconfig.paths.json'),
    JSON.stringify(
      {
        compilerOptions: {
          baseUrl: '.',
          paths,
        },
      },
      null,
      2,
    ),
  );

  const packageJsonPath = join(rootDir, 'package.json');
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
  const exports = {
    '.': exportCondition('index'),
    './package.json': './package.json',
  };

  for (const entry of packageMap.subpaths) {
    exports[`./${entry.subpath}`] = exportCondition(sourceToDistFile(entry.source));
  }

  packageJson.exports = exports;
  writeIfChanged(packageJsonPath, JSON.stringify(packageJson, null, 2));
};
