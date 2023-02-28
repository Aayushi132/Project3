import React from "react";
import '../Landing-Page/landingPage.styles.scss';
import HeadingTabs from "./HeadingTabs/headingTabs.component";
import ProductListlanding from "./ProductListLanding/productListLanding.component";
const LandingPage = () => {
    return (
        <>  
        <div className="landing-page-wrapper">
            <HeadingTabs />
            <ProductListlanding />
        </div>
            
        </>
    )
}
export default LandingPage;