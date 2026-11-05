import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

// React takes over the empty <div id="root"> in index.html and draws <App /> inside it.
createRoot(document.getElementById('root')).render(<App />);
