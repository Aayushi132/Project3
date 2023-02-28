import React, {useEffect, useState, useContext} from 'react';
import '../PriceDetails/priceDetails.styles.scss';
import {ProductContext} from '../../../contexts/getProductsInfo.context';
import { useNavigate } from "react-router-dom";

function PriceDetails({cartProducts}) {
  const navigate = useNavigate();
  const [totalSum, setTotalSum] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [checkUserLogin, setcheckUserLogin] = useState(0)
  const [userAddress, setuserAddress] = useState('')
  const {CartCount, setCartCount, calculateTotalItems, IsUserLogin, getUserInfo} = useContext(ProductContext)
  const calculateTotal = (cartProducts) => {
    const ItemTotal = []
    cartProducts.map((item) => {
      const item_total = item.product_quantity * item.product_price
      ItemTotal.push(item_total)
    })
    const sum = ItemTotal.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const discount = 0.2 * sum;
    const totalCartCount = calculateTotalItems(cartProducts)
    setCartCount(totalCartCount)
    setTotalSum(sum)
    setDiscount(discount)
}
  const getUserAddress = async() => {
    const getEmail = localStorage.getItem("EcartUserEmail")
    const getFbloginID = localStorage.getItem("fbloginID")
    if(getEmail) {
      getUserInfo(getEmail, 'userLogin').then(result => {
        if(result?.responseData?.address) {
          setuserAddress(result?.responseData?.address)
        }
        else {
          setuserAddress('')
        }
      });
    }
    else if(getFbloginID) {
      getUserInfo(getFbloginID, 'fbLogin').then(result => {
        if(result?.responseData?.address) {
          setuserAddress(result?.responseData?.address)
        }
        else {
          setuserAddress('')
        }
       
      });
    }
  }

  useEffect(() => {
    calculateTotal(cartProducts)
    setcheckUserLogin(IsUserLogin)
    if(IsUserLogin === "true") {
      getUserAddress()
    }
  }, [cartProducts, IsUserLogin])

  const checkout = () => {
    navigate('/signup')
  }
  return (
    <>
      {
        cartProducts && cartProducts.length > 0 ? (
          <div className='price-details-wrapper'>
          <div className='price-details'>
          <h1>Price Details</h1>
          <div className='product-price'>
            <div className='row'>
              <div className='column'><p>Price ({CartCount} Items)</p></div>
              <div className='column'><p>${totalSum}</p></div>
      
            </div>
            <div className='row'>
              <div className='column'><p>Discount</p></div>
              <div className='column'><p>${discount}</p></div>
              
            </div>
            <div className='row'>
              <div className='column'><p>Delivery Charges</p></div>
              <div className='column'><p>Free</p></div>
              
            </div>
            <hr/>
            <div className='row'>
              <div className='column'><b>Total Amount</b></div>
              <div className='column'>${totalSum - discount}</div>
      
            </div>
            <hr/>
            <div><p><b>You will save ${discount} on this order</b></p></div>
          </div>
          </div>
          {
            checkUserLogin === "true" ? 
            (
              <div className='delivery-address-wrapper'>
                <h3>Delivery Address</h3>
                {
                  userAddress === '' ? (<><h3>No address found</h3><div><button class="button-checkout button3" onClick={() => {navigate("/signup")}}>Choose Address</button></div></>) :  <p className='delivery-address'>{userAddress}</p>
                }
               
              </div>
            ): null
          }
          <div className='checkout'>
            {checkUserLogin === "true" ? <button class="button-checkout button3">Place Order</button> : <button class="button-checkout button3" onClick={() => {checkout()}}>Checkout</button>}
          </div>
          </div>
        ) :
       <></>
          
      }
      
    </>
  )
}

export default PriceDetails