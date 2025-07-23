import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Failed to find the root element');
}

// Créer le root une seule fois
const root = createRoot(container);

// Rendu de l'application
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
