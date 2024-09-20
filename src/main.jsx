import { createRoot } from 'react-dom/client';
import { GameProvider } from './providers/GameProvider';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <GameProvider>
    <App />
  </GameProvider>
);
