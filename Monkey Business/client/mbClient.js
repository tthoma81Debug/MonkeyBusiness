import { retrieveStocks, retrieveStockDetails, postBuyStock, removeStock } from './mbdataHelper.js'
import { Modal } from 'bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'

const stockDetailsModal = new Modal('#detailsModal')
const loginModal = new Modal('#inputModal')
const deleteModal = new Modal('#deleteModal')

async function renderStockTable () {
  const stockData = await retrieveStocks()
  rebuildStockTableFromData(stockData)
}
async function showStockDetails (stockID) {
  // Retrieving details
  const stockDetails = await retrieveStockDetails(stockID)
  for (const key in stockDetails) {
    const element = document.getElementById(`details-${key}`)
    if (element) {
      if (key === 'image') {
        element.setAttribute('src', `${stockDetails[key]}`)
        element.setAttribute('alt', `Image for ${stockDetails.name}`)
      } else if (key === 'description') {
        element.innerHTML = stockDetails[key]
      } else if (key === 'designers' || key === 'artists' || key === 'publishers') {
        element.textContent = stockDetails[key].join(', ')
      } else {
        element.textContent = stockDetails[key]
      }
    }
  }
  stockDetailsModal.show()
}
function rebuildStockTableFromData (stockData) {
  const stockTable = document.querySelector('#stockTable')
  stockTable.innerHTML = ''
  stockTable.forEach((stock) => {
    // Create the table row for each stock in the stockData array ------------------To Do------------------

    stockTable.appendChild(stockRow)
  })
}

const LoginButton = document.getElementById('loginButton')
LoginButton.addEventListener('click', () => {
  loginModal.show()
})

function buyStock () {

}

renderStockTable()
