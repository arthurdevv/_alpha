import React from 'react';
import Menu from '../../../app/menu';
import Session from '../../../app/core/session';
import Settings from '../../../app/settings/settings';
import { fitAddon } from '../../../app/core/addon';
import { isMac, currentWindow } from '../../../app/constants';
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

  const createSession = React.useCallback(() => {
    const session = new Session();
    session.create();
  }, []);

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
          <MacActionItem aria-label="Close" onClick={closeWindow} />
          <MacActionItem aria-label="Minimize" onClick={minimizeWindow} />
          <MacActionItem aria-label="Maximize" onClick={maximizeWindow} />
        </MacActions>
        <TabsGroup className="tabs-group" role="tablist" aria-hidden="true" />
        <Actions>
          <ActionItem aria-label="New Terminal" onClick={createSession}>
            <PlusIcon />
          </ActionItem>
        </Actions>
        <DragRegion />
        <Actions>
          <ActionItem aria-label="Settings" onClick={openSettings}>
            <SettingsIcon />
          </ActionItem>
        </Actions>
      </Wrapper>
    </Container>
  ) : (
    <Container>
      <Wrapper>
        <Actions>
          <ActionItem aria-label="Menu" onClick={openMenu}>
            <MenuIcon />
          </ActionItem>
        </Actions>
        <TabsGroup className="tabs-group" role="tablist" aria-hidden="true" />
        <Actions>
          <ActionItem aria-label="New Terminal" onClick={createSession}>
            <PlusIcon />
          </ActionItem>
        </Actions>
        <DragRegion />
        <Actions>
          <ActionItem aria-label="Settings" onClick={openSettings}>
            <SettingsIcon />
          </ActionItem>
          <ActionItem aria-label="Minimize" onClick={minimizeWindow}>
            <MinimizeIcon />
          </ActionItem>
          <ActionItem aria-label="Maximize" onClick={maximizeWindow}>
            {maximized ? <RestoreIcon /> : <MaximizeIcon />}
          </ActionItem>
          <ActionItem aria-label="Close" onClick={closeWindow}>
            <CloseIcon />
          </ActionItem>
        </Actions>
      </Wrapper>
    </Container>
  );
};

export default React.memo(Header);
