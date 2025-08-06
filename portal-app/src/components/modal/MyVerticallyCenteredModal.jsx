import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './MyVerticallyCenteredModal.css'

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className='modal-body'>
        <h4>You've just added this product to the cart:</h4>
         <p>{props.product?.title}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={props.onHide} className='bttn-modal'>Переглянути кошик</Button>
        <Button onClick={props.onHide} className='bttn-modal'>Продовжити</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;