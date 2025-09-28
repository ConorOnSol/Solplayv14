import styled, { css, keyframes } from 'styled-components'

const appear = keyframes`
  0% { transform: scale(.0) translateY(100px) rotateY(90deg); }
  100% { transform: scale(1) translateY(0) rotateY(0deg) }
`

export const Container = styled.div<{ $disabled?: boolean }>`
  user-select: none;
  background: #9967e300;
  transition: opacity .2s;
  ${({ $disabled }) => $disabled && css`
    pointer-events: none;
    opacity: .7;
  `}
`

export const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
`

export const Blue3dButton = styled.button<{ selected?: boolean }>`
  background: linear-gradient(145deg, #1e88e5, #1565c0);
  border: none;
  margin: 0;
  padding: 20px 30px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  cursor: pointer;
  font-size: 20px;
  color: white;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
  box-shadow: 
    inset 0 -8px 0 0 rgba(0, 0, 0, 0.2),
    inset 0 0 20px rgba(33, 150, 243, 0.3),
    0 6px 12px rgba(0, 0, 0, 0.15);
  border: 2px solid #64b5f6;
  position: relative;
  overflow: hidden;
  min-width: 200px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(rgba(255,255,255,0.2), transparent);
    border-radius: 15px 15px 0 0;
  }

  & > div:first-child {
    font-size: 48px;
    filter: drop-shadow(-2px 2px 2px #00000066);
    margin-right: 15px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      inset 0 -6px 0 0 rgba(0, 0, 0, 0.2),
      inset 0 0 25px rgba(33, 150, 243, 0.4),
      0 8px 16px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(2px);
    box-shadow: 
      inset 0 -2px 0 0 rgba(0, 0, 0, 0.2),
      inset 0 0 15px rgba(33, 150, 243, 0.3),
      0 2px 8px rgba(0, 0, 0, 0.15);
  }

  ${(props) => props.selected && css`
    background: linear-gradient(145deg, #1565c0, #0d47a1);
    box-shadow: 
      inset 0 2px 0 0 rgba(255, 255, 255, 0.2),
      inset 0 0 25px rgba(13, 71, 161, 0.5),
      0 4px 8px rgba(0, 0, 0, 0.2);
    transform: translateY(4px);
    
    &::before {
      background: linear-gradient(rgba(255,255,255,0.1), transparent);
    }
  `}

  ${(props) => !props.selected && css`
    &:hover {
      background: linear-gradient(145deg, #2196f3, #1976d2);
    }
  `}
`

// Keep the existing Option component for reference, but we're using Blue3dButton instead
export const Option = styled.button<{ selected?: boolean }>`
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  transition: opacity .2s, background .2s ease;
  display: flex;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  font-size: 20px;
  color: white;
  & > div:first-child {
    font-size: 48px;
    filter: drop-shadow(-4px 4px 2px #00000066);
    margin-right: 10px;
  }

  --opacity: .5;

  &:hover {
    --opacity : 1;
  }

  ${(props) => props.selected && css`
    --opacity: 1;
  `}

  opacity: var(--opacity);
`

export const Profit = styled.div`
  font-size: 18px;
  color: #005400;
  position: absolute;
  right: 0px;
  bottom: -100px;
  border-radius: 50px;
  background: #69ff6d;
  padding: 5px;
  animation: ${appear} .25s cubic-bezier(0.18, 0.89, 0.32, 1.28);
`

export const CardPreview = styled.div`
  display: flex;
  border-radius: 5px;
  gap: 5px;
  padding: 5px;
  margin-top: 30px;
  justify-content: center;
  & > div {
    transition: opacity .2s;
  }
`

export const CardsContainer = styled.div`
  transition: transform .2s ease;
  perspective: 500px;
  display: flex;
  position: relative;
  justify-content: flex-end;
  align-items: center;
`

export const CardContainer = styled.div`
  position: absolute;
  bottom: 0;
  transition: transform .25s cubic-bezier(0.18, 0.89, 0.32, 1.28), opacity .25s ease;
  filter: drop-shadow(-10px 10px 0px #00000011);
  transform-origin: bottom;
  perspective: 500px;
  & > div {
    animation: ${appear} .25s cubic-bezier(0.5, 0.9, 0.35, 1.05);
  }
`

export const Card = styled.div<{$small?: boolean}>`
  ${(props) => props.$small ? css`
    height: 35px;
    font-size: 15px;
    padding: 5px;
    border-radius: 4px;
  ` : css`
    height: 160px;
    font-size: 70px;
    padding: 10px;
    border-radius: 8px;
  `}
  box-shadow: -5px 5px 10px 1px #0000003d;
  background: white;
  aspect-ratio: 4/5.5;
  position: relative;
  color: #333;
  overflow: hidden;
  .rank {
    font-weight: bold;
    line-height: 1em;
  }
  .suit {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 50%;
    height: 50%;
    background-size: cover;
    background-repeat: none;
    transform: translate(0%, 0%);
    font-size: 128px;
    opacity: .9;
  }
`

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`

export const WarningMessage = styled.div`
  animation: ${float} 2s ease-in-out infinite;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateX(100%) translateY(-50%);
  background-color: rgba(255, 204, 0, 0.8);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  color: black;
  white-space: nowrap;
  pointer-events: none;
`
