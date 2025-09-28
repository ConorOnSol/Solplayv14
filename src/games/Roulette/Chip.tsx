import React from 'react'
import styled, { css } from 'styled-components'

const StyledChip = styled.div<{$color: string}>`
  width: 24px;
  height: 24px;
  line-height: 22px;
  border-radius: 50%;
  background: var(--chip-color);
  border: 2px solid var(--border-color);
  color: black;
  font-size: 11px;
  font-weight: bold;
  color: var(--text-color);
  box-shadow: 
    0 0 0 1px var(--chip-color),
    0 4px 8px rgba(0, 0, 0, 0.3);
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%);
    border-radius: 50%;
  }

  ${(props) => props.$color === 'white' && css`
    --chip-color: linear-gradient(135deg, #f0f0ff 0%, #d0d0ff 100%);
    --border-color: #8888C0;
    --text-color: #333366;
  `}
  ${(props) => props.$color === 'green' && css`
    --chip-color: linear-gradient(135deg, #47ff7d 0%, #00cc44 100%);
    --border-color: #006600;
    --text-color: #003300;
  `}
  ${(props) => props.$color === 'red' && css`
    --chip-color: linear-gradient(135deg, #ff5b72 0%, #ff2b4e 100%);
    --border-color: #cc0022;
    --text-color: #330000;
  `}
  ${(props) => props.$color === 'blue' && css`
    --chip-color: linear-gradient(135deg, #a692ff 0%, #7d5fff 100%);
    --border-color: #4d38cc;
    --text-color: #000245;
  `}
  ${(props) => props.$color === 'gold' && css`
    --chip-color: linear-gradient(135deg, #ffd700 0%, #ffaa00 100%);
    --border-color: #b8860b;
    --text-color: #664400;
  `}
`

const color = (value: number) => {
  if (value <= 1) return 'green'
  if (value <= 5) return 'red'
  if (value <= 25) return 'blue'
  if (value <= 100) return 'gold'
  return 'white'
}

export function Chip({ value }: {value: number}) {
  return (
    <StyledChip $color={color(value)}>
      {value}
    </StyledChip>
  )
}
