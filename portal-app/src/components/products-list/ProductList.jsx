import './ProductList.css'
import { useState, useEffect } from 'react';
import Basket from '../../images/shopping-cart.png'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



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

const Tooltip = ({text}) => {
  return (
    <div className='tooltip'>
      {text}
    </div>
  )
}

function ProductList() {
  const [cards, setCards] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipVisibleId, setTooltipVisibleId] = useState(null);

  useEffect(() => {
    fetch('/data/data.json')
      .then(res => res.json())
      .then(data => setCards(data))
      .catch(err => console.log(err));
  }, []);

  const handleAddToCart = (product) => {
    setSelectedProduct(product);
    setModalShow(true);
  }

  return(
    <div className="list-container">
      <ul className="products-list">
      {cards.map((product) => (
         <li key={product.id} className='product-box'>
          <div className='image-box'>
            <img src={product.image} alt='smth' className='image'/>
            <div className="basket-wrapper">
              <img 
                src={Basket} 
                className='addToBasket' 
                onClick={() => handleAddToCart(product)}
              />
              <Tooltip text="додати в кошик" />
            </div>
          </div>
          
          <div className='description-box'>
            <p>{product.title}</p>
            <div className='price-box'>
              <span>{product.oldPrice}</span>
              <span>{product.newPrice}</span>
            </div>
          </div>
        </li>
      ))}
      </ul>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={selectedProduct}
      />

    </div>
  )
}

export default ProductList;