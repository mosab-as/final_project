import { Link } from 'react-router-dom'

const Home = (props) => (
    <header>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/cart">Cart <img src='/shopping-cart.png' alt='shopping cart' width='15px' /> { (localStorage.getItem('cart') !== null) ? JSON.parse(localStorage.cart).length : 0 }</Link></li>
          </ul>
        </nav>
    </header>
)

export default Home;