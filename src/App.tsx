import React from 'react';

import { Index } from './layout';
import { Header } from './layout/header/Header';
import { LeftMenu } from './layout/leftmenu/LeftMenu';
import { QuanLyVe } from './layout/sidebar/QuanLyVe';

import './NewApp.css';

function App() {
  return (
    <div className="NewApp">
      <Header />
      <LeftMenu />
      <Index />
    </div>
  );
}

export default App;
