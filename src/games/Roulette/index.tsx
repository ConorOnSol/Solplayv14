import { computed } from '@preact/signals-react'
import { GambaUi, TokenValue, useCurrentPool, useCurrentToken, useSound, useUserBalance } from 'gamba-react-ui-v2'
import { useGamba } from 'gamba-react-v2'
import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { Chip } from './Chip'
import { RouletteWheel } from './Roulette/Wheel'
import { StyledResults } from './Roulette.styles'
import { Table } from './Table'
import { CHIPS, SOUND_LOSE, SOUND_PLAY, SOUND_WIN } from './constants'
import { addResult, bet, clearChips, results, selectedChip, totalChipValue } from './signals'

const Wrapper = styled.div`
  display: grid;
  gap: 30px;
  align-items: center;
  user-select: none;
  -webkit-user-select: none;
  color: white;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`

const GameContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 30px;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const WheelSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`

const TableSection = styled.div`
  background: linear-gradient(135deg, #0a0e1a 0%, #151b30 100%);
  border-radius: 20px;
  padding: 20px;
  border: 2px solid #2a2f4a;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
`

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`

function Results() {
  const _results = computed(() => [...results.value].reverse().slice(0, 10))
  return (
    <StyledResults>
      <div>LATEST</div>
      {_results.value.map((resultIndex, i) => {
        const number = resultIndex
        const isRed = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(number)
        const isGreen = number === 0
        const color = isGreen ? '#00a855' : isRed ? '#ff3d5e' : '#2a2a3a'
        
        return (
          <div 
            key={i} 
            style={{ 
              background: color,
              color: 'white',
              fontWeight: 'bold',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
            }}
          >
            {number}
          </div>
        )
      })}
    </StyledResults>
  )
}

function Stats() {
  const pool = useCurrentPool()
  const token = useCurrentToken()
  const balance = useUserBalance()
  const wager = totalChipValue.value * token.baseWager

  const multiplier = Math.max(...bet.value)
  const maxPayout = multiplier * wager
  const maxPayoutExceeded = maxPayout > pool.maxPayout
  const balanceExceeded = wager > (balance.balance + balance.bonusBalance)

  return (
    <div style={{ 
      textAlign: 'center', 
      display: 'grid', 
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
      background: 'linear-gradient(135deg, #1a1f35 0%, #0f1220 100%)',
      padding: '20px',
      borderRadius: '15px',
      border: '2px solid #2a2f4a'
    }}>
      <div>
        <div style={{ fontSize: '18px', fontWeight: 'bold', color: balanceExceeded ? '#ff0066' : '#47ff7d' }}>
          {balanceExceeded ? (
            <span style={{ color: '#ff0066' }}>
              TOO HIGH
            </span>
          ) : (
            <>
              <TokenValue amount={wager} />
            </>
          )}
        </div>
        <div style={{ fontSize: '12px', opacity: 0.8 }}>TOTAL WAGER</div>
      </div>
      <div>
        <div style={{ fontSize: '18px', fontWeight: 'bold', color: maxPayoutExceeded ? '#ff0066' : '#a692ff' }}>
          {maxPayoutExceeded ? (
            <span style={{ color: '#ff0066' }}>
              TOO HIGH
            </span>
          ) : (
            <>
              <TokenValue amount={maxPayout} />
              <div style={{ fontSize: '12px' }}>({multiplier.toFixed(2)}x)</div>
            </>
          )}
        </div>
        <div style={{ fontSize: '12px', opacity: 0.8 }}>POTENTIAL WIN</div>
      </div>
    </div>
  )
}

export default function Roulette() {
  const game = GambaUi.useGame()
  const token = useCurrentToken()
  const pool = useCurrentPool()
  const balance = useUserBalance()
  const gamba = useGamba()

  const [spinning, setSpinning] = useState(false)
  const [wheelResult, setWheelResult] = useState<number | null>(null)

  const sounds = useSound({
    win: SOUND_WIN,
    lose: SOUND_LOSE,
    play: SOUND_PLAY,
  })

  const wager = totalChipValue.value * token.baseWager

  const multiplier = Math.max(...bet.value)
  const maxPayout = multiplier * wager
  const maxPayoutExceeded = maxPayout > pool.maxPayout
  const balanceExceeded = wager > (balance.balance + balance.bonusBalance)

  const play = async () => {
    try {
      setSpinning(true)
      setWheelResult(null)
      
      await game.play({
        bet: bet.value,
        wager,
      })
      
      sounds.play('play')
      const result = await game.result()
      
      // Simulate wheel spin delay
      setTimeout(() => {
        setWheelResult(result.resultIndex)
        addResult(result.resultIndex)
        
        setTimeout(() => {
          setSpinning(false)
          if (result.payout > 0) {
            sounds.play('win')
          } else {
            sounds.play('lose')
          }
        }, 3000)
      }, 2000)
      
    } catch (error) {
      setSpinning(false)
      console.error('Play error:', error)
    }
  }

  return (
    <>
      <GambaUi.Portal target="screen">
        <GambaUi.Responsive>
          <Wrapper onContextMenu={(e) => e.preventDefault()}>
            <Results />
            
            <GameContainer>
              <WheelSection>
                <RouletteWheel spinning={spinning} result={wheelResult} />
                <Stats />
              </WheelSection>
              
              <TableSection>
                <Table />
              </TableSection>
            </GameContainer>
          </Wrapper>
        </GambaUi.Responsive>
      </GambaUi.Portal>
      
      <GambaUi.Portal target="controls">
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <GambaUi.Select
            options={CHIPS}
            value={selectedChip.value}
            onChange={(value) => selectedChip.value = value}
            label={(value) => (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Chip value={value} />
                <span>=</span>
                <TokenValue amount={token.baseWager * value} />
              </div>
            )}
          />
          <GambaUi.Button
            disabled={!wager || gamba.isPlaying}
            onClick={clearChips}
            variant="default"
          >
            Clear
          </GambaUi.Button>
          <GambaUi.PlayButton 
            disabled={!wager || balanceExceeded || maxPayoutExceeded || spinning} 
            onClick={play}
          >
            {spinning ? 'Spinning...' : 'Spin'}
          </GambaUi.PlayButton>
        </div>
      </GambaUi.Portal>
    </>
  )
}
