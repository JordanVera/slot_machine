import React, { useState, useEffect } from 'react';
import { Stage, Graphics, Text, Container } from '@pixi/react';
import BottomBar from './BottomBar';

const symbols = ['🍎', '🍒', '🍋', '🍇', '🍉']; // Sample symbols

const SlotMachine = () => {
  const [spinning, setSpinning] = useState(false);
  const [reels, setReels] = useState([
    [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()],
    [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()],
    [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()],
  ]);
  const [positions, setPositions] = useState([0, 0, 0]);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Helper function to randomize symbols
  function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
  }

  const startSpin = () => {
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
      setReels([
        [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()],
        [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()],
        [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()],
      ]);
    }, 2000); // Stop after 2 seconds
  };

  useEffect(() => {
    let animationId;

    const spinReels = () => {
      if (spinning) {
        setPositions((prev) =>
          prev.map((pos) => (pos >= symbols.length * 64 ? 0 : pos + 10))
        );
        animationId = requestAnimationFrame(spinReels);
      }
    };

    spinReels();

    return () => cancelAnimationFrame(animationId);
  }, [spinning]);

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

  return (
    <div className="flex flex-col gap-5">
      <div className="relative">
        <Stage
          width={dimensions.width}
          height={dimensions.height}
          options={{ backgroundColor: '#1099bb' }}
        >
          <Container
            x={dimensions.width / 4}
            y={dimensions.height / 4}
            anchor={0.5}
          >
            {reels.map((reel, index) => (
              <Reel
                key={index}
                x={100 + index * 150}
                symbols={reel}
                position={positions[index]}
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
const Reel = ({ x, symbols, position }) => {
  return (
    <Container x={x} y={100}>
      {symbols.map((symbol, index) => (
        <Text
          key={index}
          text={symbol}
          style={{ fontSize: 64, fill: 0xffffff }}
          y={position + index * 64}
        />
      ))}
    </Container>
  );
};

export default SlotMachine;
