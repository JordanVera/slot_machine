import { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export function useGame() {
  return useContext(GameContext);
}

export function GameProvider({ children }) {
  const [betDenomination, setBetDenomination] = useState(10);

  return (
    <GameContext.Provider value={{ betDenomination, setBetDenomination }}>
      {children}
    </GameContext.Provider>
  );
}
