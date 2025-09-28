import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import React from "react";
import styled from "styled-components";
import { useUserStore } from "../../hooks/useUserStore";
import { FaCopy, FaTicketAlt, FaDiscord } from "react-icons/fa";

const WelcomeWrapper = styled.div`
  background: radial-gradient(circle at top left, #0d0d0d, #151515);
  border: 1px solid rgba(168, 85, 247, 0.2);
  border-radius: 20px;
  padding: 40px 28px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  text-align: center;
  color: #e5e5e5;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);

  @media (min-width: 800px) {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    align-items: center;
    text-align: left;
    gap: 48px;
    padding: 56px 48px;
  }
`;

const WelcomeContent = styled.div`
  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    background: linear-gradient(90deg, #00ff9f, #a855f7);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 12px;
  }

  p {
    font-size: 1.1rem;
    color: #bdbdbd;
    line-height: 1.7;
    max-width: 500px;
    margin: 0 auto;
  }

  @media (min-width: 800px) {
    h1 {
      font-size: 3rem;
    }
    p {
      font-size: 1.25rem;
      margin: 0;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  justify-content: center;

  @media (min-width: 800px) {
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 20px;
  border-radius: 14px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid rgba(0, 255, 159, 0.25);
  background: linear-gradient(90deg, #1b1b1b, #222);
  color: #00ff9f;
  transition: all 0.2s ease-in-out;
  flex-grow: 1;

  &:hover {
    background: linear-gradient(90deg, #2a0a4f, #073f31);
    color: #fff;
    transform: translateY(-2px) scale(1.02);
    border-color: #a855f7;
    box-shadow: 0 0 12px rgba(168, 85, 247, 0.4);
  }

  @media (min-width: 800px) {
    flex-grow: 0;
    width: 100%;
  }
`;

export function WelcomeBanner() {
  const wallet = useWallet();
  const walletModal = useWalletModal();
  const { set: setUserModal } = useUserStore();

  const handleCopyInvite = () => {
    setUserModal({ userModal: true });
    if (!wallet.connected) walletModal.setVisible(true);
  };

  const openLink = (url) => () =>
    window.open(url, "_blank", "noopener,noreferrer");

  return (
    <WelcomeWrapper>
      <WelcomeContent>
        <h1>Welcome to SolplayA</h1>
        <p>
          A fair, simple, and decentralized casino built on Solana. Play with
          full transparency, low fees, and complete control of your funds.
        </p>
      </WelcomeContent>
      <ButtonGroup>
        <ActionButton onClick={handleCopyInvite}>
          <FaCopy /> Copy Invite
        </ActionButton>
        <ActionButton onClick={openLink("https://v2.gamba.so/")}>
          <FaTicketAlt /> Support
        </ActionButton>
        <ActionButton onClick={openLink("https://discord.gg/HSTtFFwR")}>
          <FaDiscord /> Discord
        </ActionButton>
      </ButtonGroup>
    </WelcomeWrapper>
  );
}
