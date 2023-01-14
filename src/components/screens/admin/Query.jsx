import { useState } from 'react';
import Header from '@/atoms/navigators/Header';
import AdminQuery from '@/organisms/admin-queryer';

import '@/styles/Home.css';

export default function Query() {
  return (
    <div className="App">
      <Header />
      <h1>FMB DB Query Page</h1>
    </div>
  );
}
