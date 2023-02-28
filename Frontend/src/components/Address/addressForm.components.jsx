import React, { useContext, useEffect, useState } from "react";
import "../Address/addressForm.styles.scss";
import MessagePopUp from "../MessagePopUp/messagePopUp.component";
import { ProductContext } from "../../contexts/getProductsInfo.context";
import { useNavigate } from "react-router-dom";
const AddressForm = () => {
  const navigate = useNavigate();
  const { SubmitAddress, getUserInfo } = useContext(ProductContext);
  const [AddressformData, setAddressformData] = useState({
    firstname: "",
    lastname: "",
    addressline1: "",
    addressline2: "",
  });
  const [invalidAddress, setinvalidAddress] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState('');
  const [userSavedAddress, setuserSavedAddress] = useState('')
  const validateAddressFields = async (addressline1, addressline2) => {
    if (addressline1.length === 0 && addressline2.length === 0) {
      handlePopupMessage("Address Fields can not be empty");
    } else {
      const userAddress = addressline1 + ' ' +addressline2;
      const getUserEmail = localStorage.getItem("EcartUserEmail");
      const getFbloginID = localStorage.getItem("fbloginID")
      if(getUserEmail) {
        const adddressAfterSubmit = await SubmitAddress(getUserEmail, userAddress, 'userLoggedIn')
        if (adddressAfterSubmit.success) {
              navigate("/cart");
          } 
        else {
          handlePopupMessage("error submitting address")
        }
      }
      else if(getFbloginID) {
        const adddressAfterfbSubmit = await SubmitAddress(getUserEmail, userAddress, 'fbLoggedIn')
        if (adddressAfterfbSubmit.success) {
              navigate("/cart");
          } 
        else {
          handlePopupMessage("error submitting address")
        }
      }
      
    }
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    validateAddressFields(
      AddressformData.addressline1,
      AddressformData.addressline2
    );
  };

  const handlePopupMessage = (message) => {
    setinvalidAddress(true);
    setErrorMessage(message)
    setTimeout(() => {
      setinvalidAddress(false);
    }, 1000);
  };

  const AddressinputHandler = (event) => {
    const { name, value } = event.target;
    setAddressformData({ ...AddressformData, [name]: value });
  };

  const getSavedAddress = () => {

    const getEmail = localStorage.getItem("EcartUserEmail")
    const getFbloginID = localStorage.getItem("fbloginID")
    if(getEmail) {
      getUserInfo(getEmail, 'userLogin').then(result => {
        if(result?.responseData?.address) {
          setuserSavedAddress(result?.responseData?.address)
        }
        else {
          setuserSavedAddress('')
        }
       
      });
    }
    else if(getFbloginID) {
      getUserInfo(getFbloginID, 'fbLogin').then(result => {
        if(result?.responseData?.address) {
          setuserSavedAddress(result?.responseData?.address)
          
        }
        else {
          setuserSavedAddress('')
        }
      });
    }

  }

  useEffect(() => {
    getSavedAddress()
    window.scrollTo(0, 0);
  })

  return (
    <div className="address-wrapper">
      <h3>CHECKOUT  &gt;  LOGIN  &gt;  DELIVERY ADDRESS</h3>
      <div className="saved-address">
        <h2>Saved Address</h2>
        <div className="saved address-card">

            <div className="address-content">
            {userSavedAddress.length > 0 ?  {userSavedAddress} : "No Address Found"}
            <div className="use-button-box">
            <button disabled={userSavedAddress.length > 0 ? false : true} onClick={() => {navigate('/cart')}} className="button use-button">Use this Address</button>
            </div>
          </div>


        </div>
      </div>
      <div className="delivery-address">
        <h2>Enter Delivery Address</h2>
        <div className="delivery address-card">
          <form
            className="delivery-form"
            onSubmit={(event) => handleAddressSubmit(event)}
          >
            <div className="address-first-name">
              <input
                type="text"
                id="firstname"
                name="firstname"
                placeholder="Enter Your firstname.."
                value={AddressformData.firstname}
                onChange={AddressinputHandler}
              />
              <input
                type="text"
                id="lastname"
                name="lastname"
                placeholder="Enter Your lastname.."
                value={AddressformData.lastname}
                onChange={AddressinputHandler}
              />
            </div>
            <div className="address-line">
              <input
                type="text"
                id="addressline1"
                name="addressline1"
                placeholder="Address Line 1."
                value={AddressformData.addressline1}
                onChange={AddressinputHandler}
              />
              <input
                type="text"
                id="addressline2"
                name="addressline2"
                placeholder="Address Line 2.."
                value={AddressformData.addressline2}
                onChange={AddressinputHandler}
              />
            </div>
            <div className="address-buttons">
              <button className="login-button">
                Save and Use this Address
              </button>
            </div>
          </form>
          {invalidAddress ? (
            <MessagePopUp message={ErrorMessage} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
