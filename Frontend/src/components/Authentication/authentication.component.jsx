import React, {useState, useContext} from "react";
import axios from 'axios';
import "./authentication.styles.scss";
import { useNavigate } from "react-router-dom";
import MessagePopUp from "../MessagePopUp/messagePopUp.component";
import { ProductContext } from "../../contexts/getProductsInfo.context";
import FacebookLogin from 'react-facebook-login';
const Authentication = () => {

const {setUserLoginVal} = useContext(ProductContext)

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email:'',
    password: '',
})
const [fbFormData, setfbFormData] = useState({
  firstname: '',
  lastname: '',
  FbLoginID: ''
})
const [LoginData, setLoginData] = useState({
  email: '',
  password: ''
})

const [showSuccessPopup, setshowSuccessPopup] = useState(false)
const [showpopupmessage, setshowpopupmessage] = useState('')
const [handleFacebookLogin, sethandleFacebookLogin] = useState(false)
const navigate = useNavigate();

const inputsHandler = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
}

const LoginInputHandler = (event) => {
  const { name, value } = event.target;
  setLoginData({ ...LoginData, [name]: value });
}

const handlePopupMessage = (message) => {
  setshowpopupmessage(message)
  setshowSuccessPopup(true)
  setTimeout(() => {
    setshowSuccessPopup(false)
  }, 1000)
}

const validateEmailandPassword = (email, password) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    return "Invalid email format";
  }

  if (password.length < 3) {
    return "Password must be at least three characters long";
  }

  return null;
}

const userRegister = async (signUpData) =>{
  const result = {}
  axios
    .post("https://party-bakery3.onrender.com/registerUser", signUpData)
    .then(function (response) {
      if (response.data.success) {
        handlePopupMessage("User Successfully Registered !");
        const resetData = {
          firstname: "",
          lastname: "",
          email: "",
          password: "",
        };
        setFormData(resetData);
      } else {
        handlePopupMessage("User Already Exists. Try from a different account");
      }
    });
  return result
}

const userLogin = async (loginData) => {
  
  const result = {}
  axios
    .post("https://party-bakery3.onrender.com/loginUser", loginData)
    .then(function (response) {
      if (response.data.success) {
        // handlePopupMessage('Logged In successfully!')
        const resetData = {
          email: "",
          password: "",
        };
        setLoginData(resetData);
        localStorage.setItem("isEcartUserLoggedIn", response.data.success);
        setUserLoginVal("true");
        localStorage.setItem(
          "EcartUserEmail",
          response.data.responseData.email
        );
        navigate("/address");
      } else {
        handlePopupMessage("Login Failed, User not found !");
      }
    });
  return result
}

const handleSubmit = async (e, type) =>{
  e.preventDefault();
  const validateUserInput = type ==='register' ?  validateEmailandPassword(formData.email, formData.password) : validateEmailandPassword(LoginData.email, LoginData.password)
  if(validateUserInput) {
    handlePopupMessage(' Invalid Email or Password entered, Password should be atleast 3 characters')
  }
  else {
    if(type === 'register') {
      userRegister(formData)
    }
    else {
      userLogin(LoginData)
    }
  }
}

const responseFacebook = (response) => {
  const splitName = response.name.split(" ")
  const firstName = splitName[0];
  const lastName = splitName[splitName.length - 1];
  fbFormData.firstname = firstName
  fbFormData.lastname = lastName
  fbFormData.FbLoginID = response.userID

  axios
    .post("https://party-bakery3.onrender.com/registerUser", fbFormData)
    .then(function (response) {
      if (response.data.success) {
        const resetData = {
          firstname: "",
          lastname: "",
          FbLoginID: "",
        };
        setfbFormData(resetData);
        handlePopupMessage("User registered successfully");
        localStorage.setItem("fbloginID", response.data.responseData.FbLoginID);
      } else {
        handlePopupMessage(
          "User Already Exists. Try from a different account or you can login"
        );
      }
    });
}

const fbLogin = () => {
  const result = {}
  if(localStorage.getItem("fbloginID")) {
    axios
      .post("https://party-bakery3.onrender.com/loginUser", fbFormData)
      .then(function (response) {
        if (response.data.success) {
          localStorage.setItem("isEcartUserLoggedIn", response.data.success);
          setUserLoginVal("true");
          navigate("/address");
        } else {
          handlePopupMessage("Login Failed, User not found !");
        }
      });
    return result
  }
  else {
    handlePopupMessage('Sign up using facebook first than login!')
  }
}

  return (
    <div className="login-signup">
      <div className="login-container">
      <div className="login-breadcrums">
       <h3>CHECKOUT  &gt;  LOGIN</h3>
      </div>
        <div className="login-heading">
          <h1>Already have an Account?</h1>
          <h1>LOGIN</h1>
          <div className="login-form">
            <form onSubmit={(event) => handleSubmit(event,'Login')} >
              <div className="login">
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={LoginData.email}
                  onChange={LoginInputHandler}
                  placeholder="Enter Your Email.."
                />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={LoginData.password}
                  onChange={LoginInputHandler}
                  placeholder="Enter Your Password.."
                />
              </div>
              <div className="login-buttons">
                <button className="login-button">LOGIN</button>
                <p>OR</p>
              </div>
            </form>
            <button className="login-button" onClick={() => {fbLogin()}}>Login with Facebook</button>
          </div>
        </div>
      </div>

      <div className="signup-container">
        <div className="login-heading">
          <h1>New User?</h1>
          <h1>Signup</h1>
          <div className="login-form">
            <form onSubmit={(event) => handleSubmit(event,'register')}>
              <div className="login-name">
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={formData.firstname}
                  onChange={inputsHandler}
                  placeholder="Enter Your firstname.."
                />
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={inputsHandler}
                  placeholder="Enter Your lastname.."
                />
              </div>
              <div className="login">
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={inputsHandler}
                  placeholder="Enter Your Email.."
                />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={inputsHandler}
                  placeholder="Enter Your Password.."
                />
              </div>
              <div className="login-buttons">
                <button type="submit" className="login-button">SIGN UP</button>
                <p>OR</p>
                <FacebookLogin
                  appId="550955183680086"
                  scope="email"
                  callback={responseFacebook}
                  textButton="SignUp With Facebook"
                  cssClass="login-button"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
        {
          showSuccessPopup ? (<MessagePopUp message={showpopupmessage}/>) : null
        }
    </div>
  );
};

export default Authentication;
