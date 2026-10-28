import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

const image = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=80`;

export const plantsArray = [
  {
    category: 'Tropical Plants',
    plants: [
      { id: 1, name: 'Monstera Deliciosa', cost: 28, image: image('photo-1614594975525-e45190c55d0b') },
      { id: 2, name: 'Bird of Paradise', cost: 38, image: image('photo-1593691509543-c55fb32e5cee') },
      { id: 3, name: 'Rubber Plant', cost: 32, image: image('photo-1604762524889-3e2fcc145683') },
      { id: 4, name: 'Alocasia Polly', cost: 30, image: image('photo-1614594575921-1f7f5a6f2a4d') },
      { id: 5, name: 'Calathea Orbifolia', cost: 36, image: image('photo-1597055181300-d9b7c36c6b7b') },
      { id: 6, name: 'Prayer Plant', cost: 24, image: image('photo-1601986323494-0e484e8a5c4c') },
    ],
  },
  {
    category: 'Low Light Plants',
    plants: [
      { id: 7, name: 'Snake Plant', cost: 22, image: image('photo-1593482892290-f54927ae2c8a') },
      { id: 8, name: 'ZZ Plant', cost: 26, image: image('photo-1614594975525-e45190c55d0b') },
      { id: 9, name: 'Chinese Evergreen', cost: 25, image: image('photo-1572688484438-313a6e50c333') },
      { id: 10, name: 'Cast Iron Plant', cost: 29, image: image('photo-1598880940080-ff9a29891b85') },
      { id: 11, name: 'Parlor Palm', cost: 27, image: image('photo-1523430992330-9f8c7c7c0c3f') },
      { id: 12, name: 'Peace Lily', cost: 23, image: image('photo-1593691509543-c55fb32e5cee') },
    ],
  },
  {
    category: 'Easy Care Plants',
    plants: [
      { id: 13, name: 'Pothos', cost: 18, image: image('photo-1616761154384-8b5f6f7c3d6c') },
      { id: 14, name: 'Spider Plant', cost: 20, image: image('photo-1572688484438-313a6e50c333') },
      { id: 15, name: 'Fiddle Leaf Fig', cost: 42, image: image('photo-1617713964959-d9a36bbc7b52') },
      { id: 16, name: 'Jade Plant', cost: 19, image: image('photo-1459411621453-7b03977f4bfc') },
      { id: 17, name: 'Aloe Vera', cost: 17, image: image('photo-1509423350716-97f9360b4e09') },
      { id: 18, name: 'Lucky Bamboo', cost: 16, image: image('photo-1527061011665-3652c757a4d4') },
    ],
  },
];

export function Navbar({ onNavigate }) {
  const cartItems = useSelector((state) => state.cart.items);
  const cartQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="nav">
      <button className="brand" type="button" onClick={() => onNavigate('home')}>Paradise <em>Nursery</em></button>
      <nav>
        <button type="button" onClick={() => onNavigate('home')}>Home</button>
        <button type="button" onClick={() => onNavigate('plants')}>Plants</button>
        <button type="button" onClick={() => onNavigate('cart')}>Cart ({cartQuantity})</button>
      </nav>
    </header>
  );
}

export default function ProductList() {
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = React.useState({});

  const handleAddToCart = (plant) => {
    dispatch(addItem({ ...plant, price: plant.cost }));
    setAddedToCart((current) => ({ ...current, [plant.name]: true }));
  };

  return (
    <section className="products" id="shop">
      <div className="section-heading">
        <div><p className="eyebrow">THE COLLECTION</p><h2>Find your new favorite plant.</h2></div>
        <p>Curated greenery for bright windows, cozy corners, and every space between.</p>
      </div>
      {plantsArray.map((category) => (
        <div className="category-section" key={category.category}>
          <h3 className="category-heading">{category.category}</h3>
          <div className="product-grid">
            {category.plants.map((plant) => (
              <article className="product-card" key={plant.id}>
                <img src={plant.image} alt={plant.name} />
                <div className="product-info">
                  <h3>{plant.name}</h3>
                  <div className="product-footer">
                    <strong>${plant.cost.toFixed(2)}</strong>
                    <button type="button" disabled={addedToCart[plant.name]} onClick={() => handleAddToCart(plant)}>
                      {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
