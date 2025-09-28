// LeaderboardsModal.tsx
import React, { useState, useEffect } from 'react'
import { Modal } from '../../components/Modal'
import {
  useLeaderboardData,
  Period,
  Player,           
} from '../../hooks/useLeaderboardData' 
import {
  ModalContent,
  HeaderSection,
  Title,
  Subtitle,
  TabRow,
  TabButton,
  LeaderboardList,
  ListHeader,
  HeaderRank,
  HeaderPlayer,
  HeaderVolume,
  RankItem,
  RankNumber,
  PlayerInfo,
  VolumeAmount,
  formatVolume,
  LoadingText,
  ErrorText,
  EmptyStateText,
  TrophyIcon,
  AnimatedBackground,
  FloatingParticles,
  RankBadge,
  ShineEffect,
} from './LeaderboardsModal.styles'

interface LeaderboardsModalProps {
  onClose: () => void
  creator: string
}

const LeaderboardsModal: React.FC<LeaderboardsModalProps> = ({
  onClose,
  creator,
}) => {
  const [period, setPeriod] = useState<Period>('weekly')
  const [isVisible, setIsVisible] = useState(false)

  const {
    data: leaderboard,
    loading,
    error,
  } = useLeaderboardData(period, creator)

  useEffect(() => {
    setIsVisible(true)
    return () => setIsVisible(false)
  }, [])

  const handleTabChange = (newPeriod: Period) => {
    setIsVisible(false)
    setTimeout(() => {
      setPeriod(newPeriod)
      setIsVisible(true)
    }, 300)
  }

  return (
    <Modal onClose={onClose}>
      <AnimatedBackground />
      <FloatingParticles />
      
      <ModalContent $isVisible={isVisible}>
        {/* ────── header ────── */}
        <HeaderSection>
          <ShineEffect>
            <TrophyIcon>🏆</TrophyIcon>
          </ShineEffect>
          <Title>Leaderboard</Title>
          <Subtitle>
            Top players by volume{' '}
            {period === 'weekly' ? 'this week' : 'this month'} (USD)
          </Subtitle>
        </HeaderSection>

        {/* ────── tabs ────── */}
        <TabRow>
          <TabButton
            $selected={period === 'weekly'}
            onClick={() => handleTabChange('weekly')}
            disabled={loading}
          >
            Weekly
          </TabButton>

          <TabButton
            $selected={period === 'monthly'}
            onClick={() => handleTabChange('monthly')}
            disabled={loading}
          >
            Monthly
          </TabButton>
        </TabRow>

        {loading ? (
          <LoadingText>
            <div className="loading-spinner"></div>
            Loading leaderboard...
          </LoadingText>
        ) : error ? (
          <ErrorText>❌ {error}</ErrorText>
        ) : leaderboard && leaderboard.length > 0 ? (
          <LeaderboardList>
            <ListHeader>
              <HeaderRank>Rank</HeaderRank>
              <HeaderPlayer>Player</HeaderPlayer>
              <HeaderVolume>Volume&nbsp;(USD)</HeaderVolume>
            </ListHeader>

            {leaderboard.map((entry: Player, index) => {
              const rank = index + 1
              const animationDelay = index * 100
              
              return (
                <RankItem 
                  key={entry.user} 
                  $isTop3={rank <= 3}
                  $rank={rank}
                  $animationDelay={animationDelay}
                  $isVisible={isVisible}
                >
                  <RankBadge $rank={rank}>
                    <RankNumber rank={rank}>
                      {rank > 3 ? rank : ''}
                    </RankNumber>
                  </RankBadge>
                  <PlayerInfo title={entry.user}>
                    <span className="player-avatar">👤</span>
                    {entry.user}
                  </PlayerInfo>
                  <VolumeAmount>
                    <span className="volume-pulse">💎</span>
                    {formatVolume(entry.usd_volume)}
                  </VolumeAmount>
                  
                  {/* 3D depth effect */}
                  <div className="card-depth"></div>
                </RankItem>
              )
            })}
          </LeaderboardList>
        ) : (
          <EmptyStateText>
            <div className="empty-icon">📊</div>
            No leaderboard data for this period.
          </EmptyStateText>
        )}
      </ModalContent>
    </Modal>
  )
}

export default LeaderboardsModal
