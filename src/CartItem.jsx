import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

export default function CartItem({ onNavigate }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = cartItems.reduce((total, item) => total + item.cost * item.quantity, 0);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.id));
  };

  if (!cartItems.length) {
    return (
      <section className="cart-container cart empty-cart">
        <h2>Your cart is empty.</h2>
        <button type="button" className="primary-button" onClick={() => onNavigate('plants')}>Continue Shopping</button>
      </section>
    );
  }

  return (
    <section className="cart-container cart">
      <div className="section-heading"><div><p className="eyebrow">YOUR BAG</p><h2>Shopping Cart</h2></div></div>
      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map((item) => (
            <article className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>Unit price: ${item.cost.toFixed(2)}</p>
                <strong>Item total: ${(item.cost * item.quantity).toFixed(2)}</strong>
                <div className="quantity">
                  <button type="button" onClick={() => handleDecrement(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button type="button" onClick={() => handleIncrement(item)}>+</button>
                  <button className="cart-item-delete remove" type="button" onClick={() => handleRemove(item)}>Delete</button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <aside className="summary">
          <h3>Order Summary</h3>
          <div><span>Total amount</span><strong>${totalAmount.toFixed(2)}</strong></div>
          <button type="button" className="checkout" onClick={() => window.alert('Coming Soon')}>Checkout</button>
          <button type="button" className="continue-shopping" onClick={() => onNavigate('plants')}>Continue Shopping</button>
        </aside>
      </div>
    </section>
  );
}
