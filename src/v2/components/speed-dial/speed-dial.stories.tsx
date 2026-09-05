import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { CSSProperties } from "react";
import { CheckIcon, ImageIcon, UploadIcon } from "../../../icons";
import { IconButton, SpeedDial } from "../../index";

const frame: CSSProperties = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 600,
  height: 400,
  overflow: "hidden",
  border: "1px solid #e5e7eb",
  background: "#f8fafc",
};

const meta: Meta<typeof SpeedDial> = {
  title: "V2/Buttons/SpeedDial",
  component: SpeedDial,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={frame}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    itemsDirection: {
      control: "select",
      options: ["left", "top", "right", "bottom"],
    },
    itemsGap: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl"],
    },
    gap: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    variant: {
      control: "select",
      options: ["solid", "subtle", "surface", "outline", "ghost", "plain"],
    },
    color: {
      control: "select",
      options: [
        "base",
        "primary",
        "secondary",
        "success",
        "error",
        "warning",
        "info",
      ],
    },
  },
};

export default meta;

type Story = StoryObj<typeof SpeedDial>;

const Actions = () => (
  <>
    <IconButton aria-label="Upload" rounded color="dark" size="md">
      <UploadIcon />
    </IconButton>
    <IconButton aria-label="Image" rounded color="dark" size="md">
      <ImageIcon />
    </IconButton>
    <IconButton aria-label="Done" rounded color="dark" size="md">
      <CheckIcon />
    </IconButton>
  </>
);

export const Default: Story = {
  args: {
    itemsDirection: "top",
    itemsGap: "sm",
    gap: "md",
    color: "primary",
    variant: "solid",
    size: "lg",
    "aria-label": "Create",
  },
  render: (args) => (
    <SpeedDial {...args}>
      <Actions />
    </SpeedDial>
  ),
};

export const Right: Story = {
  render: () => (
    <SpeedDial
      itemsDirection="right"
      aria-label="Create"
      color="info"
      size="xl"
    >
      <Actions />
    </SpeedDial>
  ),
};

export const Bottom: Story = {
  render: () => (
    <SpeedDial
      itemsDirection="bottom"
      aria-label="Create"
      color="info"
      size="xl"
    >
      <Actions />
    </SpeedDial>
  ),
};

export const SubtleTrigger: Story = {
  render: () => (
    <SpeedDial variant="surface" color="info" aria-label="Create">
      <Actions />
    </SpeedDial>
  ),
};

