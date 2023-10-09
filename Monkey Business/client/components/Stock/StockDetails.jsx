import React from 'react'
import PropTypes from 'prop-types'

export default function StockDetails (props) {
  const { name, amount, price } = props
  return (

<div className="container">
  <div className="row">
    <div className="col-5 image">
      <img className='image' id='details-image' src='' alt='Full game poster for' />
    </div>
    <div className="col-7">
      <div className="row">
        <div className="col-5"><h4>{'Stock Name: '}</h4></div>
        <div className="col-5">{name}</div>
        <div className="col-5"><h4>{'Amount: '}</h4></div>
        <div className="col-5">{amount}</div>
        <div className="col-5"><h4>{'Price: '}</h4></div>
        <div className="col-5">{price}</div>
      </div>
    </div>
  </div>
</div>

  )
}
StockDetails.propTypes = {
  name: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired
}
StockDetails.defaultProps = {

}
