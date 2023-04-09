import { Link } from 'react-router-dom';
import '../style/cart.css'

function Cart(props) {
    let cartDetails
    if(localStorage.getItem('cart') !== null) {
        cartDetails = JSON.parse(localStorage.cart)
    }else{
        cartDetails = []
    }


  const removeFromCart = (item) => {
  const updatedCart = cartDetails.filter((cartItem) => cartItem.id !== item.id);
  localStorage.cart = JSON.stringify(updatedCart)
    props.cartSet(updatedCart);
  };

  const updateQuantity = (item, quantity) => {

  if (quantity > 0) {

    localStorage.cart = JSON.stringify(cartDetails.map((cartItem) => cartItem.id === item.id ? { ...cartItem, quantity } : cartItem))
    props.cartSet(cartDetails.map((cartItem) => cartItem.id === item.id ? { ...cartItem, quantity } : cartItem)) 

  }else{
    removeFromCart(item)
  }

  };

  const calculateTotal = () => {
    const total = cartDetails.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
    return total.toFixed(2);
  };
  return (
    
    <div className="cart-page">
      <main>
        <h1>Your Cart</h1>
        {cartDetails.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartDetails.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="product-info">
                        <div className='pro-inf'>
                          <Link to={`/product/${item.id}`}>
                            <img className='item-image' src={item.image} alt={item.title} />
                          </Link>
                          <h2>{item.title}</h2>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="quantity-selector">
                        <button onClick={() => updateQuantity(item, item.quantity - 1) }>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item, item.quantity + 1) }>+</button>
                      </div>
                    </td>
                    <td><span className='price'>${item.price}</span></td>
                    <td><span className='price-quantity'>${(item.price * item.quantity).toFixed(2)}</span></td>
                    <td><div className='remove-btn' ><button onClick={() => removeFromCart(item)}>Remove</button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="total">Total: ${calculateTotal()}</p>
            <button className="checkout-btn">Checkout</button>
          </div>
        )}
      </main>
    </div>

  );
}

export default Cart;