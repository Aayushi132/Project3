import React, { useContext } from "react";
import "../HeadingTabs/headingTabs.styles.scss";
import { ProductContext } from '../../../contexts/getProductsInfo.context';
function HeadingTabs() {
  // Will consist of Heading switch tabs and heading
  const {productType, setProductType} = useContext(ProductContext)
  const convertToUpperCase = (element) => {return element.toUpperCase()}
  return (
    <>
      <div className="heading-tabs">
        <div className="btn-group">
          <button className="button" onClick={() => {setProductType('cakes')}}>
            <span className={`${productType === 'cakes' ? "active" : ""}`}>CAKES</span>
          </button>
          <button className="button" onClick={() => {setProductType('decorations')}}>
            <span className={`${productType === 'decorations' ? "active" : ""}`}>DECORATIONS</span>
          </button>
          <button className="button" onClick={() => {setProductType('snacks')}}>
            <span className={`${productType === 'snacks' ? "active" : ""}`}>SNACKS</span>
          </button>
        </div>
      </div>
      <div className="heading-title">
        <h1>{convertToUpperCase(productType)}</h1>
      </div>
    </>
  );
}

export default HeadingTabs;
