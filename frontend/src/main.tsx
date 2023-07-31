import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import styles from './index.css';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
