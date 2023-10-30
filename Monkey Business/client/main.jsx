// Uncomment the codes to check each page
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App.jsx'
import { BrowserRouter } from 'react-router-dom'
// import SignupPage from './components/Login_Signup/SignupPage.jsx'
// import LoginPage from './components/Login_Signup/LoginPage.jsx'
// import IntroPage from './components/Intro/IntroPage.jsx'
// import MonkeTech from './components/MonkeyTech/MonkeyTechPage.jsx'
const root = createRoot(document.getElementById('root'))
root.render(
      <BrowserRouter>
       <App />
      </BrowserRouter>
  // <SignupPage/>
  // <LoginPage/>
  // <IntroPage/>
  // <MonkeTech/>
)
