# @costor/ui

React component library built with Emotion and TypeScript.

## Install

```bash
npm install @costor/ui @emotion/react @emotion/styled @emotion/cache @emotion/css
```

Peer dependencies: `react`, `react-dom`, and the Emotion packages above.

## Usage

```tsx
import { Button, ThemeProvider, GlobalStyles, createTheme } from '@costor/ui';

export const Example = () => (
  <ThemeProvider>
    <GlobalStyles />
    <Button variant="solid" size="medium">
      Click me
    </Button>
  </ThemeProvider>
);

// Optional: create a custom theme (Emotion has no createTheme — this is ours)
export const CustomTheme = () => (
  <ThemeProvider
    theme={createTheme({
      colors: {
        primary: { main: '#0055ff' },
      },
    })}
  >
    <GlobalStyles />
    <Button>Themed</Button>
  </ThemeProvider>
);
```

## Development

```bash
npm install
npm run storybook    # http://localhost:6006
npm run build        # outputs to dist/
npm run build:watch  # rebuilds dist/ on change
```

## Local testing in another project

You do **not** need to reinstall after every change if you link the package — `build:watch` updates `dist/`, and the link points at this folder.

### 1. In `@costor/ui` (this repo)

```bash
npm run build:watch
```

In a second terminal:

```bash
npm link
```

### 2. In the consumer project

```bash
npm link @costor/ui
```

Import and use as usual. After a rebuild, refresh / let Vite HMR pick it up. If the consumer Vite app doesn't see Emotion/React correctly (duplicate instances), add this to its `vite.config`:

```ts
resolve: {
  dedupe: ['react', 'react-dom', '@emotion/react', '@emotion/styled'],
},
```

### Alternative: `file:` dependency (no link)

In the consumer `package.json`:

```json
"@costor/ui": "file:../path/to/@costor/ui"
```

Then `npm install`. This copies/`file:`-resolves the package — after bigger changes you may need `npm install` again. Prefer `npm link` + `build:watch` for day-to-day work.

### Unlink when done

```bash
# consumer
npm unlink @costor/ui
npm install @costor/ui   # or remove if not published yet

# this repo
npm unlink -g @costor/ui
```

## Publish

```bash
npm run build
npm publish --access public
```
