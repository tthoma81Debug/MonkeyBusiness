import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

function SignUpCard () {
  return (
    <Card style={{ width: '18rem' }} className="mx-auto">
      <Card.Body>
        <Card.Title>Sign Up</Card.Title>
        <Card.Text>
          Enter your gmail:
        </Card.Text>
        <Form.Control
            type="text"
            placeholder="Ex: abc@gmail.com"
            className=" mr-sm-2"
            id="gmail"
        ></Form.Control>
        <Card.Text>
          Enter your username:
        </Card.Text>
        <Form.Control
            type="text"
            placeholder="Ex: Babykute1234"
            className=" mr-sm-2"
            id="username"
        ></Form.Control>
        <Card.Text>
          Enter your password:
        </Card.Text>
        <Form.Control
            type="text"
            placeholder="Ex: password"
            className=" mr-sm-2"
            id="password"
        ></Form.Control>
        <Button variant="primary">Sign Up</Button>
      </Card.Body>
    </Card>
  )
}

export default SignUpCard
