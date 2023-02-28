import React, { useEffect, useState, useContext} from "react";
import "../Cart/cart.styles.scss";
import ProductListCart from "./ProductListCart/productListCart.component";
import PriceDetails from "./PriceDetails/priceDetails.component";
import { ProductContext } from "../../contexts/getProductsInfo.context";
// Will show the list of elements in cart with Price Details
const Cart = () => {
  const{storedCartItems, setStoredCartItems, IsUserLogin} = useContext(ProductContext)
  console.log("IsUserLogin", IsUserLogin)
  const [cartProducts, setCartProducts] = useState(storedCartItems)

  const OnCartproductIncrement = (itemId, product) => {
    storedCartItems.map((cartItem) => {
       if(cartItem._id === itemId) {
        cartItem.product_quantity++
       }
    })
    setStoredCartItems(storedCartItems)
    localStorage.setItem("CartData", JSON.stringify(storedCartItems));
    const newProductList = [...storedCartItems];
    setCartProducts(newProductList)
  }

  const OnCartproductDecrement = (itemId, product) => {
    storedCartItems.map((el, index) => {
      // check if quantity of item is zero and remove it
      const isItemQtyZero = storedCartItems
        .map((item) => item.product_quantity === 1)
        .includes(true);
      // remove that item from cart
      console.log("check for 0 item", isItemQtyZero)
      if (isItemQtyZero) {
        storedCartItems.pop(product);
      }
      else {
        if(el._id === itemId) {
          el.product_quantity--
         }
      }
    });
    setStoredCartItems(storedCartItems)
    localStorage.setItem("CartData", JSON.stringify(storedCartItems));
    const newProductList = [...storedCartItems];
    setCartProducts(newProductList)
  }

  return (
    <>
      {/* <div>cart</div>
      <ProductListCart cartItems={cartItems}/>
      <PriceDetails /> */}

       <div className="cart">
        {
          IsUserLogin === "true" ? 
          <div className="cart-breadcrum">
            <h3>CHECKOUT  &gt; LOGIN &gt; DELIVERY ADDRESS &gt; PLACE ORDER</h3>
          </div> : null
        }
        
      <div className="cart-heading">
        <div className="heading-name">
          <h1>CART</h1>
        </div>
        <div>
          <div className="btn-group">
          <button className="button"><a href="/">Continue shopping</a></button>
          </div>
        </div>
      </div>
      <div className="product-list-group">
      <ProductListCart cartProducts={cartProducts} OnCartproductIncrement={OnCartproductIncrement} OnCartproductDecrement={OnCartproductDecrement}/>
      <PriceDetails cartProducts={cartProducts}/>
      </div>
    </div>
    </>
  );
};

export default Cart;
