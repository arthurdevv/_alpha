import styled from 'styled-components';
import { theme } from '../../styles/global';

const isMac = process.platform === 'darwin';

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 2.375rem;
  color: ${theme.hover};
  background: ${theme.background};
`;

export const Wrapper = styled.div`
  height: 100%;
  line-height: 2.375rem;
  overflow: hidden;
  display: flex;
  align-items: center;
`;

export const Actions = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${theme.border};
`;

export const ActionItem = styled.div`
  width: 2.5rem;
  height: 100%;
  padding: 0 0.75rem;
  cursor: pointer;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  & svg {
    color: ${theme.color};
    transition: color 0.2s ease 0s;
  }

  &:hover {
    & svg {
      color: ${theme.hover};
      transition: color 0.2s ease 0s;
    }

    &[aria-label]::before,
    &[aria-label]::after {
      opacity: 1;
      transition: opacity 0.2s cubic-bezier(0.165, 0.84, 0.44, 1) 0.55s;
    }
  }

  &[aria-label]::before {
    content: '';
    position: fixed;
    width: 0px;
    height: 0px;
    top: calc(2.25rem + 5px);
    z-index: 9999;
    opacity: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid ${theme.border};
    transition: opacity 0.2s cubic-bezier(0.165, 0.84, 0.44, 1) 0s;
  }

  &[aria-label]::after {
    content: attr(aria-label);
    position: fixed;
    height: 1.875rem;
    top: calc(2.25rem + 10px);
    height: 1.875rem;
    padding: 0.313rem 0.563rem;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    opacity: 0;
    font-size: 0.75rem;
    border-radius: 3px;
    background: ${theme.background};
    border: 1px solid ${theme.border};
    transition: opacity 0.2s cubic-bezier(0.165, 0.84, 0.44, 1) 0s;
    box-shadow: #0000003d 0px -6px 18px, #0000001f 0px 4px 4px;
  }

  &[aria-label='Settings'] {
    ${isMac ? '' : 'margin-right: 0.625rem;'}

    &::after {
      ${isMac ? 'right: 0.5rem;' : ''}
    }
  }

  &[aria-label='Menu']::after {
    left: 0.5rem;
  }

  &[aria-label='Close']::after {
    right: 0.5rem;
  }
`;

export const MacActions = styled.div`
  position: relative;
  height: 100%;
  padding: 0 8px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${theme.border};
`;

export const MacActionItem = styled.div`
  width: 0.75rem;
  height: 0.75rem;
  margin: 0 4px;
  cursor: pointer;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${theme.border};
  border-radius: 50%;

  &:hover {
    &[aria-label]::before,
    &[aria-label]::after {
      opacity: 1;
      transition: opacity 0.2s cubic-bezier(0.165, 0.84, 0.44, 1) 0.55s;
    }
  }

  &[aria-label]::before {
    content: '';
    position: fixed;
    width: 0px;
    height: 0px;
    top: calc(2.25rem + 5px);
    z-index: 9999;
    opacity: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid ${theme.border};
    transition: opacity 0.2s cubic-bezier(0.165, 0.84, 0.44, 1) 0s;
  }

  &[aria-label]::after {
    content: attr(aria-label);
    position: fixed;
    height: 1.875rem;
    top: calc(2.25rem + 10px);
    height: 1.875rem;
    padding: 0.313rem 0.563rem;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    opacity: 0;
    font-size: 0.75rem;
    border-radius: 3px;
    background: ${theme.background};
    border: 1px solid ${theme.border};
    transition: opacity 0.2s cubic-bezier(0.165, 0.84, 0.44, 1) 0s;
    box-shadow: #0000003d 0px -6px 18px, #0000001f 0px 4px 4px;
  }

  &[aria-label='Close']::after {
    left: 0.5rem;
  }
`;

export const DragRegion = styled.div`
  height: calc(100% - 2px);
  min-width: 4.5rem;
  margin-top: 2px;
  flex: 1 0 1%;
  border-bottom: 1px solid ${theme.border};
  -webkit-app-region: drag;
`;

export const TabsGroup = styled.div`
  position: relative;
  height: 100%;
  overflow: hidden;
  flex: 0 1 auto;
  display: flex;
  border: none;

  .tab {
    position: relative;
    width: 12.5rem;
    height: 100%;
    padding: 0 1rem;
    overflow: hidden;
    cursor: pointer;
    display: flex;
    outline: none;
    text-align: center;
    align-items: center;
    justify-content: center;
    background: transparent;
    border-left: 1px solid transparent;
    border-right: 1px solid transparent;
    border-bottom: 1px solid ${theme.border};
    transition: all 0.2s ease 0s;
    animation: onCreate 0.2s ease-out;

    @keyframes onCreate {
      0% {
        width: 0;
      }
      100% {
        width: 12.5rem;
      }
    }

    &.current {
      background: ${theme.background2};
      border-left: 1px solid ${theme.border};
      border-right: 1px solid ${theme.border};
      border-bottom: 1px solid transparent;

      &:first-of-type {
        ${isMac ? `border-left: 1px solid ${theme.border};` : ''}
      }
    }

    &:first-of-type {
      ${isMac ? 'border-left: 1px solid transparent;' : ''}
    }

    &:hover {
      .tab-close {
        opacity: 1;
      }

      .tab-label {
        -webkit-mask-size: calc(100% - 60px) auto, 60px auto;
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-position: left, right;
        -webkit-mask-image: linear-gradient(black 0 0),
          linear-gradient(to left, transparent 0%, black 100%);
      }
    }
  }

  .tab-label {
    font-size: 0.813rem;
    overflow: hidden;
    align-self: center;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .tab-close {
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    right: 0.5rem;
    opacity: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    border-radius: 4px;
    background-size: 50%;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url("data:image/svg+xml,%3Csvg stroke='%23e6e6e6' fill='%23e6e6e6' stroke-width='1' viewBox='0 0 16 16' height='1em' width='1em' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8 8.707l3.646 3.647.708-.707L8.707 8l3.647-3.646-.707-.708L8 7.293 4.354 3.646l-.707.708L7.293 8l-3.646 3.646.707.708L8 8.707z'%3E%3C/path%3E%3C/svg%3E");
    transition: background 0.2s ease 0s;

    &:hover {
      background-color: ${theme.scrollbar};
      transition: background 0.2s ease 0s;

      &::before,
      &::after {
        opacity: 1;
        transition: opacity 0.2s cubic-bezier(0.165, 0.84, 0.44, 1) 0.55s;
      }
    }

    &::before {
      content: '';
      position: fixed;
      width: 0px;
      height: 0px;
      top: calc(2.25rem + 5px);
      z-index: 9999;
      opacity: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 5px solid ${theme.border};
      transition: opacity 0.2s cubic-bezier(0.165, 0.84, 0.44, 1) 0s;
    }

    &::after {
      content: 'Close Terminal';
      position: fixed;
      height: 1.875rem;
      top: calc(2.25rem + 10px);
      height: 1.875rem;
      padding: 0.313rem 0.563rem;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      opacity: 0;
      font-size: 0.75rem;
      border-radius: 3px;
      background: ${theme.background};
      border: 1px solid ${theme.border};
      transition: opacity 0.2s cubic-bezier(0.165, 0.84, 0.44, 1) 0s;
      box-shadow: #0000003d 0px -6px 18px, #0000001f 0px 4px 4px;
    }
  }

  &[aria-hidden='true'] {
    border-left: 1px solid ${theme.border};
  }
`;
