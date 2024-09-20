import { Menu } from 'lucide-react';

const BottomBar = ({ startSpin }) => {
  return (
    <footer className="absolute bottom-0 left-0 flex items-center justify-between w-full px-5 py-2 bg-black bg-opacity-50">
      {/* Left Side */}
      <div className="flex items-center gap-5">
        <Menu />

        <div className="flex flex-col">
          <h4 className="text-md">Balance</h4>
          <p className="text-2xl font-bold">$1,000</p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center">
        <button>
          <h4 className="text-md">Total Bet</h4>
          <p className="text-2xl font-bold">$10</p>
        </button>

        <button className="justify-end" onClick={startSpin}>
          Spin!
        </button>
      </div>
    </footer>
  );
};
export default BottomBar;
