import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './../style/home.css'

const Home = (props) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
      fetch('https://fakestoreapi.com/products')
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch((error) => console.log(error));

        fetch('https://fakestoreapi.com/products/categories')
        .then(response => response.json())
        .then(data => setCategories(data));
    }, []);
  
    const handleChange = (event) => {
        setSelectedCategory(event.target.value !== undefined ? event.target.value :  event.target.textContent);
      };
    
    const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;
  
    return (
    <div className="home-page">
      <main>
        <h1>Featured Products</h1>
        <div className="filter">
          <label htmlFor="category">Filter by category:</label>
          <select id="category" value={selectedCategory} onChange={handleChange}>
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        <div className="product-list">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product">
                <Link to={`/product/${product.id}`}>
                    <div className="image">
                        <img src={product.image} alt={product.title} />
                    </div>
                </Link>
                <div className="product-info">
                    <h2>{product.title}</h2>
                    <p className="price">${product.price}</p>
                    <div onClick={handleChange} className='category'>{product.category}</div>
                </div>
                <button className="add-to-cart" onClick={() => props.handleAddToCartfunction(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )};

export default Home;
