import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

const slowSpin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const pulse = keyframes`
  0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
  50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.8; }
  100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
`

const WheelContainer = styled.div<{ $spinning: boolean; $result: number | null }>`
  width: 300px;
  height: 300px;
  position: relative;
  margin: 0 auto;
  transition: all 0.5s ease;

  ${props => props.$spinning && `
    animation: ${spin} 0.1s linear infinite;
  `}

  ${props => props.$result !== null && !props.$spinning && `
    animation: ${slowSpin} 3s ease-out;
  `}
`

const Wheel = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(135deg, #0a0a0a 0%, #2a2a2a 100%);
  position: relative;
  border: 8px solid #8B4513;
  box-shadow: 
    0 0 0 4px #654321,
    inset 0 0 20px rgba(0, 0, 0, 0.8),
    0 0 40px rgba(0, 0, 0, 0.6);
`

const WheelNumber = styled.div<{ $color: 'red' | 'black' | 'green'; $angle: number }>`
  position: absolute;
  width: 40px;
  height: 40px;
  background: ${props => 
    props.$color === 'red' ? 'linear-gradient(135deg, #ff3d5e, #cc2e4a)' :
    props.$color === 'black' ? 'linear-gradient(135deg, #2a2a3a, #1b1b25)' :
    'linear-gradient(135deg, #00a855, #008744)'
  };
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  transform: rotate(${props => props.$angle}deg);
  top: 50%;
  left: 50%;
  margin: -20px 0 0 -20px;
  transform-origin: 150px 150px;
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.3);
`

const CenterCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, gold, #ffd700);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  border: 4px solid #b8860b;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
  z-index: 2;
`

const Pointer = styled.div`
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-top: 30px solid #ff4444;
  z-index: 3;
  filter: drop-shadow(0 0 10px rgba(255, 68, 68, 0.8));
`

const rouletteNumbers = [
  { number: 0, color: 'green' },
  { number: 32, color: 'red' }, { number: 15, color: 'black' }, { number: 19, color: 'red' },
  { number: 4, color: 'black' }, { number: 21, color: 'red' }, { number: 2, color: 'black' },
  { number: 25, color: 'red' }, { number: 17, color: 'black' }, { number: 34, color: 'red' },
  { number: 6, color: 'black' }, { number: 27, color: 'red' }, { number: 13, color: 'black' },
  { number: 36, color: 'red' }, { number: 11, color: 'black' }, { number: 30, color: 'red' },
  { number: 8, color: 'black' }, { number: 23, color: 'red' }, { number: 10, color: 'black' },
  { number: 5, color: 'red' }, { number: 24, color: 'black' }, { number: 16, color: 'red' },
  { number: 33, color: 'black' }, { number: 1, color: 'red' }, { number: 20, color: 'black' },
  { number: 14, color: 'red' }, { number: 31, color: 'black' }, { number: 9, color: 'red' },
  { number: 22, color: 'black' }, { number: 18, color: 'red' }, { number: 29, color: 'black' },
  { number: 7, color: 'red' }, { number: 28, color: 'black' }, { number: 12, color: 'red' },
  { number: 35, color: 'black' }, { number: 3, color: 'red' }, { number: 26, color: 'black' }
]

interface WheelProps {
  spinning: boolean
  result: number | null
}

export function RouletteWheel({ spinning, result }: WheelProps) {
  const [displayResult, setDisplayResult] = useState<number | null>(null)

  useEffect(() => {
    if (!spinning && result !== null) {
      const timer = setTimeout(() => {
        setDisplayResult(result)
      }, 3000)
      return () => clearTimeout(timer)
    } else if (spinning) {
      setDisplayResult(null)
    }
  }, [spinning, result])

  return (
    <div style={{ position: 'relative', margin: '40px 0' }}>
      <WheelContainer $spinning={spinning} $result={result}>
        <Wheel>
          {rouletteNumbers.map((item, index) => (
            <WheelNumber
              key={item.number}
              $color={item.color}
              $angle={(index / rouletteNumbers.length) * 360}
            >
              {item.number}
            </WheelNumber>
          ))}
          <CenterCircle />
        </Wheel>
      </WheelContainer>
      <Pointer />
      
      {displayResult !== null && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(0, 0, 0, 0.9)',
          color: 'white',
          padding: '20px 40px',
          borderRadius: '15px',
          fontSize: '32px',
          fontWeight: 'bold',
          zIndex: 4,
          border: '3px solid gold',
          animation: `${pulse} 2s infinite`
        }}>
          {displayResult}
        </div>
      )}
    </div>
  )
}
