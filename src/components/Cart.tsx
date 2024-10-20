import React from 'react';
import styles from './Cart.module.css';

interface CartItem {
    id: number;
    name: string;
    price: number;
}

interface CartProps {
    items: CartItem[];
    removeFromCart: (productId: number) => void;
    handleCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ items, removeFromCart, handleCheckout }) => {
    const itemCount: { [key: string]: { count: number; price: number } } = {};

    items.forEach(item => {
        if (itemCount[item.name]) {
            itemCount[item.name].count += 1;
        } else {
            itemCount[item.name] = { count: 1, price: item.price };
        }
    });

    
    const totalPrice = Object.values(itemCount).reduce((total, item) => {
        return total + item.price * item.count;
    }, 0);
    return (
        <div className={styles.cart}> 
            <h2>Your Cart</h2>
            {items.length === 0 ? (
                <p>No items in cart</p>
            ) : (
                <ul>
                    {Object.entries(itemCount).map(([name, { count, price }]) => (
                        <li key={name}>
                            {count}x {name} - ${price.toFixed(2)}
                            <button onClick={() => removeFromCart(items.find(item => item.name === name)!.id)} className={styles.removeButton}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
            {items.length > 0 && (
                <>
                    <p><strong>Total: ${totalPrice.toFixed(2)}</strong></p>
                    <button onClick={handleCheckout}
                            className={styles.checkoutButton}>
                        Checkout
                    </button>
                </>
            )}
        </div>
    );
};

export default Cart;
