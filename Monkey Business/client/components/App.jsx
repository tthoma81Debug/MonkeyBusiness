import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MyNavBar from './Navigation/MyNavBar.jsx'
import Home from './Home/HomePage.jsx'
import LoginPage from './Login_Signup/LoginPage.jsx'
import SignupPage from './Login_Signup/SignupPage.jsx'
import MonkeTech from './MonkeyTech/MonkeyTechPage.jsx'
import IntroPage from './Intro/IntroPage.jsx'
import SettingsPage from './Setting/SettingsPage.jsx'
import StatsPage from './Stat/StatsPage.jsx'
export default function App () {
  return (
    <React.Fragment>
    <MyNavBar/>
    <Routes>
        <Route path="/" exact Component={Home } />
        <Route path="/login" Component={LoginPage } />
        <Route path="/about" Component={IntroPage } />
        <Route path = "/signup" Component={SignupPage}/>
        <Route path = "/monkeyTech" Component = {MonkeTech}/>
        <Route path = "/setting" Component = {SettingsPage}/>
        <Route path = "/stats" Component = {StatsPage}/>
    </Routes>
    </React.Fragment>
  )
}
