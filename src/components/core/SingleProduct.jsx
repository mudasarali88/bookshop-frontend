import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleProduct, getRelatedProducts } from "./Api";
import Layout from "./Layout";
import ProductCard from "./ProductCard";

function SingleProduct(props) {
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProduct] = useState([]);

  const { productId } = useParams();
  const loadSingleProduct = async () => {
    const { data } = await getSingleProduct(productId);
    setProduct(data);
  };
  const loadRelatedProducts = async () => {
    const { data } = await getRelatedProducts(productId);
    setRelatedProduct(data);
  };

  useEffect(() => {
    loadSingleProduct(productId);
    loadRelatedProducts(productId);
  }, [productId]);

  return (
    <React.Fragment>
      <Layout
        title={product.name}
        description={product.description}
        className="container-fluid"
      >
        <div className="row">
          <div className="col-8">
            <h2>Product</h2>
            <ProductCard
              product={product}
              viewProductBtn={false}
              moreInfo={true}
            />
          </div>
          <div className="col-4">
            <h2>Related Products</h2>
            {relatedProducts?.map((p, i) => (
              <ProductCard key={i} product={p} />
            ))}
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
}

export default SingleProduct;
