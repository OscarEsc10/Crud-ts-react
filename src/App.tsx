import './App.css';
import React  from 'react';
import UserList from './hooks/useList';
import Footer from './components/footer';
import Header from './components/header';
function App() {
  return (
    <>
      <div>
        <Header/>
      </div>
      <div className="flex min-h-screen p-6 justify-center items-start">
        <UserList />
      </div>
      <div>
        <Footer/>
      </div>
    </>
  );
}

export default App
