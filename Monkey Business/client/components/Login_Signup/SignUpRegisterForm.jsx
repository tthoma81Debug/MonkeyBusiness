import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { signUp } from './dataHelper.js'
import PropTypes from 'prop-types'
// dummy theme stuff
let myTheme = 'light'
let buttonTheme = 'outline-dark'
const isMidnight = true
if (isMidnight) { myTheme = 'dark' }
if (myTheme === 'light') {
  buttonTheme = 'outline-dark'
} else {
  buttonTheme = 'outline-light'
}

function SignUpCard (props) {
  const { onSignUp } = props
  const [newUsername, setNewUsername] = React.useState('')
  const [newPassword, setNewPassword] = React.useState('')
  const [newFirstName, setNewFirstName] = React.useState('')
  const [newLastName, setNewLastName] = React.useState('')
  const [newGmail, setNewGmail] = React.useState('')
  const [confirmPass, setConfirmPass] = React.useState('')

  async function handleSubmit (e) {
    e.preventDefault()
    if (
      newFirstName !== '' &&
      newLastName !== '' &&
      newGmail.endsWith('@gmail.com') &&
      newUsername !== '' &&
      newPassword !== '' &&
      confirmPass !== ''
    ) {
      const newUser = {
        username: newUsername,
        password: newPassword,
        passwordConfirm: confirmPass,
        email: newGmail
      }
      console.log(newUser)
      if (await signUp(newUser)) {
        console.log('Sign Up Successfully')
        onSignUp(newUsername)
      }
    } else {
      console.log('Missing information')
    }
  }
  return (
    <div data-bs-theme={myTheme}>
      <Card style={{ width: '18rem' }} className="mx-auto mt-5">
      <Card.Body>
      <form method = "post" onSubmit={handleSubmit}>
        <label>
          {'Please enter your information to create a new account.'}
        </label>
        <label>
        {'First Name: '}
        <input
          name="firstName"
          value={newFirstName}
          onChange={e => setNewFirstName(e.target.value)}
        />
        </label>
        <label>
        {'Last Name: '}
        <input
          name="lastName"
          value={newLastName}
          onChange={e => setNewLastName(e.target.value)}
        />
        </label>
        <label>
        {'Gmail: '}
        <br/>
        <input
          name="gmail"
          value={newGmail}
          onChange={e => setNewGmail(e.target.value)}
        />
        </label>
        <label>
        {'Username: '}
        <input
          name="username"
          value={newUsername}
          onChange={e => setNewUsername(e.target.value)}
        />
        </label>
        <label>
        {'Password: '}
        <input
          name="password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
        />
        </label>
        <label>
        {'Confirm Password: '}
        <input
          name="confirm_password"
          value={confirmPass}
          onChange={e => setConfirmPass(e.target.value)}
        />
        </label>
        <label>
          <Button type = 'submit' className = 'mt-3' variant={buttonTheme} >Sign Up</Button>
        </label>
      </form>
      </Card.Body>
    </Card>
    </div>
  )
}
SignUpCard.propTypes = {
  onSignUp: PropTypes.func
}
export default SignUpCard
