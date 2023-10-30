import React from 'react'
import PropTypes from 'prop-types'

const gameSummaryStyle = {
  border: 'solid 1px lightgrey',
  borderRadius: '10px',
  boxShadow: 'lightgrey 3px 3px 6px',
  transition: 'box-shadow 0.3s ease-in-out',
  textAlign: 'center',
  padding: '5px',
  marginBottom: '15px',
  verticalAlign: 'bottom',
  cursor: 'pointer'
}

const summaryTitleStyle = {
  display: 'block',
  fontSize: 'medium',
  height: '4.5em'
}

const summaryInfoStyle = {
  display: 'block',
  fontSize: 'medium',
  height: '5em'
}

const imageStyle = {
  display: 'block',
  margin: 'auto',
  width: 'auto',
  height: 'auto',
  maxWidth: '100%',
  maxHeight: '100%',
  borderRadius: '10px',
  objectFit: 'cover'
}

export default function StockRow (props) {
  const { stockID, name, amount, price } = props

  const handleClick = (event) => {
    event.preventDefault()
    // User has requested details
    onDetailsRequested(stockID)
  }

  return (
    <div className='col-sm-6 col-md-4 col-lg-3' onClick={handleClick}>
      <div style={gameSummaryStyle}>
        <span style={summaryTitleStyle}>{name}</span>
        <img
          alt={`Poster for ${name}`}
          src={`${image}`}
          height='250px'
          style={imageStyle}
        />
        <br />
        <span style={summaryInfoStyle}>
          {publishers.slice(0, 2).join(', ')}
          <br />
          {`Year: ${year}, Rating: ${rating}`}
        </span>
      </div>
    </div>
  )
}
StockRow.propTypes = {
  gameID: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  publishers: PropTypes.arrayOf(PropTypes.string),
  image: PropTypes.string,
  onDetailsRequested: PropTypes.func
}

StockRow.defaultProps = {
  publishers: [],
  onDetailsRequested: () => {},
  image: '/public/images/defaultImage.jpg'
}
