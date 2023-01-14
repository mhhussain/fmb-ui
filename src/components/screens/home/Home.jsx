import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useLocation, Outlet } from 'react-router-dom';
import Header from '@/atoms/navigators/Header';
import '@/styles/Home.css';
import { useSelector } from 'react-redux';

export default function Home() {
  const loggedIn = useSelector((state) => state.loggedIn.loggedIn);

  // If state and memberData does not exist - redirect to /login
  if (!loggedIn) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <div className="App">
      <Header />
      <h1>FMB</h1>
      <div className="font-black">
        <p>Logged in</p>
      </div>
      <div>
        <Outlet />
      </div>
      <p className="footer">© Anjuman-e-Najmi, Detroit 2023</p>
    </div>
  );
}
