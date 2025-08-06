import './ProductList.css'
import { useState, useEffect } from 'react';
import Modal from '../modal/MyVerticallyCenteredModal.jsx'
import Product from '../product/Product.jsx'

function ProductList() {
  const [cards, setCards] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
        <Product 
          key={product.id}
          product={product}
          onAddToCard={handleAddToCart} 
        />
      ))}
      </ul>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={selectedProduct}
      />
    </div>
  )
}

export default ProductList;