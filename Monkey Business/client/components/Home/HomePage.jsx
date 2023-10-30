import React from 'react'
import PropTypes from 'prop-types'
function Home (props) {
  const { name } = props
  let content
  if (name !== '') {
    content = (<div> Welcome {name} </div>)
  } else {
    content = (<div> Home page placeholder</div>)
  }
  return (
  <React.Fragment>
    {content}
  </React.Fragment>
  )
}
Home.propTypes = {
  name: PropTypes.string
}
Home.defaultProps = {
  name: ''
}
export default Home
