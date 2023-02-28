import { useState, useEffect } from "react";
import { createContext } from "react";
import axios from 'axios';
export const ProductContext = createContext({
    setproductsData: () => {},
    productsData: [],

    setProductType: () => {},
    productType: null,

    setStoredCartItems: () =>  {},
    storedCartItems: null,

    setcartCount: () =>  {},
    CartCount: null,

    setIsUserLogin: () => {},
    IsUserLogin: null
});


const ProductContextProvider = ({children}) => {
    const [productsData, setproductsData] = useState([]);

    const [productType, setProductType] = useState('cakes')

    const [CartCount, setCartCount] = useState(0)

    const [storedCartItems, setStoredCartItems] = useState(JSON.parse(localStorage.getItem('CartData')));

    const [IsUserLogin, setIsUserLogin] = useState(localStorage.getItem('isEcartUserLoggedIn'));

    const [userInfo, setuserInfo] = useState(localStorage.getItem(null));

    const calculateTotalItems = (cartProducts) => {
        const ItemTotal = []
        cartProducts.map((item) => {
            ItemTotal.push(item.product_quantity)
          })
          const totalItems = ItemTotal.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
          return totalItems
    }

    const setUserLoginVal = (value) => {
        setIsUserLogin(value)
    }   

    const getUserInfo = async(Userdata, type) => {
        try {
            const response =
              type === "userLogin"
                ? await axios.post(
                    "https://party-bakery3.onrender.com/getUserInfo",
                    { email: Userdata, type: type }
                  )
                : await axios.post(
                    "https://party-bakery3.onrender.com/getUserInfo",
                    { fbLoginD: Userdata, type: type }
                  );
            return response.data
        }
        catch (err){
           return (err)
        }
        
    }

    const SubmitAddress = async(UserData, Useraddress, type) => {
        try {
            const response =
              type === "userLoggedIn"
                ? axios.post(
                    "https://party-bakery3.onrender.com/enterAddress",
                    { email: UserData, address: Useraddress, type: type }
                  )
                : axios.post(
                    "https://party-bakery3.onrender.com/enterAddress",
                    {
                      fbLoginD: UserData,
                      address: Useraddress,
                      type: type,
                    }
                  );
           return (await response).data
            
        }
        catch (err){
            console.log(err)
        }
        
    }
  
    useEffect(() => {
        axios
          .get("https://party-bakery3.onrender.com/products")
          .then(function (response) {
            setproductsData(response.data.result);
          });
    }, [storedCartItems])
    const value = {productsData, productType, setProductType, storedCartItems, setStoredCartItems, CartCount,setCartCount, calculateTotalItems, IsUserLogin, setIsUserLogin, setUserLoginVal, getUserInfo, SubmitAddress}
    return (
        <ProductContext.Provider value={value}> {children} </ProductContext.Provider>
    )
}

export default ProductContextProvider;