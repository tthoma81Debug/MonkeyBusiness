import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

function LoginCard () {
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
        >
        </Form.Control>
        <Card.Text>
          Enter your password:
        </Card.Text>
        <Form.Control
            type="text"
            placeholder="Your password here"
            className=" mr-sm-2"
            id="password"
        ></Form.Control>
        <Button variant="primary">Log In</Button>
      </Card.Body>
    </Card>
  )
}

export default LoginCard
