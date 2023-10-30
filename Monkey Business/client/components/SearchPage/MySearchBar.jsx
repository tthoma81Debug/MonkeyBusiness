import React from 'react'
import * as data from './dataHelper.js'
import { Row } from 'react-bootstrap'
export const MySearchBar = () => {
  const [searchInput, setSearchInput] = React.useState('')
  const [stock, setStock] = React.useState([])
  const [searchResult, setSearchResult] = React.useState([''])
  React.useEffect(() => {
    const fetchData = async () => {
      const stockData = await data.retrieveStocks()
      setStock(stockData)
    }
    fetchData()
  }, [])
  const handleChange = (e) => {
    e.preventDefault()
    setSearchInput(e.target.value)
    if (e.target.value.length > 0) {
      const newStocksName = []
      const regex = new RegExp(e.target.value, 'gmi')
      stock.map((stockData) => {
        if (String(stockData.name).match(regex) != null) {
          newStocksName.push(stockData.name)
        }
        console.log('Stock' + newStocksName)
        if (e.target.value === '' || e.target.value === null) {
          setSearchResult(stocks)
        } else {
          setSearchResult(newStocksName)
        }
        return ([])
      })
    }
  }
  console.log('Result' + searchResult)
  const stocks = searchResult.map(
    (thisStock) => {
      console.log(thisStock)
      return (
      <Row className = 'px-3 py-3 pt-1 pb-2' key = {thisStock}> {thisStock} </Row>
      )
    }
  )
  return (
    <React.Fragment>
        <Row className = 'px-3 py-3 pt-1 pb-2 bg-dark'>
            <input
              id = 'searchForm'
              type='text'
              placeholder='Search'
              className='pl-1'
              value = {searchInput}
              onChange={ handleChange }
            />
        </Row>
        {stocks}
      </React.Fragment>
  )
}
