import { useEffect, useState } from 'react'
import './App.css'
import { getAllPlayers, getPlayerGames } from './services/PlayerServices'
import { Route, Routes } from 'react-router-dom'
import { Login } from './auth/login'
import { Register } from './auth/register'
import { Authorized } from './views/Authorized'
import ApplicationViews from './views/ApplicationViews'
import { NavBar } from './views/NavBar'

function App() {
  return (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    <Route index path="*" element={
      <Authorized>
        <>
        <NavBar />
          <ApplicationViews />
        </>
      </Authorized>

    } />
  </Routes>
  )
}

export default App
