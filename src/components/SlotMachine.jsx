// SlotMachine.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Stage, Container, Text } from '@pixi/react';
import * as PIXI from 'pixi.js';
import BottomBar from './BottomBar';

const symbols = ['🍎', '🍒', '🍋', '🍇', '🍉']; // Sample symbols
const SYMBOL_HEIGHT = 64; // Height of each symbol
const SPIN_DURATION = 2000; // Spin duration in milliseconds

const SlotMachine = () => {
  const [spinning, setSpinning] = useState(false);
  const [reels, setReels] = useState(generateInitialReels());
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [message, setMessage] = useState('');

  // Refs for each reel's animation
  const reelRefs = useRef(
    reels.map(() => ({
      velocity: 20, // Initial spinning speed
      decelerating: false,
      symbols: [...reels],
    }))
  );

  // Helper function to randomize symbols
  function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
  }

  // Generate initial reels
  function generateInitialReels() {
    return Array.from({ length: 3 }, () =>
      Array.from({ length: 3 }, () => getRandomSymbol())
    );
  }

  const startSpin = () => {
    if (spinning) return; // Prevent multiple spins at the same time
    setSpinning(true);
    setMessage('');

    // Start the spinning process
    setTimeout(() => {
      setSpinning(false);
      stopReels();
      checkWinCondition();
    }, SPIN_DURATION); // Spin for SPIN_DURATION milliseconds
  };

  const stopReels = () => {
    setReels((prevReels) =>
      prevReels.map((reel, index) => {
        // Generate new symbols for each reel
        const newSymbols = Array.from({ length: 3 }, () => getRandomSymbol());
        return newSymbols;
      })
    );
  };

  // Check win conditions after spin
  const checkWinCondition = () => {
    const secondRow = reels.map((reel) => reel[1]); // Get second row symbols
    const isWin = secondRow.every((symbol) => symbol === secondRow[0]);

    if (isWin) {
      setMessage('You Win!');
      // Implement further win logic (e.g., update balance)
    }

    // Bonus condition: Specific symbol on the last reel's second row
    const bonusSymbol = '🍇'; // Define your bonus symbol
    if (reels[2][1] === bonusSymbol) {
      setMessage((prev) => (prev ? `${prev} + Bonus!` : 'Bonus Triggered!'));
      // Implement bonus logic
    }
  };

  // Update dimensions of stage on resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const backgroundColor = 0x1099bb; // Use a number for the color

  return (
    <div className="flex flex-col gap-5">
      <div className="relative">
        {message && (
          <div className="absolute px-4 py-2 text-white transform -translate-x-1/2 bg-green-500 rounded top-10 left-1/2">
            {message}
          </div>
        )}
        <Stage
          width={dimensions.width}
          height={dimensions.height}
          options={{ backgroundColor }}
        >
          <Container x={dimensions.width / 4} y={dimensions.height / 4}>
            {reels.map((reel, index) => (
              <Reel
                key={index}
                x={index * 150}
                symbols={reel}
                spinning={spinning}
              />
            ))}
          </Container>
        </Stage>

        <BottomBar startSpin={startSpin} />
      </div>
    </div>
  );
};

// Reel component to render symbols and handle spinning
const Reel = ({ x, symbols, spinning }) => {
  const [position, setPosition] = useState(0);
  const tickerRef = useRef(null);

  useEffect(() => {
    const ticker = new PIXI.Ticker();
    ticker.autoStart = false;

    tickerRef.current = ticker;

    const update = () => {
      setPosition((prev) => {
        const newPos = prev + 20; // Adjust speed as needed
        return newPos >= SYMBOL_HEIGHT * symbols.length
          ? newPos - SYMBOL_HEIGHT * symbols.length
          : newPos;
      });
    };

    ticker.add(update);

    if (spinning) {
      ticker.start();
    } else {
      // Decelerate before stopping
      const decelerate = () => {
        ticker.speed *= 0.95; // Reduce speed gradually
        if (ticker.speed < 0.1) {
          ticker.stop();
          ticker.speed = 1;
        }
      };
      ticker.on('tick', decelerate);
    }

    return () => {
      ticker.stop();
      ticker.remove(update);
    };
  }, [spinning, symbols.length]);

  return (
    <Container x={x} y={0}>
      {symbols.map((symbol, index) => (
        <Text
          key={index}
          text={symbol}
          style={{ fontSize: 64, fill: 0xffffff }}
          y={position + index * SYMBOL_HEIGHT}
        />
      ))}
    </Container>
  );
};

export default SlotMachine;
