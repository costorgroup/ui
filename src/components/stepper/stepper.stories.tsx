import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Button } from '../button';
import { Flex } from '../flex';
import { useSteps } from '../../hooks/use-steps';
import { Stepper } from './index';
import { Step } from './step';
import type { TStepperSize, TStepperVariant } from './types';

const steps = [
  { title: 'Details', description: 'Account info' },
  { title: 'Billing', description: 'Payment method', optional: true },
  { title: 'Confirm', description: 'Review & submit' },
];

const meta: Meta<typeof Stepper> = {
  title: 'Navigation/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    variant: {
      control: 'select',
      options: ['solid', 'subtle', 'surface', 'outline', 'plain'] satisfies TStepperVariant[],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'] satisfies TStepperSize[],
    },
    color: {
      control: 'select',
      options: [
        'base',
        'primary',
        'secondary',
        'success',
        'error',
        'warning',
        'info',
        'dark',
        'light',
      ],
    },
    alternativeLabel: { control: 'boolean' },
  },
  args: {
    orientation: 'horizontal',
    variant: 'solid',
    size: 'md',
    color: 'primary',
    alternativeLabel: false,
    defaultActiveStep: 1,
  },
};

export default meta;

type Story = StoryObj<typeof Stepper>;

export const Default: Story = {
  render: (args) => (
    <Stepper {...args}>
      {steps.map((step) => (
        <Step
          key={step.title}
          title={step.title}
          description={step.description}
          optional={step.optional}
        />
      ))}
    </Stepper>
  ),
};

export const Vertical: Story = {
  render: (args) => (
    <Stepper {...args} orientation="vertical" style={{ maxWidth: 420 }}>
      {steps.map((step) => (
        <Step
          key={step.title}
          title={step.title}
          description={step.description}
          optional={step.optional}
        >
          Extra guidance for <strong>{step.title}</strong> appears while this
          step is active or complete.
        </Step>
      ))}
    </Stepper>
  ),
};

export const AlternativeLabel: Story = {
  render: (args) => (
    <Stepper {...args} alternativeLabel>
      {steps.map((step) => (
        <Step
          key={step.title}
          title={step.title}
          description={step.description}
        />
      ))}
    </Stepper>
  ),
};

export const Variants: Story = {
  render: () => (
    <Flex direction="column" gap={32}>
      {(['solid', 'subtle', 'surface', 'outline', 'plain'] as const).map((variant) => (
        <div key={variant}>
          <p style={{ margin: '0 0 8px', fontWeight: 600 }}>{variant}</p>
          <Stepper variant={variant} color="primary" defaultActiveStep={1}>
            {steps.map((step) => (
              <Step
                key={step.title}
                title={step.title}
                description={step.description}
              />
            ))}
          </Stepper>
        </div>
      ))}
    </Flex>
  ),
};

export const Colors: Story = {
  render: () => (
    <Flex direction="column" gap={24}>
      {(['primary', 'secondary', 'success', 'info'] as const).map((color) => (
        <Stepper key={color} color={color} defaultActiveStep={1}>
          {steps.map((step) => (
            <Step key={step.title} title={step.title} />
          ))}
        </Stepper>
      ))}
    </Flex>
  ),
};

export const Interactive: Story = {
  render: () => {
    const { activeStep, goToNext, goToPrevious, setActiveStep } = useSteps({
      index: 0,
      count: steps.length,
    });

    return (
      <Flex direction="column" gap={16}>
        <Stepper activeStep={activeStep} onChange={setActiveStep} color="primary">
          {steps.map((step) => (
            <Step
              key={step.title}
              title={step.title}
              description={step.description}
              optional={step.optional}
            />
          ))}
        </Stepper>
        <Flex gap={8}>
          <Button
            variant="outline"
            color="base"
            disabled={activeStep === 0}
            onClick={goToPrevious}
          >
            Back
          </Button>
          <Button
            color="primary"
            disabled={activeStep >= steps.length - 1}
            onClick={goToNext}
          >
            Next
          </Button>
        </Flex>
      </Flex>
    );
  },
};

export const ErrorStep: Story = {
  render: () => (
    <Stepper defaultActiveStep={1} color="primary">
      <Step title="Details" description="Account info" />
      <Step title="Billing" description="Card declined" error />
      <Step title="Confirm" description="Review & submit" />
    </Stepper>
  ),
};
