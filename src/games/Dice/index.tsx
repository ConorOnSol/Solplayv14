import { BPS_PER_WHOLE } from 'gamba-core-v2'
import { GambaUi, TokenValue, useCurrentPool, useSound, useWagerInput } from 'gamba-react-ui-v2'
import { useGamba } from 'gamba-react-v2'
import React from 'react'
import Slider from './Slider'
import { SOUND_LOSE, SOUND_PLAY, SOUND_TICK, SOUND_WIN } from './constants'
import { Container, Result, RollUnder, Stats } from './styles'

const calculateArraySize = (odds: number): number => {
  const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a)
  return 100 / gcd(100, odds)
}

export const outcomes = (odds: number) => {
  const arraySize = calculateArraySize(odds)
  const payout = (100 / odds).toFixed(4)

  let payoutArray = Array.from({ length: arraySize }).map((_, index) =>
    index < (arraySize * (odds / 100)) ? parseFloat(payout) : 0
  )

  const totalValue = payoutArray.reduce((acc, curr) => acc + curr, 0)

  if (totalValue > arraySize) {
    for (let i = payoutArray.length - 1; i >= 0; i--) {
      if (payoutArray[i] > 0) {
        payoutArray[i] -= totalValue - arraySize
        payoutArray[i] = parseFloat(payoutArray[i].toFixed(4))
        break
      }
    }
  }

  return payoutArray
}

export default function Dice() {
  const gamba = useGamba()
  const [wager, setWager] = useWagerInput()
  const pool = useCurrentPool()
  const [resultIndex, setResultIndex] = React.useState(-1)
  const [rollUnderIndex, setRollUnderIndex] = React.useState(95) // Changed to 95 for 95% win chance
  const sounds = useSound({
    win: SOUND_WIN,
    play: SOUND_PLAY,
    lose: SOUND_LOSE,
    tick: SOUND_TICK,
  })

  // Fixed values for 95% win chance and 10x multiplier
  const fixedWinChance = 95
  const fixedMultiplier = 10
  const fixedRollUnder = 95 // 95% win chance

  const odds = fixedRollUnder
  const multiplier = fixedMultiplier

  // Create bet array with 95% win chance and 10x payout
  const bet = React.useMemo(() => {
    const arraySize = 100
    let payoutArray = Array.from({ length: arraySize }).map((_, index) =>
      index < fixedRollUnder ? fixedMultiplier : 0
    )
    return payoutArray
  }, [])

  const maxWin = multiplier * wager

  const game = GambaUi.useGame()

  const play = async () => {
    sounds.play('play')

    await game.play({
      wager,
      bet,
    })

    const result = await game.result()

    const win = result.payout > 0

    const resultNum = win
      ? Math.floor(Math.random() * fixedRollUnder)
      : Math.floor(Math.random() * (100 - fixedRollUnder) + fixedRollUnder)

    setResultIndex(resultNum)

    win ? sounds.play('win') : sounds.play('lose')
  }

  return (
    <>
      <GambaUi.Portal target="screen">
        <GambaUi.Responsive>
          <Container>
            <RollUnder>
              <div>
                <div>{fixedRollUnder}</div>
                <div>Roll Under</div>
              </div>
            </RollUnder>
            <Stats>
              <div>
                <div>{fixedWinChance}%</div>
                <div>Win Chance</div>
              </div>
              <div>
                <div>{fixedMultiplier.toFixed(2)}x</div>
                <div>Multiplier</div>
              </div>
              <div>
                {maxWin > pool.maxPayout ? (
                  <div style={{ color: 'red' }}>Too high</div>
                ) : (
                  <div><TokenValue suffix="" amount={maxWin} /></div>
                )}
                <div>Payout</div>
              </div>
            </Stats>
            <div style={{ position: 'relative' }}>
              {resultIndex > -1 && (
                <Result style={{ left: `${resultIndex}%` }}>
                  <div key={resultIndex}>{resultIndex + 1}</div>
                </Result>
              )}
              {/* Hidden slider since values are fixed */}
              <div style={{ opacity: 0.5, pointerEvents: 'none' }}>
                <Slider
                  disabled={true}
                  range={[0, 100]}
                  min={1}
                  max={100 - 5}
                  value={fixedRollUnder}
                  onChange={() => {}}
                />
              </div>
              <div style={{ textAlign: 'center', marginTop: '10px', color: '#666' }}>
                Fixed: 95% Win Chance • 10x Multiplier
              </div>
            </div>
          </Container>
        </GambaUi.Responsive>
      </GambaUi.Portal>
      <GambaUi.Portal target="controls">
        <GambaUi.WagerInput value={wager} onChange={setWager} />
        <GambaUi.PlayButton onClick={play}>Roll</GambaUi.PlayButton>
      </GambaUi.Portal>
    </>
  )
}
