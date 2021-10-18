import store from 'app/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'simplebar';
import 'simplebar/dist/simplebar.min.css';
import 'swiper/swiper.scss';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ToastContextProvider } from 'context/toastContext';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <ToastContextProvider>
          <App />
        </ToastContextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);  

reportWebVitals();