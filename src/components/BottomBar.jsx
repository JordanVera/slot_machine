import { useEffect } from 'react';

import { ChevronUp, ChevronDown, Menu, ListRestart } from 'lucide-react';
import { useGame } from '../providers/GameProvider';

const BottomBar = ({ startSpin }) => {
  const { betDenomination, setBetDenomination } = useGame();

  useEffect(() => {
    console.log({ betDenomination });
  }, [betDenomination]);

  return (
    <footer className="absolute bottom-0 left-0 flex items-center justify-between w-full px-5 py-2 bg-black bg-opacity-50">
      {/* Left Side */}
      <div className="flex items-center gap-5">
        <Menu />

        <div className="flex flex-col">
          <h4 className="text-sm">Balance</h4>
          <p className="text-lg font-bold">$1,000</p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5 border rounded-lg bg-zinc-800 border-zinc-700 ">
        <div className="flex items-center">
          <div className="p-2 pr-5 text-left">
            <h4 className="text-sm">Total Bet</h4>
            <p className="text-lg font-bold">{betDenomination}</p>
          </div>
          <div className="flex flex-col p-2 border-l border-zinc-600">
            <button>
              <ChevronUp />
            </button>
            <button>
              <ChevronDown />
            </button>
          </div>
        </div>

        <button className="p-1 rounded-full bg-zinc-900" onClick={startSpin}>
          <img src="/circleArrows.png" className="w-16 h-16" />
        </button>
        <button className="justify-end">
          <ListRestart />
        </button>
      </div>
    </footer>
  );
};
export default BottomBar;
