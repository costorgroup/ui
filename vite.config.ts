import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { collectPackageMap, sourceToDistFile, syncPackageFiles } from './scripts/package-map.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageMap = collectPackageMap(__dirname);
syncPackageFiles(__dirname, packageMap);

const libEntry = {
  index: resolve(__dirname, 'src/index.ts'),
  ...Object.fromEntries(
    packageMap.subpaths.map((entry) => [
      sourceToDistFile(entry.source),
      resolve(__dirname, entry.source),
    ]),
  ),
};

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^@costor\/ui$/,
        replacement: resolve(__dirname, 'src/index.ts'),
      },
      ...packageMap.subpaths
        .slice()
        .sort((a, b) => b.subpath.length - a.subpath.length)
        .map((entry) => ({
          find: new RegExp(
            `^@costor\\/ui\\/${entry.subpath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`,
          ),
          replacement: resolve(__dirname, entry.source),
        })),
    ],
  },
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    dts({
      include: ['src'],
      exclude: ['src/**/*.stories.tsx'],
      rollupTypes: false,
      tsconfigPath: './tsconfig.json',
      entryRoot: 'src',
    }),
  ],
  build: {
    lib: {
      entry: libEntry,
      name: 'CostorUI',
      formats: ['es', 'cjs'],
      fileName: (format, entryName) =>
        format === 'es' ? `${entryName}.js` : `${entryName}.cjs`,
    },
    rollupOptions: {
      external: (id) =>
        id === 'react' ||
        id === 'react-dom' ||
        id === 'react/jsx-runtime' ||
        id === 'dayjs' ||
        id.startsWith('dayjs/') ||
        id === 'luxon' ||
        id === 'moment' ||
        id === 'date-fns' ||
        id.startsWith('date-fns/') ||
        id.startsWith('@emotion/') ||
        id.startsWith('@tiptap/'),
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@emotion/react': 'emotionReact',
          '@emotion/styled': 'emotionStyled',
          '@emotion/cache': 'emotionCache',
          '@emotion/css': 'emotionCss',
          dayjs: 'dayjs',
          luxon: 'luxon',
          moment: 'moment',
          'date-fns': 'dateFns',
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
