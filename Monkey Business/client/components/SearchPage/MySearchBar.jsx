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
    const newStocksName = []
    setSearchInput(e.target.value)
    if (e.target.value.length > 0) {
      const regex = new RegExp(e.target.value, 'gmi')
      stock.map((stockData) => {
        if (String(stockData.name).match(regex) != null) {
          newStocksName.push(stockData.name)
        }
        console.log('Stock' + newStocksName)
        return ([])
      })
    } else {
      stock.map((stockData) => {
        newStocksName.push(stockData.name)
        return ([])
      })
    }
    setSearchResult(newStocksName)
  }
  console.log('Result' + searchResult)
  let k = 0
  const stocks = searchResult.map(
    (thisStock) => {
      k++
      console.log(thisStock)
      return (
      <Row className = 'px-3 py-3 pt-1 pb-2' key = {k}> {thisStock} </Row>
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
