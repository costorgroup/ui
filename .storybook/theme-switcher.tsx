import React from 'react';
import { Flex } from '../src/components/flex';
import { Text } from '../src/components/text';
import { Color } from '../src/v2/components/color';
import { themePresets } from '../src/theme/presets';
import type { TThemePresetId } from '../src/theme/presets';
import type { TColorSize } from '../src/v2/components/color/types';

type TThemeSwitcherProps = {
  active: TThemePresetId;
  onSelect: (id: TThemePresetId) => void;
  size?: TColorSize;
  labeled?: boolean;
  fixed?: boolean;
  justify?: 'flex-start' | 'flex-end' | 'center';
};

export const ThemeSwitcher = ({
  active,
  onSelect,
  size = 'sm',
  labeled = false,
  fixed = false,
  justify,
}: TThemeSwitcherProps) => {
  const switcher = (
    <Flex
      gap="sm"
      wrap="wrap"
      justify={justify ?? (labeled ? undefined : 'flex-end')}
    >
      {themePresets.map((preset) => {
        const swatch = (
          <Color
            size={size}
            selected={active === preset.id}
            colors={[
              preset.theme.colors.base.lighter,
              preset.theme.colors.base.main,
              preset.theme.colors.base.darker,
            ]}
            aria-label={preset.title}
            title={preset.title}
            onClick={() => onSelect(preset.id)}
          />
        );

        if (!labeled) {
          return <React.Fragment key={preset.id}>{swatch}</React.Fragment>;
        }

        return (
          <Flex
            key={preset.id}
            direction="column"
            gap="xs"
            align="center"
            shrink={0}
          >
            {swatch}
            <Text size="sm">{preset.title}</Text>
          </Flex>
        );
      })}
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
