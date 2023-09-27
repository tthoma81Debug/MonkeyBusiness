import React from 'react'
import PropTypes from 'prop-types'

function renderHTML (rawHTML) {
  return React.createElement('div', {
    dangerouslySetInnerHTML: { __html: rawHTML }
  })
}


