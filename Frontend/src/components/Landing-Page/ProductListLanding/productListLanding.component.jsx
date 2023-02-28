import React, { useContext, useEffect, useState } from "react";
import "../ProductListLanding/productListLanding.styles.scss";
import { ProductContext } from "../../../contexts/getProductsInfo.context";

const ProductListlanding = () => {
  const { productsData, productType, calculateTotalItems, setCartCount } = useContext(ProductContext);
  const [cartProducts, setcartProducts] = useState([]);
  const [productListData, setproductListData] = useState([]);
  const [selectedCategory, setselectedCategory] = useState("top pick");

  useEffect(() => {
    setproductListData(productsData);
    setselectedCategory("top pick")
  }, [productsData, productType]);

  const RemoveProductfromCart = (upDatedProduct) => {
    cartProducts.map((el, index) => {
      // check if quantity of item is zero and remove it
      const isItemQtyZero = cartProducts
        .map((item) => item.product_quantity === 0)
        .includes(true);
      // remove that item from cart
      if (isItemQtyZero) {
        cartProducts.pop(upDatedProduct);
      }
    });
    //update cart in storage
    StoreCartItems();
  };

  const AddProducttoCart = (upDatedProduct) => {
    //if cart is empty
    if (cartProducts.length === 0) {
      cartProducts.push(upDatedProduct);
    } else {
      //if cart already has some element check if the same product is there
      const isElementInArray = cartProducts
        .map((item) => item.product_name === upDatedProduct.product_name)
        .includes(true);
      if (!isElementInArray) {
        cartProducts.push(upDatedProduct);
      }
    }
    setcartProducts(cartProducts);
    //update cart in storage
    StoreCartItems(selectedCategory);
    const totalCartItems = calculateTotalItems(cartProducts)
    setCartCount(totalCartItems)
  };
  const StoreCartItems = () => {
    localStorage.setItem("CartData", JSON.stringify(cartProducts));
  };
  // this method will increment or decrement the quantity and will add the element to cart
  const updateQuantity = (e, index) => {
    const newProductList = [...productListData];
    newProductList[index].product_quantity = e.target.value;
    setproductListData(newProductList);
    StoreCartItems();
  };
  const handleIncrement = (index, product) => {
    const newProductList = [...productListData];
    newProductList[index].product_quantity++;
    setproductListData(newProductList);
    AddProducttoCart(product);
  };

  const handleDecrement = (index, product) => {
    const newProductList = [...productListData];
    newProductList[index].product_quantity--;
    RemoveProductfromCart(newProductList);
    setproductListData(newProductList);
  };

  function sortArrayByRatings(arr, category, option) {
    const filteredArr = arr.filter(obj => obj.product_category === category);
    const sortedArr = filteredArr.sort((a, b) => {
      if(option === "most popular") {
        return parseFloat(b.product_ratings) - parseFloat(a.product_ratings);
      }
      else if(option === "lowest price") {
        return parseFloat(a.product_price) - parseFloat(b.product_price);
      }
      else {
        return productsData
      }
    });
    return sortedArr;
  }

  const filterOption = (option) => {
      setselectedCategory(option)
      const sortedArr = sortArrayByRatings(productsData, productType, option)
      setproductListData(sortedArr);
  };

  return (
    <>
      <div className="filter-category-selector">
        <div
          onClick={() => {
            filterOption("top pick");
          }}
          className={`category ${
            selectedCategory === "top pick" ? "selected" : ""
          }`}
        >
          <span>Our top picks</span>
        </div>
        <div
          onClick={() => {
            filterOption("most popular");
          }}
          className={`category ${
            selectedCategory === "most popular" ? "selected" : ""
          }`}
        >
          <span>Most Popular</span>
        </div>
        <div
          onClick={() => {
            filterOption("lowest price");
          }}
          className={`category ${
            selectedCategory === "lowest price" ? "selected" : ""
          }`}
        >
          <span>Lowest Price</span>
        </div>
      </div>
      <div className="filter-card-wrapper">
      {productListData.map((product, index) =>
        product.product_category === productType ? (
          <div className="filter-card">
            <div className="product-image">
              <img src={`data:image/png;base64,${product.product_ImageData}`} alt="" className="sampleImage" />
            </div>
            <div className="product-content">
              <div className="product-description">
                <h1>{product.product_name}</h1>
                <p>{product.product_description}</p>
              </div>
              <div className="product-cost">
                <div className="rating">
                  <p>
                    User Ratings {product.product_ratings}/5.0 (
                    {product.product_total_reviews} reviews)
                  </p>
                </div>
                <div className="cost">
                  <div className="cost-value">
                    <p>Cost:</p>
                    <p>$ {product.product_price}</p>
                  </div>
                  <div className="product-count">
                    <button
                      disabled={product.product_quantity <= 0 ? true : false}
                      className={`button-count`}
                      onClick={() => handleDecrement(index, product)}
                    >
                      -
                    </button>
                    <input
                      type="text"
                      readonly
                      className="number-product"
                      value={product.product_quantity}
                      onChange={(e) => updateQuantity(e, index)}
                    />
                    <button
                      className="button-count"
                      onClick={() => handleIncrement(index, product)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )
      )}
    </div>
    </>
  );
};

export default ProductListlanding;
