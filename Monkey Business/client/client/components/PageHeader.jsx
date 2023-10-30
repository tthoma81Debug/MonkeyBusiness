import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

export default function PageHeader (props) {
  const { title } = props

  return (
    // <div className="pb-2 mt-4 mb-2 border-bottom" style={{ width: '100%' }}>
    //   <h1>{title}</h1>
    //   {subTitle}
    // </div>
    <header>
      <div>
        {title}
      </div>
      <Button style={{ float: 'right' }}> Log In </Button>
      <Button style={{ float: 'right' }}> Sign Up </Button>
    </header>
  )
}

PageHeader.propTypes = {
  title: PropTypes.string
}

PageHeader.defaultProps = {
  title: 'Page Title'
}
