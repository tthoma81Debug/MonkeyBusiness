import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MyNavBar from './Navigation/MyNavBar.jsx'
import Home from './Home/HomePage.jsx'
import MonkeTech from './MonkeyTech/MonkeyTechPage.jsx'
import IntroPage from './Intro/IntroPage.jsx'
import SettingsPage from './Setting/SettingsPage.jsx'
import StatsPage from './Stat/StatsPage.jsx'
import { MySearchBar } from './SearchPage/MySearchBar.jsx'
import LoginCard from './Login_Signup/LoginRegisterForm.jsx'
import SignUpCard from './Login_Signup/SignUpRegisterForm.jsx'
export default function App () {
  const [username, setUsername] = React.useState('')
  const [logInStatus, setLogInStatus] = React.useState(false)
  function onLogInChange (username) {
    setUsername(username)
    setLogInStatus(true)
  }
  return (
    <React.Fragment>
    <MyNavBar loggedIn = {logInStatus}/>
    <Routes>
        <Route path="/" exact element={<Home name = {username}/>} />
        <Route path="/login" element = { <LoginCard onLogIn={onLogInChange}/> } />
        <Route path="/about" Component={IntroPage } />
        <Route path = "/signup" element = { <SignUpCard onSignUp = {onLogInChange}/>}/>
        <Route path = "/monkeyTech" Component = {MonkeTech}/>
        <Route path = "/setting" element = {
        <SettingsPage
          name = { username }
          setLogIn = {setLogInStatus}
          setName = {setUsername}
          >
        </SettingsPage>
        }/>
        <Route path = "/stats" Component = {StatsPage}/>
        <Route path = "/search" Component = {MySearchBar}/>
    </Routes>
    </React.Fragment>
  )
}
