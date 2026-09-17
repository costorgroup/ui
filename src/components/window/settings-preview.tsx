import React, { ReactNode, useState } from 'react';
import {
  Accordion,
  AccordionGroup,
  Button,
  CreditCard,
  List,
  ListItem,
  Select,
  Switch,
  Tab,
  Tabs,
  TextArea,
  TextField,
  Heading,
  Window,
  WindowActions,
  WindowContent,
  WindowHeader,
} from '../..';
import type { TWindowProps } from './types';

export const BLUR_BACKDROP_IMAGE =
  'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGRlc2t0b3AlMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D';

export const BlurBackdrop = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 360,
      padding: 48,
      borderRadius: 12,
      overflow: 'hidden',
    }}
  >
    <img
      src={BLUR_BACKDROP_IMAGE}
      alt=""
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }}
    />
    <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
  </div>
);

export const SettingsPreview = (props: TWindowProps) => {
  const [value, setValue] = useState('general');
  const [language, setLanguage] = useState('en');

  return (
    <Window style={{ width: 500 }} {...props}>
      <WindowHeader>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            width: '100%',
          }}
        >
          <Heading as="h3">Settings</Heading>
          <Tabs
            color="default"
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
              Yes. Point the endpoint field at any HTTPS URL that implements the
              Costor API schema. Self-signed certificates are not supported.
            </Accordion>
          </AccordionGroup>
        </div>
      </WindowHeader>
      <WindowContent>
        {value === 'general' && (
          <List variant="surface" color="default" size="sm">
            <ListItem>
              <CreditCard
                name="Costor"
                expiry="08/28"
                cvv="123"
                color="primary"
                style={{ maxWidth: '100%' }}
              />
            </ListItem>
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
                options={['en', 'de', 'sr']}
                value={language}
                onChange={(_, next) => setLanguage(next as string)}
                getOptionLabel={(code) =>
                  ({ en: 'English', de: 'German', sr: 'Serbian' })[
                    code as 'en' | 'de' | 'sr'
                  ]
                }
                color="info"
                variant="surface"
                size="sm"
              />
            </ListItem>
            <ListItem>
              <Switch
                direction="rtl-alt"
                label="Push notifications"
                description="Alerts for mentions and replies."
                defaultChecked
                color="info"
                variant="surface"
                style={{ width: '100%' }}
              />
            </ListItem>
            <ListItem>
              <Switch
                direction="rtl-alt"
                label="Email updates"
                description="Weekly digest and product news."
                color="info"
                variant="subtle"
                style={{ width: '100%' }}
              />
            </ListItem>
          </List>
        )}
        {value === 'privacy' && (
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
                options={['Public', 'Friends only', 'Private']}
                defaultValue="Friends only"
                color="info"
                variant="subtle"
                size="sm"
              />
            </ListItem>
            <ListItem>
              <Switch
                direction="rtl-alt"
                label="Privacy mode"
                description="Hide online status and read receipts."
                color="info"
                variant="subtle"
                style={{ width: '100%' }}
              />
            </ListItem>
          </List>
        )}
        {value === 'advanced' && (
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
                style={{ width: '100%' }}
              />
            </ListItem>
          </List>
        )}
      </WindowContent>
      <WindowActions>
        <Button size="sm" color="default" variant='plain'>
          Cancel
        </Button>
        <Button size="sm" color="default">
          Save
        </Button>
      </WindowActions>
    </Window>
  );
};
