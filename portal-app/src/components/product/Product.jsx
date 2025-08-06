import './Product.css'
import Tooltip from '../ui/Tooltip.jsx';
import Basket from '../../images/shopping-cart.png'

function Product({product, onAddToCard}) {
  return(
    <li key={product.id} className='product-box'>
          <div className='image-box'>
            <img src={product.image} alt='smth' className='image'/>
            <div className="basket-wrapper">
              <img 
                src={Basket} 
                className='addToBasket' 
                onClick={() => onAddToCard(product)}
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
  )
}

export default Product;