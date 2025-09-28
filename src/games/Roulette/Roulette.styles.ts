import styled, { css, keyframes } from 'styled-components'

const resultFlash = keyframes`
  0% { background-color: #ffffff22; }
  50% { background-color: #ffffff44; }
  100% { background-color: #ffffff22; }
`

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.1); }
  50% { box-shadow: 0 0 30px rgba(255, 255, 255, 0.3); }
`

export const StyledResults = styled.div`
  border-radius: 15px;
  background: linear-gradient(135deg, #191c2f 0%, #0d0f1a 100%);
  margin: 0 auto;
  font-weight: bold;
  overflow: hidden;
  width: 100%;
  display: flex;
  height: 60px;
  border: 2px solid #2a2f4a;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

  & > div {
    display: flex;
    padding: 10px;
    width: 45px;
    justify-content: center;
    align-items: center;
    border-right: 1px solid #2a2f4a;
    transition: all 0.3s ease;
  }

  & > div:first-child {
    font-size: 28px;
    align-items: center;
    width: 70px;
    justify-content: center;
    background: #ffffff15;
    animation: ${resultFlash} 2s infinite;
    border-right: 2px solid #3a3f5a;
  }

  & > div:not(:first-child):hover {
    background: #ffffff11;
    transform: scale(1.05);
  }
`

export const StyledBetButton = styled.div<{$highlighted?: boolean, $color?: 'black' | 'red' | 'green'}>`
  position: relative;
  border: none;
  border-radius: 8px;
  padding: 15px 10px;
  color: white;
  width: 70px;
  cursor: pointer;
  text-align: center;
  font-weight: bold;
  font-size: 14px;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, var(--background-color) 0%, var(--dark-color) 100%);
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);

  ${(props) => props.$color === 'red' && css`
    --background-color: #ff3d5e;
    --dark-color: #cc2e4a;
    --border-color: #ff2b4e;
  `}

  ${(props) => props.$color === 'black' && css`
    --background-color: #2a2a3a;
    --dark-color: #1b1b25;
    --border-color: #121218;
  `}

  ${(props) => props.$color === 'green' && css`
    --background-color: #00a855;
    --dark-color: #008744;
    --border-color: #006633;
  `}

  &::after {
    content: " ";
    transition: all 0.3s ease;
    background: transparent;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }

  &:hover::after {
    background: rgba(255, 255, 255, 0.1);
  }

  ${(props) => props.$highlighted && css`
    animation: ${glow} 2s infinite;
    transform: scale(1.05);
    &::after {
      background: rgba(255, 255, 255, 0.15);
    }
  `}

  &:active {
    transform: scale(0.95);
  }
`

export const StyledTable = styled.div`
  display: grid;
  gap: 12px;
  padding: 20px;
  background: linear-gradient(135deg, #0f1220 0%, #1a1f35 100%);
  border-radius: 20px;
  border: 3px solid #2a2f4a;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
`

export const ChipContainer = styled.div`
  position: absolute;
  z-index: 2;
  top: -8px;
  right: -8px;
  transform: scale(1.1);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`
