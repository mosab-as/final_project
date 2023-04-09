import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import '../style/product-details-page.css';

function ProductDetailsPage(props) {
  const {id} = useParams();
  const [product, setProduct] = useState({})
  useEffect(() => { 
    fetch(`https://fakestoreapi.com/products/${id}`)
    .then((response) => response.json())
    .then((data) => setProduct(data))
    },[id]
    )

  return (
    <div className="product-details-page">
      <main>
        <div className="product-details-container">
            <div className="product-details-image">
                <img src={product.image} alt={product.title} />
            </div>
            <div className="product-details-info">
                <h1 className="product-details-title">{product.title}</h1>
                <p className="product-details-price">${product.price}</p>
                <div className="product-details-description">
                <p className="product-details-category">{product.category}</p>
                <h2>Description</h2>
                <p>{product.description}</p>
                <button onClick={() => props.handleAddToCartfunction(product)} className="add-to-cart-button">Add to Cart</button>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}

export default ProductDetailsPage;
