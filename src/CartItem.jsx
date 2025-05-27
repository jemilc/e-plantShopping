import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
    const cart = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    // Calculate total amount for all products in the cart
    const calculateTotalAmount = () => {
        let total = 0; // 1. Inicializa una variable total
            // 2. Itera sobre el array `cart`
            cart.forEach(item => {
            // 3. Extrae su quantity y cost
            const quantity = item.quantity;
            // 4. Convierte el string cost (ej. "$10.00") a un número
            //    usando parseFloat(item.cost.substring(1))
            //    y luego multiplica por la quantity.
            //    También manejo el caso donde cost ya podría ser un número, por si acaso.
            const costPerItem = typeof item.cost === 'string'
                                ? parseFloat(item.cost.substring(1))
                                : item.cost;
            
            total += costPerItem * quantity; // 5. Suma al total
            });
            return total.toFixed(2); // 6. Devuelve el total formateado a 2 decimales
    };
    

  const handleContinueShopping = () => {
   if (onContinueShopping && typeof onContinueShopping === 'function') {
      onContinueShopping();
    }
  };

    const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
    };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));

  };

  const handleDecrement = (item) => {
   // If the item's quantity is greater than 1, decrease it by 1
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // Else if the quantity would drop to 0, remove the item
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));

  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    // 1. Loggea el item completo para ver sus propiedades
    console.log('Item en calculateTotalCost:', item);
  
    // 2. Loggea el costo antes de parsear
    console.log('item.cost (original):', item.cost, 'Tipo:', typeof item.cost);
  
    const costPerItem = typeof item.cost === 'string'
                          ? parseFloat(item.cost.substring(1))
                          : item.cost;
  
    // 3. Loggea el costo parseado
    console.log('costPerItem (parseado):', costPerItem, 'Tipo:', typeof costPerItem);
    console.log('item.quantity:', item.quantity, 'Tipo:', typeof item.quantity);
  
    const total = costPerItem * item.quantity;
  
    // 4. Loggea el total antes de toFixed
    console.log('Total calculado (antes de toFixed):', total);
  
    // Asegúrate de que total no sea NaN antes de llamar a toFixed
    if (isNaN(total)) {
      console.error('ERROR: Total is NaN for item:', item);
      return 'N/A'; // O cualquier valor que indique un error
    }
  
    return total.toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
                </div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e)=> handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


