export async function retrieveStocks () { // needs to pull stocks for search home page (top 5 daily performers?) and needs to pull stocks based on search parameters. Can split into 2 functions if needed.
  try {
    const response = await fetch('api/stocks')
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    }
    return await response.json()
  } catch (err) {
    console.error('Failed to retrieve array of stocks')
    console.error(err)
    return []
  }
}

export async function retrieveStockDetails (stockID) { // pull additional stock data. Additional feature if possible
  try {
    const response = await fetch(`http://localhost:3000/api/stocks/${stockID}`)
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    }
    return await response.json()
  } catch (err) {
    console.error('Failed to retrieve stock details')
    console.error(err)
    return null
  }
}

export async function postBuyStock (stockObj) { // add stock to profile
  try {
    const response = await fetch('api/stocks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(stockObj)
    })
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    }
    return true
  } catch (err) {
    console.error('Failed to Add Stock')
    console.error(err)
    return false
  }
}
export async function postSellStock (stockObj) { // add stock to profile
  try {
    const response = await fetch('api/stocks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(stockObj)
    })
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    }
    return true
  } catch (err) {
    console.error('Failed to Sell Stock')
    console.error(err)
    return false
  }
}
// export async function putGameInput (gameObj) {
//   try {
//     const response = await fetch('api/games', {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(gameObj)
//     })
//     if (response.status >= 400) {
//       throw new Error(`Request failed with response code ${response.status}`)
//     }
//     return true
//   } catch (err) {
//     console.error('Failed to Input Game')
//     console.error(err)
//     return false
//   }
// }
export async function deleteAccount (accountID) { // previously deleteGame
  try {
    const response = await fetch(`api/stocks/${accountID}`, {
      method: 'DELETE'
    })
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    }
    return true
  } catch (err) {
    console.error('Failed to remove stock')
    console.error(err)
    return false
  }
}
