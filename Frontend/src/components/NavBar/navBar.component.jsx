import React, {useContext, useEffect, useState, useRef} from "react";
import "../NavBar/navBar.styles.scss";
import Logo from '../../assets/LogoMain.png';
import CartImg from '../../assets/shopping-cart.png';
import {ProductContext} from '../../contexts/getProductsInfo.context';
import MessagePopUp from "../MessagePopUp/messagePopUp.component";
import FacebookLogin from 'react-facebook-login';
const NavBar = () => {
  const {CartCount, storedCartItems, calculateTotalItems, setCartCount, IsUserLogin,setIsUserLogin, setUserLoginVal } = useContext(ProductContext)
  const [showLogOutPopup, setshowLogOutPopup] = useState(false)
  // const [LoggedInconf, setLoggedInconf] = useState(null)
  useEffect(() => {
   if(localStorage.getItem("CartData"))
   {  
    const countVal = calculateTotalItems(storedCartItems)
    setCartCount(countVal)
   }
   else {
    setCartCount(0)
   }

  }, [])



  const LogOut = () => {
    localStorage.removeItem('EcartUserEmail')
    localStorage.removeItem('fbloginID')
    localStorage.setItem('isEcartUserLoggedIn', false)
    
    setshowLogOutPopup(true)
    setIsUserLogin(false)
    setUserLoginVal(false)
    
    setTimeout(() => {
      setshowLogOutPopup(false)
    }, 1000)
  }
  
  return (
    <>
      <div className="page-navbar">
        <div className="logo-heading">
          <div className="logo">
          <a href="/">
            <img className="logo-img" src={Logo} alt="Logo" />
          </a>
          </div>          
        </div>

        <ul className="nav-links">
          <div className="menu">
            <li>
              <a href="/cart"><span className="itemCount">{CartCount > 0 ? `(${CartCount}) ` : null}</span>Cart <span> <img className="cart-img" src={CartImg} alt="cart" /></span></a>
            </li>
            <li>
              { IsUserLogin && IsUserLogin === "true" ? <button className="auth-btn" onClick={() => {LogOut()}}> Logout </button> : <a className="auth-btn"  href="/signup">Login | SignUp</a>}
            </li>
          </div>
        </ul>
        {
          showLogOutPopup ? (<MessagePopUp message={'Successfully Logged Out !'}/>) : null
        }
      </div>
    </>
  );
};
export default NavBar;
