import React from 'react'
import '../ProductListCart/productListCart.styles.scss';
const ProductListCart = ({cartProducts, OnCartproductIncrement, OnCartproductDecrement}) => {
  return (
    <div className='product-list-cart'>
      { cartProducts && cartProducts.length > 0 ? cartProducts.map((item, index) => (
        <div className="filter-card">
        <div className="product-image">
          <img src={`data:image/png;base64,${item.product_ImageData}`} alt="CartItem"/>
        </div>
        <div className='product-content'>
          <div className='product-description'>
            <h1>{item.product_name}</h1>
            <p>{item.product_description}</p>
          </div>
          <div className='product-cost'>
            <div className='rating'>
              <p>User Ratings: {item.product_ratings}/5.0</p>
            </div>
            <div className='cost'>
              <div className='cost-value'>
                <p>Cost:</p>
                <p>$ {item.product_price}</p>
              </div>
              <div class="product-count">
                <button class="button-count" onClick={() => OnCartproductDecrement(item._id, item)}>-</button>
                <input type="text" readonly class="number-product" value={item.product_quantity} />
                <button class="button-count" onClick={() => {OnCartproductIncrement(item._id, item)}}>+</button>
              </div>
            </div>
          </div>
         
        </div>
      </div>
      )): 
      <div>
        <h1>No Items Added in cart yet</h1>
      </div>
      }
      
    </div>
  )
}

export default ProductListCart