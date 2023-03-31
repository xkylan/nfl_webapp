import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GA4React, { useGA4React } from "ga-4-react";

const ga4react = new GA4React('G-GK6RKKDPE7');

const ga = useGA4React();
console.log(ga);

const root = ReactDOM.createRoot(document.getElementById('root'));

(async () => {
  await ga4react.initialize();

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
})();


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
