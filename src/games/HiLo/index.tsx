import { GambaUi, TokenValue, useCurrentPool, useSound, useWagerInput } from 'gamba-react-ui-v2'
import { useGamba } from 'gamba-react-v2'
import React from 'react'
import { MAX_CARD_SHOWN, RANKS, RANK_SYMBOLS, SOUND_CARD, SOUND_FINISH, SOUND_LOSE, SOUND_PLAY, SOUND_WIN } from './constants'
import { Card, CardContainer, CardPreview, CardsContainer, Container, Option, Options, Profit, Blue3dButton } from './styles'

// ... existing code ...

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <CardsContainer>
                {cards.map((card, i) => {
                  const offset = -(cards.length - (i + 1))
                  const xxx = cards.length > 3 ? (i / cards.length) : 1
                  const opacity = Math.min(1, xxx * 3)
                  return (
                    <CardContainer
                      key={card.key}
                      style={{
                        transform: `translate(${offset * 30}px, ${-offset * 0}px) rotateZ(-5deg) rotateY(5deg)`,
                        opacity,
                      }}
                    >
                      <Card>
                        <div className="rank">{RANK_SYMBOLS[card.rank]}</div>
                        <div className="suit" style={{ backgroundImage: 'url(' + props.logo +  ')' }} />
                      </Card>
                    </CardContainer>
                  )
                })}
              </CardsContainer>
              <Options>
                <Blue3dButton
                  selected={option === 'hi'}
                  onClick={() => setOption('hi')}
                  onMouseEnter={() => hoverOption('hi')}
                  onMouseLeave={() => hoverOption(undefined)}
                >
                  <div>
                    👆
                  </div>
                  <div>HI - ({Math.max(...betHi).toFixed(2)}x)</div>
                </Blue3dButton>
                <Blue3dButton
                  selected={option === 'lo'}
                  onClick={() => setOption('lo')}
                  onMouseEnter={() => hoverOption('lo')}
                  onMouseLeave={() => hoverOption(undefined)}
                >
                  <div>
                    👇
                  </div>
                  <div>LO - ({Math.max(...betLo).toFixed(2)}x)</div>
                </Blue3dButton>
              </Options>
            </div>
