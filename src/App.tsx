import './App.css'
import React  from 'react'
import UserList from './hooks/useList'

function App() {
  return (
    <>
      <div className="flex min-h-screen p-6 justify-center items-start">
        <UserList />
      </div>
    </>
  );
}

export default App
