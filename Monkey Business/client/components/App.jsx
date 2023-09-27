import React from 'react'

import PageHeader from './PageHeader.jsx'
import StockTable from './PortfolioPage.jsx'
import StockDetails from './StockDetails.jsx'
import BootstrapModal from './BootstrapModal.jsx'
import FormModal from './FormModal.jsx'
import LoginRegisterForm from './LoginRegisterForm.jsx'
import { retrieveGameDetails } from '../mbdataHelper'

export default function App (props) {

  const [currentGame, setCurrentGameID] = React.useState('')
  const [showDetailsModal, setShowDetailsModal] = React.useState(false)
  const [showFormModal, setShowFormModal] = React.useState(false)

  const detailsRequested = (gameID) => {
    console.log('details requested for gameID: ' + gameID)
    setCurrentGameID(gameID)
    setShowDetailsModal(true)
  }
  const [currentGameData, setCurrentGameData] = React.useState(null)
  React.useEffect(() => {
    const fetchGameData = async () => {
      const gameData = await retrieveGameDetails(currentGame)
      setCurrentGameData(gameData)
    }

    if (currentGame !== '') {
    fetchGameData(currentGame)
    }
  } , [currentGame])
  return (
    // <div className='container'>
    //   <PageHeader title='Game Browser' subTitle='' />
    //   <GameGrid onDetailsRequested={detailsRequested}/>
    //   <BootstrapModal
    //   open={showDetailsModal}
    //   gameName={`${currentGameData?.name} (${currentGameData?.gameID})`}
    //   onClose={() => setShowDetailsModal(false)}
    //   >

    //     {!!currentGameData && <GameDetails {...currentGameData} />}
    //   </BootstrapModal>
    //   <FormModal
    //   open={showFormModal}
    //   gameName={`${currentGameData?.name} (${currentGameData?.gameID})`}
    //   onClose={() => setShowFormModal(false)}
    //   >

    //     {!!currentGameData && <GameForm {...currentGameData} />}
    //   </FormModal>


    // </div>
    <div className='container'>
      <p>Hello World!</p>\
    </div>

  )
}
