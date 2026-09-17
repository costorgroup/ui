import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { CheckIcon } from '../../icons';
import { Stepper } from './';
import {
  Step,
  StepBody,
  StepLabels,
  StepMain,
  StepRail,
} from './step';
import { StepContent } from './step-content';
import { StepDescription } from './step-description';
import { StepIndicator } from './step-indicator';
import { StepNumber } from './step-number';
import { StepSeparator } from './step-separator';
import { StepStatus } from './step-status';
import { StepTitle } from './step-title';

const meta: Meta<typeof Stepper> = {
  title: 'Navigation/Stepper/Parts',
  component: Stepper,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Stepper>;

export const HorizontalParts: Story = {
  render: () => (
    <Stepper defaultActiveStep={1} color="secondary" variant="surface">
      <Step>
        <StepMain>
          <StepIndicator>
            <StepStatus
              complete={<CheckIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>
          <StepLabels>
            <StepTitle>Cart</StepTitle>
            <StepDescription>Review items</StepDescription>
          </StepLabels>
        </StepMain>
        <StepSeparator />
      </Step>
      <Step>
        <StepMain>
          <StepIndicator>
            <StepStatus
              complete={<CheckIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>
          <StepLabels>
            <StepTitle>Shipping</StepTitle>
            <StepDescription>Address & method</StepDescription>
          </StepLabels>
        </StepMain>
        <StepSeparator />
      </Step>
      <Step>
        <StepMain>
          <StepIndicator>
            <StepStatus
              complete={<CheckIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>
          <StepLabels>
            <StepTitle>Pay</StepTitle>
            <StepDescription>Confirm order</StepDescription>
          </StepLabels>
        </StepMain>
        <StepSeparator />
      </Step>
    </Stepper>
  ),
};

export const VerticalParts: Story = {
  render: () => (
    <Stepper
      orientation="vertical"
      defaultActiveStep={1}
      color="info"
      variant="outline"
      style={{ maxWidth: 440 }}
    >
      <Step>
        <StepRail>
          <StepIndicator>
            <StepStatus
              complete={<CheckIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>
          <StepSeparator />
        </StepRail>
        <StepBody>
          <StepLabels>
            <StepTitle>Profile</StepTitle>
            <StepDescription>Name and email</StepDescription>
          </StepLabels>
          <StepContent>Profile fields go here when this step is open.</StepContent>
        </StepBody>
      </Step>
      <Step>
        <StepRail>
          <StepIndicator>
            <StepStatus
              complete={<CheckIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>
          <StepSeparator />
        </StepRail>
        <StepBody>
          <StepLabels>
            <StepTitle>Preferences</StepTitle>
            <StepDescription>Notifications</StepDescription>
          </StepLabels>
          <StepContent>Toggle notification channels in this step.</StepContent>
        </StepBody>
      </Step>
      <Step>
        <StepRail>
          <StepIndicator>
            <StepStatus
              complete={<CheckIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>
          <StepSeparator />
        </StepRail>
        <StepBody>
          <StepLabels>
            <StepTitle>Done</StepTitle>
            <StepDescription>You're all set</StepDescription>
          </StepLabels>
        </StepBody>
      </Step>
    </Stepper>
  ),
};
