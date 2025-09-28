import React from 'react'
import styled, { css } from 'styled-components'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useToastStore, type Toast as TToast } from '../hooks/useToast'

const StyledToasts = styled.div`
  position: fixed;
  right: 0;
  top: 60px;
  pointer-events: none;
  z-index: 1001;
  display: flex;
  flex-direction: column-reverse;
  gap: 10px;
  padding: 20px;
  width: 100%;

  @media (min-width: 800px) {
    width: unset;
    top: unset;
    bottom: 0px;
    padding: 40px;
  }
`

const StackedToast = styled.div`
  background: #e8e8e8e3;
  width: 100%;
  border-radius: 10px;
  height: 60px;
  transform: translateY(-60px);
  z-index: -1;
`

const StyledToast = styled.div`
  background: linear-gradient(135deg, #0a0a0a, #1a1a1a);
  color: #e0e0e0;
  border: 1px solid rgba(128, 255, 128, 0.2);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  pointer-events: auto;
  user-select: none;
  cursor: pointer;
  padding: 14px 18px;
  width: 100%;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(12px);
  animation: fadeIn 0.25s ease-out;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 16px;
    padding: 1px;
    background: linear-gradient(135deg, #00ff9f55, #a855f755);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  &:hover {
    background: linear-gradient(135deg, #111, #222);
    border-color: rgba(168, 85, 247, 0.3);
  }

  @media (min-width: 800px) {
    min-width: 260px;
    max-width: 320px;
    transform: translateY(0);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;


const StyledTimer = styled.div<{$ticking: boolean}>`
  @keyframes drain {
    from { width: 100%; }
    to { width: 0%; }
  }

  width: 100%;
  height: 6px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.08);
  position: relative;
  overflow: hidden;

  &::after {
    ${(props) => props.$ticking && css`
      animation: drain linear 10s;
    `}
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    border-radius: 9999px;
    background: linear-gradient(90deg, #00ff9f, #a855f7);
    box-shadow: 0 0 8px rgba(168, 85, 247, 0.6);
  }
`;


function Toast({ toast }: {toast: TToast}) {
  const timeout = React.useRef<NodeJS.Timer>()
  const discard = useToastStore((state) => state.discard)
  const [ticking, setTicking] = React.useState(true)

  React.useLayoutEffect(
    () => {
      timeout.current = setTimeout(() => {
        discard(toast.id)
      }, 10000)
      return () => clearTimeout(timeout.current)
    },
    [toast.id],
  )

  const pauseTimer = () => {
    setTicking(false)
    clearTimeout(timeout.current)
  }
  const resumeTimer = () => {
    setTicking(true)
    timeout.current = setTimeout(() => {
      discard(toast.id)
    }, 10000)
  }

  return (
    <StyledToast
      onClick={() => discard(toast.id)}
      onMouseEnter={pauseTimer}
      onMouseLeave={resumeTimer}
    >
      <div>
        <div style={{ fontWeight: 'bold' }}>{toast.title}</div>
        <div style={{ color: 'gray', fontSize: '90%' }}>{toast.description}</div>
      </div>
      <StyledTimer $ticking={ticking} />
    </StyledToast>
  )
}

export default function Toasts() {
  const toasts = useToastStore((state) => [...state.toasts].reverse())
  const showAll = useMediaQuery('sm')

  const visible = showAll ? toasts : toasts.slice(0, 1)

  return (
    <StyledToasts>
      {visible.map((toast, i) => (
        <Toast toast={toast} key={toast.id} />
      ))}
      {!showAll && toasts.length > 1 && (
        <StackedToast />
      )}
    </StyledToasts>
  )
}
