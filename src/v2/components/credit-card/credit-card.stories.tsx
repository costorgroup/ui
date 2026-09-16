import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Flex } from '../../../index';
import type { TPaletteColor } from '../../../theme/types';
import { Button, CreditCard, Text } from '../../index';
import { detectCreditCardBrand } from './detect';

const COLORS: TPaletteColor[] = [
  'base',
  'primary',
  'secondary',
  'success',
  'error',
  'warning',
  'info',
  'dark',
  'light',
  'default',
  'inverted',
];

const meta: Meta<typeof CreditCard> = {
  title: 'V3/Data Display/CreditCard',
  component: CreditCard,
  tags: ['autodocs'],
  args: {
    number: '4111111111111111',
    name: 'Ada Lovelace',
    expiry: '08/28',
    cvv: '123',
    color: 'primary',
    rotate: false,
  },
  argTypes: {
    rotate: { control: 'boolean' },
    number: { control: 'text' },
    name: { control: 'text' },
    expiry: { control: 'text' },
    cvv: { control: 'text' },
    color: { control: 'select', options: COLORS },
  },
};

export default meta;

type Story = StoryObj<typeof CreditCard>;

export const Default: Story = {
  args: {
    number: '4111111111111111',
    name: 'Ada Lovelace',
    expiry: '08/28',
    cvv: '123',
    rotate: false,
  },
};

export const Rotate: Story = {
  args: {
    number: '378282246310005',
    name: 'Grace Hopper',
    expiry: '11/27',
    cvv: '1234',
    rotate: true,
  },
};

export const Flip: Story = {
  render: function FlipStory() {
    const [rotate, setRotate] = useState(false);

    return (
      <Flex direction="column" gap="md" align="center" style={{ width: 360 }}>
        <CreditCard
          number="5555555555554444"
          name="Alan Turing"
          expiry="04/29"
          cvv="321"
          rotate={rotate}
        />
        <Button variant="subtle" onClick={() => setRotate((open) => !open)}>
          {rotate ? 'Show front' : 'Show CVV'}
        </Button>
      </Flex>
    );
  },
};

const SAMPLES = [
  { number: '4111111111111111', name: 'Visa Holder' },
  { number: '5555555555554444', name: 'Mastercard Holder' },
  { number: '378282246310005', name: 'Amex Holder' },
  { number: '6011111111111117', name: 'Discover Holder' },
  { number: '3056930009020004', name: 'Diners Holder' },
  { number: '3530111333300000', name: 'JCB Holder' },
  { number: '6200000000000005', name: 'UnionPay Holder' },
  { number: '6759649826438453', name: 'Maestro Holder' },
];

export const Brands: Story = {
  render: () => (
    <Flex gap="lg" wrap="wrap">
      {SAMPLES.map((sample) => (
        <Flex
          key={sample.number}
          direction="column"
          gap="xs"
          style={{ width: 320 }}
        >
          <Text size="sm">{detectCreditCardBrand(sample.number)}</Text>
          <CreditCard
            number={sample.number}
            name={sample.name}
            expiry="12/30"
            cvv="123"
          />
        </Flex>
      ))}
    </Flex>
  ),
};

export const Colors: Story = {
  render: () => (
    <Flex gap="lg" wrap="wrap">
      {COLORS.map((color) => (
        <Flex key={color} direction="column" gap="xs" style={{ width: 280 }}>
          <Text size="sm">{color}</Text>
          <CreditCard
            color={color}
            name="Ada Lovelace"
            expiry="08/28"
            cvv="123"
            style={{ maxWidth: 'none' }}
          />
        </Flex>
      ))}
    </Flex>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex direction="column" gap="lg">
      {[220, 360, 520].map((width) => (
        <Flex key={width} direction="column" gap="xs" style={{ width }}>
          <Text size="sm">{width}px</Text>
          <CreditCard
            number="4111111111111111"
            name="Ada Lovelace"
            expiry="08/28"
            cvv="123"
            style={{ maxWidth: 'none' }}
          />
        </Flex>
      ))}
    </Flex>
  ),
};
