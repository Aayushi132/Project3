import "./App.css";
import LandingPage from "./components/Landing-Page/landingPage.component";
import Authentication from "./components/Authentication/authentication.component"
import Footer from "./components/Footer/Footer.component";
import Cart from "./components/Cart/cart.component";
import NavBar from "./components/NavBar/navBar.component";
import AddressForm from "./components/Address/addressForm.components"
import { Route, Routes, Navigate } from "react-router-dom";
function App() {
  return (
    <>
    <div className="page-wrapper">
      <NavBar />
      <Routes>
       <Route path="/" element={<Navigate to="/home" />}>
        <Route
            path="*"
          element={<Navigate to="/" />}
          />
        </Route>
        <Route path='/home' element={<LandingPage />} />
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/signup' element={<Authentication />}></Route>
        <Route path='/address' element={<AddressForm />}></Route>
      </Routes>
      <Footer />
      </div>
    </>
  );
}

export default App;
