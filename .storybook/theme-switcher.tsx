import React from 'react';
import { Flex } from '../src/components/flex';
import { Text } from '../src/components/text';
import { Color } from '../src/v2/components/color';
import { accentSwatch } from '../src/theme/palettes';
import { useTheme } from '../src/theme/use-theme';
import type { TColorSize } from '../src/v2/components/color/types';

type TThemeSwitcherProps = {
  size?: TColorSize;
  labeled?: boolean;
  fixed?: boolean;
  justify?: 'flex-start' | 'flex-end' | 'center';
};

export const ThemeSwitcher = ({
  size = 'sm',
  labeled = false,
  fixed = false,
  justify,
}: TThemeSwitcherProps) => {
  const {
    accent,
    accents,
    appearance,
    allowedAppearances,
    setAccent,
    setAppearance,
  } = useTheme();

  const switcher = (
    <Flex direction="column" gap="sm">
      <Flex gap="xs" wrap="wrap" justify={justify ?? 'center'}>
        {allowedAppearances.map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => setAppearance(mode)}
            aria-pressed={appearance === mode}
            style={{
              margin: 0,
              padding: '4px 10px',
              border:
                appearance === mode
                  ? '1px solid currentColor'
                  : '1px solid transparent',
              borderRadius: 8,
              background: 'transparent',
              color: 'inherit',
              cursor: 'pointer',
              textTransform: 'capitalize',
            }}
          >
            {mode}
          </button>
        ))}
      </Flex>
      <Flex
        gap="sm"
        wrap="wrap"
        justify={justify ?? (labeled ? undefined : 'flex-end')}
      >
        {accents.map((item) => {
          const swatch = (
            <Color
              size={size}
              selected={accent === item.id}
              colors={accentSwatch(item)}
              aria-label={item.name}
              title={item.name}
              onClick={() => setAccent(item.id)}
            />
          );

          if (!labeled) {
            return <React.Fragment key={item.id}>{swatch}</React.Fragment>;
          }

          return (
            <Flex
              key={item.id}
              direction="column"
              gap="xs"
              align="center"
              shrink={0}
            >
              {swatch}
              <Text size="sm">{item.name}</Text>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );

  if (!fixed) {
    return switcher;
  }

  return (
    <div
      style={{
        position: 'fixed',
        right: 16,
        bottom: 16,
        zIndex: 9999,
        maxWidth: 196,
      }}
    >
      {switcher}
    </div>
  );
};
