import styled from 'styled-components';
import { theme } from '../../styles/global';

export const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  inset: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  color: ${theme.hover};
`;

export const Wrapper = styled.div`
  margin: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const AppIcon = styled.div`
  width: 8rem;
  height: 8rem;
  margin-bottom: 2.5rem;
  background: center
    url("data:image/svg+xml, %3Csvg stroke='%23e6e6e6' fill='%23e6e6e6' strokeWidth='0' width='8rem' height='8rem' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath d='M30.703 38.5937 l7.0313 0 l-13.594 -37.266 l-7.1094 0 l7.8906 22.266 z M1.9531 38.5937 l6.875 0 l8.125 -19.844 l-3.3594 -8.9063 z'%3E%3C/path%3E%3C/svg%3E");
`;

export const Keybindings = styled.div`
  width: 100%;
  margin-right: 0.625rem;
  font-size: 0.813rem;
  overflow: hidden;
  display: inline-table;

  dl {
    display: table-row;
  }

  dt {
    display: table-cell;
    text-align: right;
  }

  dt:last-of-type div {
    margin-bottom: 0;
  }
`;

export const KeybindingInner = styled.div`
  margin-left: 0.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
`;

export const KeybindingKey = styled.span`
  margin: 0 0.25rem;
  padding: 0.313rem 0.438rem;
  border-radius: 3px;
  border: 1px solid ${theme.border};
`;

export const KeybindingDivisor = styled.span`
  margin: 0 0.125rem;
`;
