import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { logIn } from './dataHelper'
import PropTypes from 'prop-types'
// import { useHistory } from 'react-router-dom'
let myTheme = 'light'
let buttonTheme = 'outline-dark'
const isMidnight = true
if (isMidnight) { myTheme = 'dark' }
if (myTheme === 'light') {
  buttonTheme = 'outline-dark'
} else {
  buttonTheme = 'outline-light'
}
function LoginCard (props) {
  const { onLogIn } = props
  // const history = useHistory()
  const [name, setName] = React.useState('')
  const [pass, setPass] = React.useState('')
  async function handleSubmit (e) {
    e.preventDefault()
    const user = {
      username: name,
      password: pass
    }
    if (await logIn(user)) {
      onLogIn(name)
      // history.push('/')
    }
  }
  return (
    <div data-bs-theme={myTheme}>
      <Card style={{ width: '18rem' }} className="mx-auto mt-5">
        <Card.Body>
          <form method = 'post' onSubmit={handleSubmit}>
        <label>
          {'Please enter your information to log in.'}
        </label>
        <label>
        {'Username: '}
        <input
          name="username"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        </label>
        <label>
        {'Password: '}
        <input
          name="password"
          value={pass}
          onChange={e => setPass(e.target.value)}
        />
        </label>
        <label>
          <Button type = 'submit' className = 'mt-3' variant={buttonTheme} >Log In</Button>
        </label>
        </form>
        </Card.Body>
      </Card>
    </div>
  )
}
LoginCard.propTypes = {
  onLogIn: PropTypes.func
}
export default LoginCard
