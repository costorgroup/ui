import type { Meta, StoryObj } from "@storybook/react-vite";
import { useTheme } from "@emotion/react";
import React, { ReactNode, useState } from "react";
import {
  Button,
  Heading,
  Window,
  WindowActions,
  WindowContent,
  WindowHead,
} from "../../index";
import { ChromaConicSpin } from "../../animated";
import { BlurBackdrop, SettingsPreview } from "./settings-preview";

const SolidBackdrop = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: 360,
      padding: 48,
      borderRadius: 12,
      backgroundColor: "#2a2a2a",
    }}
  >
    {children}
  </div>
);

const meta: Meta<typeof Window> = {
  title: "V2/Data Display/Window",
  component: Window,
  tags: ["autodocs"],
  args: {
    radius: "large",
    appearance: "opaque",
  },
  argTypes: {
    radius: {
      control: "select",
      options: ["none", "small", "medium", "large", "pill", "circle"],
    },
    appearance: {
      control: "select",
      options: ["transparent", "opaque"],
    },
  },
  decorators: [
    (Story, context) => {
      if (context.parameters.windowBackdrop === false) {
        return <Story />;
      }

      const Backdrop =
        context.args.appearance === "opaque" ? SolidBackdrop : BlurBackdrop;

      return (
        <Backdrop>
          <Story />
        </Backdrop>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof Window>;

export const Default: Story = {
  render: function DefaultStory(args) {
    const [open, setOpen] = useState(true);

    if (!open) {
      return <Button onClick={() => setOpen(true)}>Show window</Button>;
    }

    return (
      <Window {...args} style={{ width: 360 }}>
        <WindowHead onClose={() => setOpen(false)}>
          <Heading as="h3">Workspace kit</Heading>
        </WindowHead>
        <WindowContent>
          Frosted window shell with a white content panel and right-aligned
          actions.
        </WindowContent>
        <WindowActions>
          <Button size="sm" color="default" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button size="sm" color="info" onClick={() => setOpen(false)}>
            Confirm
          </Button>
        </WindowActions>
      </Window>
    );
  },
};

export const WithChromaBorder: Story = {
  render: function WithChromaBorderStory(args) {
    const theme = useTheme();
    const { main } = theme.palette.info;
    const chromaColors = [main, "transparent", main, "transparent"];

    return (
      <ChromaConicSpin
        play="always"
        thickness={1}
        colors={chromaColors}
        radius="large"
        style={{ width: 380 }}
      >
        <Window {...args}>
          <WindowHead>
            <Heading as="h3">Animated window</Heading>
          </WindowHead>
          <WindowContent>
            Info and transparent segments in the spinning chroma border.
          </WindowContent>
          <WindowActions>
            <Button size="sm" color="default">
              Cancel
            </Button>
            <Button size="sm" color="info">
              Save
            </Button>
          </WindowActions>
        </Window>
      </ChromaConicSpin>
    );
  },
};

export const WithHead: Story = {
  render: (args) => (
    <Window {...args} style={{ width: 340 }}>
      <WindowHead>
        <Heading as="h3">Notifications</Heading>
      </WindowHead>
      <WindowContent>
        White content area inside the frosted window.
      </WindowContent>
      <WindowActions>
        <Button size="sm" color="default">
          Dismiss
        </Button>
        <Button size="sm" color="info">
          Save
        </Button>
      </WindowActions>
    </Window>
  ),
};

export const Solid: Story = {
  args: {
    appearance: "opaque",
  },
  render: (args) => (
    <Window {...args} style={{ width: 340 }}>
      <WindowHead>
        <Heading as="h3">Solid window</Heading>
      </WindowHead>
      <WindowContent>
        Flat surface fill without gradient or backdrop blur.
      </WindowContent>
      <WindowActions>
        <Button size="sm" color="default">
          Dismiss
        </Button>
        <Button size="sm" color="info">
          Save
        </Button>
      </WindowActions>
    </Window>
  ),
};

export const Settings: Story = {
  render: (args) => <SettingsPreview {...args} />,
};

