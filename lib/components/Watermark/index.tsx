import React from 'react';
import {
  Container,
  Wrapper,
  AppIcon,
  Keybindings,
  KeybindingInner,
  KeybindingKey,
  KeybindingDivisor,
} from './styles';

const Watermark: React.FC = () => (
  <Container>
    <Wrapper>
      <AppIcon />
      <Keybindings>
        <dl>
          <dt>New Terminal</dt>
          <KeybindingInner>
            <KeybindingKey>Ctrl</KeybindingKey>
            <KeybindingDivisor>+</KeybindingDivisor>
            <KeybindingKey>Shift</KeybindingKey>
            <KeybindingDivisor>+</KeybindingDivisor>
            <KeybindingKey>T</KeybindingKey>
          </KeybindingInner>
        </dl>
        <dl>
          <dt>Open Settings</dt>
          <KeybindingInner>
            <KeybindingKey>Ctrl</KeybindingKey>
            <KeybindingDivisor>+</KeybindingDivisor>
            <KeybindingKey>,</KeybindingKey>
          </KeybindingInner>
        </dl>
        <dl>
          <dt>Toggle Developer Tools</dt>
          <KeybindingInner>
            <KeybindingKey>Ctrl</KeybindingKey>
            <KeybindingDivisor>+</KeybindingDivisor>
            <KeybindingKey>Shift</KeybindingKey>
            <KeybindingDivisor>+</KeybindingDivisor>
            <KeybindingKey>I</KeybindingKey>
          </KeybindingInner>
        </dl>
      </Keybindings>
    </Wrapper>
  </Container>
);

export default React.memo(Watermark);
