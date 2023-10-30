import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'bootstrap'
import BootstrapModal from './BootstrapModal_draft.jsx'

export default function FormModal (props) {
  // eslint-disable-next-line react/prop-types
  const { open, onClose, children } = props

  const modalRef = React.useRef()
  const [modalObj, setModalObj] = React.useState(null)
  React.useEffect(() => {
    if (modalRef.current && !modalObj) {
      const gameFormModal = new Modal(modalRef.current)
      modalRef.current.addEventListener('hidden.bs.modal', event => {
        onClose()
      })
      setModalObj(gameFormModal)
    }
  }, [onClose, modalObj])

  React.useEffect(() => {
    if (modalObj) {
      if (open) {
        modalObj.show()
      } else {
        modalObj.hide()
      }
    }
  }, [open, modalObj])

  return (
    <div ref={modalRef} className="modal fade" tabIndex="-1" aria-hidden="true">
    <div className="modal-dialog modal-xl">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="formModalLabel">
            <span>{'Add/Edit Game'}</span>
          </h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">{'Close'}</button>
          <button type="button" className="btn btn-primary">{'Save changes'}</button>
        </div>
      </div>
    </div>
  </div>
  )
}
BootstrapModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  gameName: PropTypes.string,
  children: PropTypes.node
}
BootstrapModal.defaultProps = {
  gameName: 'Modal Title',
  children: null
}
