import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
<<<<<<< Updated upstream
import { logIn } from './dataHelper'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
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
  const history = useHistory()
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
      history.push('/')
    }
  }
=======
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'

function LoginCard () {
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("Login Button Pressed");
    // After your login function, redirect to "/"
    navigate("/");
  }

  return (
    <Card style={{ width: '18rem' }} className="mx-auto">
      <Card.Body>
        <Card.Title>Log In</Card.Title>
        <Card.Text>
          Enter your username:
        </Card.Text>
        <Form.Control
            type="text"
            placeholder="Your username here"
            className=" mr-sm-2"
            id="username"
        />
        <Card.Text>
          Enter your password:
        </Card.Text>
        <Form.Control
            type="password"
            placeholder="Your password here"
            className=" mr-sm-2"
            id="password"
        />
        <Button variant="primary" onClick={handleLogin}>Log In</Button>
      </Card.Body>
    </Card>
  )
}

export default LoginCard







/*old code

import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

function LoginCard () {
>>>>>>> Stashed changes
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

*/
