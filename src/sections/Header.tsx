import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
  GambaUi,
  TokenValue,
  useCurrentPool,
  useGambaPlatformContext,
  useUserBalance,
} from 'gamba-react-ui-v2'
import axios from 'axios'
import { Modal } from '../components/Modal'
import LeaderboardsModal from '../sections/LeaderBoard/LeaderboardsModal'
import { PLATFORM_CREATOR_ADDRESS, ENABLE_LEADERBOARD } from '../constants'
import { useMediaQuery } from '../hooks/useMediaQuery'
import TokenSelectBase from './TokenSelect'
import { UserButton } from './UserButton'
import { NavLink, useNavigate } from 'react-router-dom'
import { AiOutlineHome, AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'
import SolanaLogo from '../components/solana.png'
import { FaDice, FaCoins, FaBomb, FaCircle, FaRocket } from 'react-icons/fa'

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 15px 30px;
  backdrop-filter: blur(25px);
  background: linear-gradient(135deg, rgba(0,0,0,0.7), rgba(20,20,30,0.85));
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  height: 75px;
`

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 220px;
  height: 100vh;
  padding: 160px 20px 20px 20px;
  background: linear-gradient(135deg, rgba(0,0,0,0.7), rgba(20,20,30,0.85));
  box-shadow: 2px 0 10px rgba(0,0,0,0.5);
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 900;
`

const SidebarLink = styled(NavLink)`
  padding: 10px 15px;
  border-radius: 8px;
  color: #fff;
  font-weight: 500;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  &.active {
    background: rgba(255, 255, 255, 0.2);
    font-weight: bold;
  }
`

const GameButton = styled.button`
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 8px;
  color: #fff;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.05);
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`

const BonusButton = styled.button`
  all: unset;
  cursor: pointer;
  color: #ffe42d;
  border-radius: 10px;
  padding: 4px 12px;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  transition: background-color 0.2s;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`

const RightControls = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`

const CenterTokenSelect = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  min-width: 160px;
  .token-select {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px 0;
    background: transparent;
    color: #fff;
    font-weight: 500;
  }
`

const TokenPriceBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: linear-gradient(90deg, #00FFA3, #DC1FFF);
  border-radius: 10px;
  font-weight: bold;
  color: #fff;
`

const DropdownButton = styled.button`
  all: unset;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 8px;
  color: #fff;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.05);
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`

const DropdownMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 10px;
`

export default function Header() {
  const pool = useCurrentPool()
  const context = useGambaPlatformContext()
  const balance = useUserBalance()
  const isDesktop = useMediaQuery('lg')
  const navigate = useNavigate()

  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [bonusHelp, setBonusHelp] = useState(false)
  const [solPrice, setSolPrice] = useState<number | null>(null)
  const [showGames, setShowGames] = useState(false)

  const games = [
    { name: 'Dice', icon: <FaDice />, path: '/dice' },
    { name: 'Coinflip', icon: <FaCoins />, path: '/flip' },
    { name: 'Mines', icon: <FaBomb />, path: '/mines' },
    { name: 'Roulette', icon: <FaCircle />, path: '/roulette' },
    { name: 'Crash', icon: <FaRocket />, path: '/crash' }
  ]

  useEffect(() => {
    async function fetchSolPrice() {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd'
        )
        setSolPrice(response.data.solana.usd)
      } catch (err) {
        console.error(err)
      }
    }
    fetchSolPrice()
  }, [])

  return (
    <>
      {bonusHelp && (
        <Modal onClose={() => setBonusHelp(false)}>
          <h1>Bonus ✨</h1>
          <p>
            You have <b><TokenValue amount={balance.bonusBalance} /></b> worth of free plays. This bonus
            will be applied automatically when you play.
          </p>
          <p>Note that a fee is still needed from your wallet for each play.</p>
        </Modal>
      )}

      {ENABLE_LEADERBOARD && showLeaderboard && (
        <LeaderboardsModal
          creator={PLATFORM_CREATOR_ADDRESS.toBase58()}
          onClose={() => setShowLeaderboard(false)}
        />
      )}

      <SidebarContainer>
        <SidebarLink to="/" style={{ marginTop: '-40px' }}>
          <AiOutlineHome size={20} /> Home
        </SidebarLink>

        <DropdownButton onClick={() => setShowGames(prev => !prev)}>
          Games {showGames ? <AiFillCaretUp /> : <AiFillCaretDown />}
        </DropdownButton>
        {showGames && (
          <DropdownMenu>
            {games.map((game, index) => (
              <GameButton key={index} onClick={() => navigate(game.path)}>
                {game.icon} {game.name}
              </GameButton>
            ))}
          </DropdownMenu>
        )}
      </SidebarContainer>

      <StyledHeader>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <TokenPriceBox>
            <img src={SolanaLogo} width={20} height={20} alt="Solana Logo" /> ${solPrice?.toFixed(2) ?? '--'}
          </TokenPriceBox>
        </div>

        <CenterTokenSelect>
          <div className="token-select">
            <TokenSelectBase />
          </div>
        </CenterTokenSelect>

        <RightControls>
          {balance.bonusBalance > 0 && (
            <BonusButton onClick={() => setBonusHelp(true)}>
              ✨ <TokenValue amount={balance.bonusBalance} />
            </BonusButton>
          )}
          {isDesktop && (
            <GambaUi.Button onClick={() => setShowLeaderboard(true)}>
              Leaderboard
            </GambaUi.Button>
          )}
          <UserButton />
        </RightControls>
      </StyledHeader>
    </>
  )
}
