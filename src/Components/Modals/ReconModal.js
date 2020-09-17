import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import AddEditForm from '../Forms/AddEditForm'

function ModalReconForm(props) {
  const [modal, setModal] = useState(false)

  const toggle = () => {
    setModal(!modal)
  }

  const closeBtn = <button className="close" onClick={toggle}>&times;</button>
  const label = props.buttonLabel

  let button = ''
  let title = ''

  if(label === 'Edit'){
    button = <Button
              color="warning"
              onClick={toggle}
              style={{float: "left", marginRight:"10px"}}>{label}
            </Button>
    title = 'Edit Item'
  } else {
    button = <Button
              color="success"
              onClick={toggle}
              style={{float: "left", marginRight:"10px"}}>{label}
            </Button>
    title = 'Add New Item'
  }


  return (
    <div>
      {button}
      <Modal isOpen={modal} toggle={toggle} className={props.className}>
        <ModalHeader toggle={toggle} close={closeBtn}>{title}</ModalHeader>
        <ModalBody>
          <AddEditForm
            addItemToState={props.addItemToState}
            updateReconState={props.updateReconState}
            toggle={toggle}
            item={props.item} />
        </ModalBody>
      </Modal>
    </div>
  )
}

export default ModalReconForm