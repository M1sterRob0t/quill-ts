import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { setupWorker } from 'msw/browser';
import { handlers } from './msw.ts';

export const worker = setupWorker(...handlers);

async function enableMocking() {
  return worker.start();
}

enableMocking().then(() => {
  const root = document.getElementById('root');
  if (root) {
    ReactDOM.createRoot(root).render(<App />);
  }
});

