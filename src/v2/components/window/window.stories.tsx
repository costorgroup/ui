import type { Meta, StoryObj } from "@storybook/react-vite";
import { useTheme } from "@emotion/react";
import React, { ReactNode, useState } from "react";
import {
  Accordion,
  Button,
  Title,
  Switch,
  TextField,
  TextArea,
  Select,
  SelectOption,
  Window,
  WindowActions,
  WindowContent,
  WindowHead,
  List,
  ListItem,
  Tabs,
  Tab,
  AccordionGroup,
} from "../../index";
import { ChromaConicSpin } from "../../animated";

const BLUR_BACKDROP_IMAGE =
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGRlc2t0b3AlMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D";

const BlurBackdrop = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: 360,
      padding: 48,
      borderRadius: 12,
      overflow: "hidden",
    }}
  >
    <img
      src={BLUR_BACKDROP_IMAGE}
      alt=""
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
    <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
  </div>
);

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
    appearance: "transparent",
  },
  argTypes: {
    radius: {
      control: "select",
      options: ["none", "small", "medium", "large", "pill", "circle"],
    },
    appearance: {
      control: "select",
      options: ["transparent", "solid"],
    },
  },
  decorators: [
    (Story, context) => {
      const Backdrop =
        context.args.appearance === "solid" ? SolidBackdrop : BlurBackdrop;

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
          <Title as="h3">Workspace kit</Title>
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
    const { main } = theme.colors.info;
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
            <Title as="h3">Animated window</Title>
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
        <Title as="h3">Notifications</Title>
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
    appearance: "solid",
  },
  render: (args) => (
    <Window {...args} style={{ width: 340 }}>
      <WindowHead>
        <Title as="h3">Solid window</Title>
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
  render: function SettingsStory(args) {
    const [value, setValue] = useState("general");
    const [language, setLanguage] = useState("en");

    return (
      <Window style={{ width: 500 }} {...args}>
        <WindowHead>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              width: "100%",
            }}
          >
            <Title as="h3">Settings</Title>
            <Tabs
              appearance="transparent"
              color="info"
              value={value}
              onChange={setValue}
            >
              <Tab value="general">General</Tab>
              <Tab value="privacy">Privacy</Tab>
              <Tab value="advanced">Advanced</Tab>
            </Tabs>
            <AccordionGroup
              color="default"
              variant="surface"
              size="sm"
              radius="medium"
            >
              <Accordion summary="How do I rotate API keys?">
                Generate a new key from the developer console, update your apps,
                then revoke the old key once traffic has moved over.
              </Accordion>
              <Accordion summary="Where are access tokens stored?">
                Tokens are kept in your browser&apos;s local storage on this
                device. They are never sent to third-party services.
              </Accordion>
              <Accordion summary="Can I use a custom API endpoint?">
                Yes. Point the endpoint field at any HTTPS URL that implements
                the Costor API schema. Self-signed certificates are not
                supported.
              </Accordion>
            </AccordionGroup>
          </div>
        </WindowHead>
        <WindowContent>
          {value === "general" && (
            <List variant="surface" color="default" size="sm">
              <ListItem>
                <TextField
                  label="Display name"
                  description="Shown on your profile and in mentions."
                  defaultValue="Costor"
                  color="info"
                  variant="surface"
                  size="sm"
                />
              </ListItem>
              <ListItem>
                <TextField
                  label="Email"
                  type="email"
                  defaultValue="hello@costor.dev"
                  helperText="Used for account recovery."
                  color="info"
                  variant="surface"
                  size="sm"
                />
              </ListItem>
              <ListItem>
                <Select
                  label="Language"
                  renderValue={() =>
                    (({ en: "English", de: "German", sr: "Serbian" }) as const)[
                      language as "en" | "de" | "sr"
                    ]
                  }
                  color="info"
                  variant="surface"
                  size="sm"
                >
                  <SelectOption
                    aria-selected={language === "en"}
                    onClick={() => setLanguage("en")}
                  >
                    English
                  </SelectOption>
                  <SelectOption
                    aria-selected={language === "de"}
                    onClick={() => setLanguage("de")}
                  >
                    German
                  </SelectOption>
                  <SelectOption
                    aria-selected={language === "sr"}
                    onClick={() => setLanguage("sr")}
                  >
                    Serbian
                  </SelectOption>
                </Select>
              </ListItem>
              <ListItem>
                <Switch
                  direction="rtl-alt"
                  label="Push notifications"
                  description="Alerts for mentions and replies."
                  defaultChecked
                  color="info"
                  variant="surface"
                  style={{ width: "100%" }}
                />
              </ListItem>
              <ListItem>
                <Switch
                  direction="rtl-alt"
                  label="Email updates"
                  description="Weekly digest and product news."
                  color="info"
                  variant="subtle"
                  style={{ width: "100%" }}
                />
              </ListItem>
            </List>
          )}
          {value === "privacy" && (
            <List variant="surface" color="default" size="sm">
              <ListItem>
                <TextArea
                  label="Bio"
                  description="A short public summary. Keep it under 160 characters."
                  defaultValue="Building calm interfaces."
                  rows={3}
                  color="info"
                  variant="subtle"
                  size="sm"
                />
              </ListItem>
              <ListItem>
                <Select
                  label="Profile visibility"
                  defaultOpen={false}
                  renderValue={() => "Friends only"}
                  color="info"
                  variant="subtle"
                  size="sm"
                >
                  <SelectOption>Public</SelectOption>
                  <SelectOption aria-selected>Friends only</SelectOption>
                  <SelectOption>Private</SelectOption>
                </Select>
              </ListItem>
              <ListItem>
                <Switch
                  direction="rtl-alt"
                  label="Privacy mode"
                  description="Hide online status and read receipts."
                  color="info"
                  variant="subtle"
                  style={{ width: "100%" }}
                />
              </ListItem>
            </List>
          )}
          {value === "advanced" && (
            <List variant="surface" color="default" size="sm">
              <ListItem>
                <TextField
                  label="API endpoint"
                  defaultValue="https://api.costor.dev/v1"
                  color="info"
                  variant="subtle"
                  size="sm"
                />
              </ListItem>
              <ListItem>
                <TextField
                  label="Access token"
                  type="password"
                  defaultValue="••••••••••••••••"
                  helperText="Stored locally. Never shared with third parties."
                  color="info"
                  variant="subtle"
                  size="sm"
                />
              </ListItem>
              <ListItem>
                <Switch
                  direction="rtl-alt"
                  label="Developer tools"
                  description="Enable experimental diagnostics in the UI."
                  color="info"
                  variant="subtle"
                  style={{ width: "100%" }}
                />
              </ListItem>
            </List>
          )}
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
    );
  },
};

