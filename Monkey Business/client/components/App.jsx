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
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap'
import { tutorialModal } from './Tutorial/tutModal.jsx'

export default function App (props) {
  const [darkMode, setDarkMode] = React.useState(false)
  const handleDarkMode = () => {
    setDarkMode(!darkMode)
    }
  const theme = (darkMode ? 'dark' : 'light')
  document.getElementById('html').setAttribute('data-bs-theme', darkMode ? 'dark' : 'light')
  console.log(darkMode)
  const [modalShow, setModalShow] = React.useState(false);
  console.log("modal log ",modalShow)

  return (
    <React.Fragment>
      <div data-bs-theme={theme}>
        <Button onClick={handleDarkMode} data-bs-theme={theme}>Dark Mode</Button>
        
        
        <MyNavBar data-bs-theme={theme}/>
        

        <Routes>
          <Route path="/" exact element= {<Home theme={theme}/>}/>
          <Route path="/login" Component={LoginPage} />
          <Route path="/about" Component={IntroPage} />
          <Route path="/signup" Component={SignupPage} />
          <Route path="/monkeyTech" Component={MonkeTech} />
          <Route path="/setting" Component={SettingsPage} />
          <Route path="/stats" Component={StatsPage} />
        </Routes>
        
      </div>
      <div>
      console.log("hit")
      <Button variant="primary" onClick={() => setModalShow(true)}>Help</Button>
      <tutorialModal show={modalShow} onHide={() => setModalShow(false)}></tutorialModal>
      </div>
    </React.Fragment>
    
  )
}
