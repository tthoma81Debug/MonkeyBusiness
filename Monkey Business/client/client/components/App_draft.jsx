import React from 'react'
// *********UNUSED***********
// import StockTable from './PortfolioPage.jsx'
// import StockDetails from './Stock/StockDetails.jsx'
// import BootstrapModal from './BootstrapModal_draft.jsx'
// import FormModal from './FormModal_draft.jsx'
// import { retrieveStockDetails } from '../mbdataHelper'
import { Route } from 'react-router-dom'
import Navigation from './Navigation/Navigation.jsx'

export default function AppDraft (props) {
  // const [currentStock, setCurrentStockID] = React.useState('')
  // const [showDetailsModal, setShowDetailsModal] = React.useState(false)
  // const [showFormModal, setShowFormModal] = React.useState(false)

  // const detailsRequested = (stockID) => {
  //   console.log('details requested for stockID: ' + stockID)
  //   setCurrentStockID(stockID)
  //   setShowDetailsModal(true)
  // }
  // const [currentStockData, setCurrentStockData] = React.useState(null)
  // React.useEffect(() => {
  //   const fetchStockData = async () => {
  //     const stockData = await retrieveStockDetails(currentStock)
  //     setCurrentStockData(stockData)
  //   }

  //   if (currentStock !== '') {
  //     fetchStockData(currentStock)
  //   }
  // }, [currentStock])
  return (
  // <div className='container'>
  //   <PageHeader title='Stock Browser' subTitle='' />
  //   <StockGrid onDetailsRequested={detailsRequested}/>
  //   <BootstrapModal
  //   open={showDetailsModal}
  //   stockName={`${currentStockData?.name} (${currentStockData?.stockID})`}
  //   onClose={() => setShowDetailsModal(false)}
  //   >

  //     {!!currentStockData && <StockDetails {...currentStockData} />}
  //   </BootstrapModal>
  //   <FormModal
  //   open={showFormModal}
  //   stockName={`${currentStockData?.name} (${currentStockData?.stockID})`}
  //   onClose={() => setShowFormModal(false)}
  //   >

  //     {!!currentStockData && <StockForm {...currentStockData} />}
  //   </FormModal>

    // </div>
    <React.Fragment>
      <Route>
      <Navigation></Navigation>
      </Route>
    </React.Fragment>
  )
}
