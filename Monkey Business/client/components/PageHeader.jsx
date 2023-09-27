import React from 'react'
import PropTypes from 'prop-types'

export default function PageHeader (props) {
  const { title, subTitle } = props

  return (
    <div className="pb-2 mt-4 mb-2 border-bottom" style={{ width: '100%' }}>
      <h1>{title}</h1>
      {subTitle}
    </div>
  )
}

PageHeader.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string
}

PageHeader.defaultProps = {
  title: 'Page Title',
  subTitle: 'Page Subtitle'
}
