import React from 'react';
// NECESSÁRIO
import { BrowserRouter } from 'react-router-dom';
import Routes from './router';

import Header from './components/header/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes />
    </BrowserRouter>
  );
}

export default App;
