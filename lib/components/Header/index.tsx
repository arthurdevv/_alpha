import React from 'react';
import { getCurrentWindow } from '@electron/remote';
import Menu from '../../../app/menu';
import Settings from '../../../app/settings/settings';
import { createSession } from '../../../app/session';
import { fitAddon } from '../../../app/core/addon';
import {
  Container,
  Wrapper,
  Actions,
  ActionItem,
  MacActions,
  MacActionItem,
  DragRegion,
  TabsGroup,
} from './styles';
import {
  CloseIcon,
  MinimizeIcon,
  MaximizeIcon,
  RestoreIcon,
  PlusIcon,
  SettingsIcon,
  MenuIcon,
} from '../Icon';

const Header: React.FC = () => {
  const isMac = process.platform === 'darwin';
  const currentWindow = getCurrentWindow();
  const isMaximized = currentWindow.isMaximized();
  const [maximized, setMaximized] = React.useState(isMaximized);

  const closeWindow = () => {
    currentWindow.close();
  };

  const minimizeWindow = () => {
    currentWindow.minimize();
  };

  const maximizeWindow = event => {
    const target = event.currentTarget;
    const isMaximized = currentWindow.isMaximized();
    const isFullScreen = currentWindow.isFullScreen();

    if (isMac) {
      currentWindow.setFullScreen(!isFullScreen);
      return;
    }

    if (isMaximized) {
      currentWindow.restore();
      target.ariaLabel = 'Maximize';
    } else {
      currentWindow.maximize();
      target.ariaLabel = 'Restore';
    }

    setMaximized(!maximized);

    setTimeout(() => fitAddon.fit(), 1000);
  };

  const openSettings = React.useCallback(() => {
    const settings = new Settings();
    settings.open();
  }, []);

  const openMenu = React.useCallback(event => {
    event.preventDefault();
    Menu.popup({ x: 8, y: 42, window: currentWindow });
  }, []);

  return isMac ? (
    <Container>
      <Wrapper>
        <MacActions>
          <MacActionItem onClick={closeWindow} aria-label="Close" />
          <MacActionItem onClick={minimizeWindow} aria-label="Minimize" />
          <MacActionItem onClick={maximizeWindow} aria-label="Maximize" />
        </MacActions>
        <TabsGroup className="tabs-group" role="tablist" aria-hidden="true" />
        <Actions>
          <ActionItem onClick={createSession} aria-label="New Terminal">
            <PlusIcon />
          </ActionItem>
        </Actions>
        <DragRegion />
        <Actions>
          <ActionItem onClick={openSettings} aria-label="Settings">
            <SettingsIcon />
          </ActionItem>
        </Actions>
      </Wrapper>
    </Container>
  ) : (
    <Container>
      <Wrapper>
        <Actions>
          <ActionItem onClick={openMenu} aria-label="Menu">
            <MenuIcon />
          </ActionItem>
        </Actions>
        <TabsGroup className="tabs-group" role="tablist" aria-hidden="true" />
        <Actions>
          <ActionItem onClick={createSession} aria-label="New Terminal">
            <PlusIcon />
          </ActionItem>
        </Actions>
        <DragRegion />
        <Actions>
          <ActionItem onClick={openSettings} aria-label="Settings">
            <SettingsIcon />
          </ActionItem>
          <ActionItem onClick={minimizeWindow} aria-label="Minimize">
            <MinimizeIcon />
          </ActionItem>
          <ActionItem onClick={maximizeWindow} aria-label="Maximize">
            {maximized ? <RestoreIcon /> : <MaximizeIcon />}
          </ActionItem>
          <ActionItem onClick={closeWindow} aria-label="Close">
            <CloseIcon />
          </ActionItem>
        </Actions>
      </Wrapper>
    </Container>
  );
};

export default React.memo(Header);
